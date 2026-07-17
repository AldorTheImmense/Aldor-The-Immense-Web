(() => {
  "use strict";

  const PREFS_KEY = "aldor.cloudSyncPrefs.v1";
  const META_KEY = "aldor.cloudSyncMeta.v1";
  const APP_DATA_KEYS = [
    "aldor.shopState.v1",
    "aldor.inventoryLists.v1",
    "aldor.encounterHistory.v1",
    "aldor.factionReputation.v1",
    "aldor.factionClocks.v1",
    "aldor.factionClockGoals.v1",
    "aldor.factionClockResults.v1",
    "aldor.factionClockSizes.v1",
    "aldor.mapTools.v1",
    "aldor.mapRouteSlots.v1",
    "aldor.craftingState.v1"
  ];
  const hadLocalDataBeforeInitialRender = APP_DATA_KEYS.some((key) => localStorage.getItem(key) !== null);

  let client = null;
  let session = null;
  let cloudRecord = null;
  let initialised = false;
  let suppressLocalChangeTracking = false;
  let busy = false;
  let autoSyncTimer = null;
  let lastRemoteCheckAt = 0;
  let transientMessage = "";
  let transientKind = "";
  let libraryLoading = false;
  let libraryLoadFailed = false;

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value && typeof value === "object" ? value : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getPrefs() {
    return {
      autoSync: false,
      ...readJson(PREFS_KEY, {})
    };
  }

  function setPrefs(next) {
    writeJson(PREFS_KEY, { ...getPrefs(), ...next });
  }

  function getMeta() {
    return {
      localChangedAt: "",
      lastSyncedAt: "",
      lastSyncedCloudUpdatedAt: "",
      lastSyncedLocalChangedAt: "",
      ...readJson(META_KEY, {})
    };
  }

  function setMeta(next) {
    const value = { ...getMeta(), ...next };
    writeJson(META_KEY, value);
    return value;
  }

  function timeValue(value) {
    const parsed = Date.parse(value || "");
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function isLater(a, b) {
    return timeValue(a) > timeValue(b) + 500;
  }

  function localIsDirty(meta = getMeta()) {
    if (!meta.localChangedAt) return false;
    if (!meta.lastSyncedLocalChangedAt) return true;
    return isLater(meta.localChangedAt, meta.lastSyncedLocalChangedAt);
  }

  function remoteHasChanged(meta = getMeta(), record = cloudRecord) {
    if (!record) return false;
    if (!meta.lastSyncedCloudUpdatedAt) return true;
    return Math.abs(timeValue(record.updated_at) - timeValue(meta.lastSyncedCloudUpdatedAt)) > 500;
  }

  function config() {
    const raw = window.ALDOR_CLOUD_CONFIG || {};
    return {
      supabaseUrl: String(raw.supabaseUrl || "").trim(),
      supabasePublishableKey: String(raw.supabasePublishableKey || "").trim(),
      tableName: /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(raw.tableName || "")) ? String(raw.tableName) : "aldor_saves",
      saveSlot: String(raw.saveSlot || "main").trim().slice(0, 64) || "main"
    };
  }

  function isConfigured() {
    const value = config();
    return /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(value.supabaseUrl)
      && value.supabasePublishableKey.length > 20
      && !value.supabaseUrl.includes("YOUR_PROJECT_REF")
      && !value.supabasePublishableKey.includes("REPLACE_ME");
  }

  function canUseRedirectAuth() {
    return window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  }

  function currentRedirectUrl() {
    return `${window.location.origin}${window.location.pathname}`;
  }

  function formatDate(value) {
    if (!value) return "Never";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  }

  function setMessage(message, kind = "") {
    transientMessage = message;
    transientKind = kind;
    render();
  }

  function clearMessage() {
    transientMessage = "";
    transientKind = "";
  }

  function statusSnapshot() {
    const meta = getMeta();
    const localDirty = localIsDirty(meta);
    const remoteChanged = remoteHasChanged(meta, cloudRecord);
    const conflict = Boolean(session && cloudRecord && localDirty && remoteChanged);
    return { meta, localDirty, remoteChanged, conflict };
  }

  function statusText() {
    if (!isConfigured()) return "Cloud sync is not configured yet.";
    if (libraryLoading) return "Loading the cloud-sync client…";
    if (libraryLoadFailed || !window.supabase || typeof window.supabase.createClient !== "function") return "The Supabase client could not be loaded. Check the internet connection or content blocker.";
    if (!canUseRedirectAuth()) return "Cloud sign-in requires the app to be hosted at an HTTPS address rather than opened as a local file.";
    if (busy) return "Working…";
    if (!session) return "Sign in by email to connect this browser to your cloud save.";

    const { localDirty, remoteChanged, conflict } = statusSnapshot();
    if (conflict) return "Both this browser and the cloud have changed. Choose which copy to keep.";
    if (!cloudRecord && localDirty) return "This browser has unsynced changes. Save them to create the cloud copy.";
    if (!cloudRecord) return "No cloud save exists yet.";
    if (remoteChanged) return "A newer cloud save is available.";
    if (localDirty) return getPrefs().autoSync ? "Local changes are waiting to sync." : "This browser has changes that are not in the cloud.";
    return "This browser and the cloud are in sync.";
  }

  function buttonText() {
    if (!isConfigured()) return "Cloud: Setup";
    if (!canUseRedirectAuth()) return "Cloud: Hosting needed";
    if (libraryLoading) return "Cloud: Loading…";
    if (libraryLoadFailed) return "Cloud: Unavailable";
    if (busy) return "Cloud: Working…";
    if (!session) return "Cloud: Sign in";
    const { localDirty, remoteChanged, conflict } = statusSnapshot();
    if (conflict) return "Cloud: Conflict";
    if (remoteChanged) return "Cloud: Update available";
    if (localDirty) return "Cloud: Local changes";
    if (!cloudRecord) return "Cloud: No save";
    return "Cloud: Saved";
  }

  function render() {
    const button = document.getElementById("cloudSyncButton");
    if (button) {
      button.textContent = buttonText();
      button.classList.toggle("cloud-warning", statusSnapshot().conflict || statusSnapshot().remoteChanged);
    }

    const status = document.getElementById("cloudSyncStatus");
    if (status) {
      status.textContent = transientMessage || statusText();
      status.dataset.kind = transientKind || (statusSnapshot().conflict ? "warning" : "");
    }

    const setup = document.getElementById("cloudSetupRequired");
    const signedOut = document.getElementById("cloudSignedOut");
    const signedIn = document.getElementById("cloudSignedIn");
    const configured = isConfigured() && canUseRedirectAuth();
    const ready = configured && window.supabase && typeof window.supabase.createClient === "function";
    if (setup) setup.hidden = configured;
    if (signedOut) signedOut.hidden = !ready || Boolean(session);
    if (signedIn) signedIn.hidden = !ready || !session;

    const account = document.getElementById("cloudAccountEmail");
    if (account) account.textContent = session?.user?.email || "Signed in";

    const localTime = document.getElementById("cloudLocalUpdatedAt");
    const cloudTime = document.getElementById("cloudRemoteUpdatedAt");
    const syncTime = document.getElementById("cloudLastSyncedAt");
    const meta = getMeta();
    if (localTime) localTime.textContent = formatDate(meta.localChangedAt);
    if (cloudTime) cloudTime.textContent = formatDate(cloudRecord?.updated_at);
    if (syncTime) syncTime.textContent = formatDate(meta.lastSyncedAt);

    const auto = document.getElementById("cloudAutoSync");
    if (auto) auto.checked = getPrefs().autoSync;

    ["cloudSendMagicLink", "cloudSaveNow", "cloudLoadNow", "cloudCheckNow", "cloudSignOut"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.disabled = busy;
    });
    const loadButton = document.getElementById("cloudLoadNow");
    if (loadButton) loadButton.disabled = busy || !cloudRecord;
  }

  function setBusy(active) {
    busy = Boolean(active);
    render();
  }

  async function refreshCloudRecord() {
    if (!client || !session?.user?.id) {
      cloudRecord = null;
      render();
      return null;
    }
    const cfg = config();
    const { data, error } = await client
      .from(cfg.tableName)
      .select("id,user_id,slot,save_data,save_version,app_version,updated_at")
      .eq("user_id", session.user.id)
      .eq("slot", cfg.saveSlot)
      .limit(1);
    if (error) throw error;
    cloudRecord = Array.isArray(data) && data.length ? data[0] : null;
    lastRemoteCheckAt = Date.now();
    render();
    return cloudRecord;
  }

  async function pushToCloud({ force = false, interactive = false } = {}) {
    if (!client || !session?.user?.id) return;
    setBusy(true);
    clearMessage();
    try {
      await refreshCloudRecord();
      const snapshot = statusSnapshot();
      if (cloudRecord && snapshot.remoteChanged && snapshot.localDirty && !force) {
        setMessage("Sync stopped because both copies changed. Choose Save This Device or Load Cloud Save.", "warning");
        return;
      }
      if (interactive && cloudRecord && snapshot.remoteChanged) {
        const replace = window.confirm("Replace the newer cloud save with the data currently in this browser?");
        if (!replace) return;
      }

      const cfg = config();
      const metaBefore = getMeta();
      const localChangedAt = metaBefore.localChangedAt || new Date().toISOString();
      const payload = buildSavePayload();
      const updatedAt = new Date().toISOString();
      const row = {
        user_id: session.user.id,
        slot: cfg.saveSlot,
        save_data: payload,
        save_version: Number(payload.version) || 2,
        app_version: typeof APP_VERSION === "string" ? APP_VERSION : String(payload.appVersion || "unknown"),
        updated_at: updatedAt
      };

      const { data, error } = await client
        .from(cfg.tableName)
        .upsert(row, { onConflict: "user_id,slot" })
        .select("id,user_id,slot,save_data,save_version,app_version,updated_at")
        .single();
      if (error) throw error;

      cloudRecord = data;
      setMeta({
        localChangedAt,
        lastSyncedAt: updatedAt,
        lastSyncedCloudUpdatedAt: data.updated_at,
        lastSyncedLocalChangedAt: localChangedAt
      });
      setMessage("Cloud save updated.", "success");
    } catch (error) {
      console.error("Aldor cloud save failed", error);
      setMessage(`Cloud save failed: ${error?.message || "Unknown error"}`, "error");
    } finally {
      setBusy(false);
    }
  }

  async function pullFromCloud({ interactive = false } = {}) {
    if (!client || !session?.user?.id) return;
    setBusy(true);
    clearMessage();
    try {
      await refreshCloudRecord();
      if (!cloudRecord?.save_data) {
        setMessage("There is no cloud save to load.", "warning");
        return;
      }
      if (interactive) {
        const replace = window.confirm("Load the cloud save? This replaces the current app data in this browser. You can copy a manual Save Code first if you want a backup.");
        if (!replace) return;
      }

      suppressLocalChangeTracking = true;
      try {
        applySavePayload(cloudRecord.save_data);
      } finally {
        suppressLocalChangeTracking = false;
      }

      const localTimestamp = cloudRecord.updated_at || cloudRecord.save_data.savedAt || new Date().toISOString();
      setMeta({
        localChangedAt: localTimestamp,
        lastSyncedAt: new Date().toISOString(),
        lastSyncedCloudUpdatedAt: cloudRecord.updated_at,
        lastSyncedLocalChangedAt: localTimestamp
      });
      setMessage("Cloud save loaded into this browser.", "success");
    } catch (error) {
      console.error("Aldor cloud load failed", error);
      setMessage(`Cloud load failed: ${error?.message || "Unknown error"}`, "error");
    } finally {
      setBusy(false);
    }
  }

  async function reconcileAutomatically() {
    if (!getPrefs().autoSync || !client || !session || busy) return;
    setBusy(true);
    clearMessage();
    try {
      await refreshCloudRecord();
      const { localDirty, remoteChanged, conflict } = statusSnapshot();
      if (conflict) {
        setMessage("Automatic sync paused because both copies changed.", "warning");
        return;
      }
      if (cloudRecord && remoteChanged && !localDirty) {
        setBusy(false);
        await pullFromCloud({ interactive: false });
        return;
      }
      if (localDirty && !remoteChanged) {
        setBusy(false);
        await pushToCloud({ force: false, interactive: false });
        return;
      }
      if (!cloudRecord && localDirty) {
        setBusy(false);
        await pushToCloud({ force: false, interactive: false });
        return;
      }
      render();
    } catch (error) {
      console.error("Aldor automatic cloud sync failed", error);
      setMessage(`Automatic sync failed: ${error?.message || "Unknown error"}`, "error");
    } finally {
      setBusy(false);
    }
  }

  function scheduleAutoSync() {
    clearTimeout(autoSyncTimer);
    if (!getPrefs().autoSync || !session || busy) return;
    autoSyncTimer = window.setTimeout(() => {
      reconcileAutomatically();
    }, 1800);
  }

  function markLocalChange(key) {
    if (!initialised || suppressLocalChangeTracking || key === PREFS_KEY || key === META_KEY) return;
    setMeta({ localChangedAt: new Date().toISOString() });
    transientMessage = "";
    transientKind = "";
    render();
    scheduleAutoSync();
  }

  async function sendMagicLink() {
    const emailInput = document.getElementById("cloudEmail");
    const email = String(emailInput?.value || "").trim();
    if (!email || !email.includes("@")) {
      setMessage("Enter a valid email address.", "warning");
      return;
    }
    setBusy(true);
    try {
      const { error } = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: currentRedirectUrl(),
          shouldCreateUser: true
        }
      });
      if (error) throw error;
      setMessage("Magic link sent. Open the email on this device to finish signing in.", "success");
    } catch (error) {
      console.error("Aldor magic-link sign-in failed", error);
      setMessage(`Sign-in email failed: ${error?.message || "Unknown error"}`, "error");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (!client) return;
    setBusy(true);
    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      session = null;
      cloudRecord = null;
      setMessage("Signed out. Local app data remains on this device.", "success");
    } catch (error) {
      setMessage(`Sign out failed: ${error?.message || "Unknown error"}`, "error");
    } finally {
      setBusy(false);
    }
  }

  async function handleSession(nextSession) {
    session = nextSession || null;
    cloudRecord = null;
    clearMessage();
    render();
    if (!session) return;
    try {
      await refreshCloudRecord();
      if (getPrefs().autoSync) await reconcileAutomatically();
    } catch (error) {
      console.error("Aldor cloud status check failed", error);
      setMessage(`Signed in, but the cloud save could not be checked: ${error?.message || "Unknown error"}`, "error");
    }
  }

  function bindEvents() {
    document.getElementById("cloudSyncButton")?.addEventListener("click", () => {
      clearMessage();
      render();
      const dialog = document.getElementById("cloudSyncDialog");
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      else dialog?.setAttribute("open", "open");
    });
    document.getElementById("cloudSendMagicLink")?.addEventListener("click", sendMagicLink);
    document.getElementById("cloudEmail")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMagicLink();
      }
    });
    document.getElementById("cloudSaveNow")?.addEventListener("click", () => pushToCloud({ force: true, interactive: true }));
    document.getElementById("cloudLoadNow")?.addEventListener("click", () => pullFromCloud({ interactive: true }));
    document.getElementById("cloudCheckNow")?.addEventListener("click", async () => {
      setBusy(true);
      clearMessage();
      try {
        await refreshCloudRecord();
        setBusy(false);
        setMessage(statusText(), statusSnapshot().conflict ? "warning" : "");
      } catch (error) {
        setMessage(`Cloud check failed: ${error?.message || "Unknown error"}`, "error");
      } finally {
        setBusy(false);
      }
    });
    document.getElementById("cloudSignOut")?.addEventListener("click", signOut);
    document.getElementById("cloudAutoSync")?.addEventListener("change", (event) => {
      setPrefs({ autoSync: Boolean(event.target.checked) });
      render();
      if (event.target.checked) reconcileAutomatically();
    });

    const checkOnReturn = () => {
      if (document.visibilityState !== "visible" || !getPrefs().autoSync || !session || busy) return;
      if (Date.now() - lastRemoteCheckAt < 30000) return;
      reconcileAutomatically();
    };
    document.addEventListener("visibilitychange", checkOnReturn);
    window.addEventListener("focus", checkOnReturn);
  }

  function loadSupabaseLibrary() {
    if (window.supabase && typeof window.supabase.createClient === "function") return Promise.resolve();
    libraryLoading = true;
    libraryLoadFailed = false;
    render();
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-aldor-supabase]');
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Supabase client download failed.")), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.async = true;
      script.dataset.aldorSupabase = "true";
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener("error", () => reject(new Error("Supabase client download failed.")), { once: true });
      document.head.appendChild(script);
    }).finally(() => {
      libraryLoading = false;
      render();
    });
  }

  async function init() {
    bindEvents();

    const existingMeta = readJson(META_KEY, null);
    if (!existingMeta) {
      setMeta({ localChangedAt: hadLocalDataBeforeInitialRender ? new Date().toISOString() : "" });
    }

    initialised = true;
    render();
    if (!isConfigured() || !canUseRedirectAuth()) return;
    try {
      await loadSupabaseLibrary();
    } catch (error) {
      libraryLoadFailed = true;
      console.error("Aldor Supabase client load failed", error);
      setMessage("Supabase could not load. Check the internet connection or content blocker.", "error");
      return;
    }
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      libraryLoadFailed = true;
      setMessage("Supabase could not load. Check the internet connection or content blocker.", "error");
      return;
    }

    const cfg = config();
    client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    client.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => handleSession(nextSession), 0);
    });

    try {
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      await handleSession(data?.session || null);
    } catch (error) {
      console.error("Aldor cloud initialisation failed", error);
      setMessage(`Cloud sync could not start: ${error?.message || "Unknown error"}`, "error");
    }
  }

  window.AldorCloudSync = {
    init,
    markLocalChange,
    pushToCloud,
    pullFromCloud
  };

  document.addEventListener("DOMContentLoaded", init);
})();
