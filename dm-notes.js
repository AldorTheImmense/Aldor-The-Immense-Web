(() => {
  "use strict";

  const STORAGE_KEY = "aldor.dmNotes.v1";
  const STATE_VERSION = 5;
  const MAX_STATE_BYTES = 4_300_000;
  const IMAGE_TARGET_BYTES = 550_000;
  const STATUS_LABELS = { notes: "Notes", todo: "To Do", done: "Done" };
  const byId = (id) => document.getElementById(id);
  const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const deepClone = (value) => JSON.parse(JSON.stringify(value));

  let state = null;
  let initialised = false;
  let saveTimer = null;
  let contextTarget = null;
  let savedRange = null;
  let draggingPageId = null;

  function nowIso() {
    return new Date().toISOString();
  }

  function defaultState() {
    const section = {
      id: "section-notes",
      name: "Notes",
      createdAt: nowIso(),
      order: 0
    };
    return {
      version: STATE_VERSION,
      sections: [section],
      pages: [],
      activeSectionId: section.id,
      activePageId: null,
      viewMode: "notes",
      sidebarCollapsed: false
    };
  }

  function cleanStatus(value) {
    return Object.prototype.hasOwnProperty.call(STATUS_LABELS, value) ? value : "notes";
  }

  function normalizeState(raw) {
    // v2.10.0 deliberately starts DM Notes clean. The older spatial-board
    // formats (v1-v4) are not migrated because the user requested all of the
    // pre-filled/board content be removed rather than carried into the simpler notebook.
    if (!raw || typeof raw !== "object" || Number(raw.version) !== STATE_VERSION) {
      return defaultState();
    }

    const normalized = {
      version: STATE_VERSION,
      sections: Array.isArray(raw.sections) ? raw.sections.map((section, index) => ({
        id: String(section.id || uid("section")),
        name: String(section.name || "Untitled Section").trim() || "Untitled Section",
        createdAt: String(section.createdAt || nowIso()),
        order: Number.isFinite(Number(section.order)) ? Number(section.order) : index
      })) : [],
      pages: Array.isArray(raw.pages) ? raw.pages.map((page, index) => ({
        id: String(page.id || uid("page")),
        sectionId: String(page.sectionId || ""),
        title: String(page.title || "Untitled page"),
        bodyHtml: sanitizeHtml(String(page.bodyHtml || "")),
        status: cleanStatus(page.status),
        pinned: Boolean(page.pinned),
        createdAt: String(page.createdAt || nowIso()),
        updatedAt: String(page.updatedAt || page.createdAt || nowIso()),
        order: Number.isFinite(Number(page.order)) ? Number(page.order) : index
      })) : [],
      activeSectionId: raw.activeSectionId ? String(raw.activeSectionId) : null,
      activePageId: raw.activePageId ? String(raw.activePageId) : null,
      viewMode: raw.viewMode === "board" ? "board" : "notes",
      sidebarCollapsed: Boolean(raw.sidebarCollapsed)
    };

    if (!normalized.sections.length) {
      const fallback = defaultState();
      normalized.sections = fallback.sections;
      normalized.activeSectionId = fallback.activeSectionId;
    }

    const sectionIds = new Set(normalized.sections.map((section) => section.id));
    normalized.pages = normalized.pages.filter((page) => sectionIds.has(page.sectionId));

    if (!sectionIds.has(normalized.activeSectionId)) {
      normalized.activeSectionId = normalized.sections.slice().sort((a, b) => a.order - b.order)[0].id;
    }
    if (!normalized.pages.some((page) => page.id === normalized.activePageId)) {
      normalized.activePageId = firstPageId(normalized.activeSectionId, normalized);
    }
    return normalized;
  }

  function firstPageId(sectionId, source = state) {
    return source.pages
      .filter((page) => page.sectionId === sectionId)
      .sort(pageSort)[0]?.id || null;
  }

  function pageSort(a, b) {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return (Number(a.order) || 0) - (Number(b.order) || 0) || String(b.updatedAt).localeCompare(String(a.updatedAt));
  }

  function loadState() {
    let parsed = null;
    try {
      parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (_error) {
      parsed = null;
    }
    const wasLegacy = parsed && Number(parsed.version) !== STATE_VERSION;
    state = normalizeState(parsed);
    if (wasLegacy) saveNow(true, "Previous board notes cleared");
  }

  function stateBytes(value = state) {
    return new Blob([JSON.stringify(value)]).size;
  }

  function scheduleSave() {
    const status = byId("dmNotebookSaveStatus");
    if (status) status.textContent = "Saving…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveNow(false), 450);
  }

  function saveNow(markCloud = true, message = "") {
    if (!state) return;
    clearTimeout(saveTimer);
    saveTimer = null;
    state.version = STATE_VERSION;
    const json = JSON.stringify(state);
    try {
      localStorage.setItem(STORAGE_KEY, json);
      if (markCloud && window.AldorCloudSync && typeof window.AldorCloudSync.markLocalChange === "function") {
        window.AldorCloudSync.markLocalChange(STORAGE_KEY);
      }
      const status = byId("dmNotebookSaveStatus");
      if (status) {
        const kb = Math.max(1, Math.round(new Blob([json]).size / 1024));
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        status.textContent = message || `Saved ${time} · ${kb} KB`;
      }
    } catch (error) {
      const status = byId("dmNotebookSaveStatus");
      if (status) status.textContent = "Could not save locally";
      console.error("DM Notes save failed", error);
    }
  }

  function sectionById(id) {
    return state.sections.find((section) => section.id === id) || null;
  }

  function pageById(id) {
    return state.pages.find((page) => page.id === id) || null;
  }

  function activeSection() {
    return sectionById(state.activeSectionId) || state.sections[0] || null;
  }

  function activePage() {
    return pageById(state.activePageId);
  }

  function nextPageOrder(sectionId, status = null) {
    const matches = state.pages.filter((page) => page.sectionId === sectionId && (!status || page.status === status));
    return matches.length ? Math.max(...matches.map((page) => Number(page.order) || 0)) + 1 : 0;
  }

  function createSection(name = "") {
    const chosen = String(name || window.prompt("Section name:", "New Section") || "").trim();
    if (!chosen) return null;
    const section = { id: uid("section"), name: chosen, createdAt: nowIso(), order: state.sections.length };
    state.sections.push(section);
    state.activeSectionId = section.id;
    state.activePageId = null;
    state.viewMode = "notes";
    saveNow(true);
    renderAll();
    return section;
  }

  function renameSection(sectionId) {
    const section = sectionById(sectionId);
    if (!section) return;
    const name = String(window.prompt("Rename section:", section.name) || "").trim();
    if (!name || name === section.name) return;
    section.name = name;
    saveNow(true);
    renderAll();
  }

  function deleteSection(sectionId) {
    const section = sectionById(sectionId);
    if (!section) return;
    if (state.sections.length <= 1) {
      window.alert("Keep at least one section. You can rename this one instead.");
      return;
    }
    const count = state.pages.filter((page) => page.sectionId === sectionId).length;
    const wording = count ? ` and its ${count} page${count === 1 ? "" : "s"}` : "";
    if (!window.confirm(`Delete “${section.name}”${wording}?`)) return;
    state.sections = state.sections.filter((item) => item.id !== sectionId);
    state.pages = state.pages.filter((page) => page.sectionId !== sectionId);
    if (state.activeSectionId === sectionId) state.activeSectionId = state.sections.slice().sort((a, b) => a.order - b.order)[0].id;
    if (!pageById(state.activePageId)) state.activePageId = firstPageId(state.activeSectionId);
    saveNow(true);
    renderAll();
  }

  function createPage(options = {}) {
    const section = sectionById(options.sectionId) || activeSection();
    if (!section) return null;
    const page = {
      id: uid("page"),
      sectionId: section.id,
      title: String(options.title || "Untitled page"),
      bodyHtml: "",
      status: cleanStatus(options.status),
      pinned: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      order: nextPageOrder(section.id, cleanStatus(options.status))
    };
    state.pages.push(page);
    state.activeSectionId = section.id;
    state.activePageId = page.id;
    state.viewMode = "notes";
    saveNow(true);
    renderAll();
    setTimeout(() => {
      const title = byId("dmNoteTitle");
      if (title) { title.focus(); title.select(); }
    }, 0);
    return page;
  }

  function duplicatePage(pageId) {
    const source = pageById(pageId);
    if (!source) return;
    const copy = {
      ...deepClone(source),
      id: uid("page"),
      title: `${source.title || "Untitled page"} (copy)`,
      pinned: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      order: nextPageOrder(source.sectionId, source.status)
    };
    state.pages.push(copy);
    state.activeSectionId = copy.sectionId;
    state.activePageId = copy.id;
    state.viewMode = "notes";
    saveNow(true);
    renderAll();
  }

  function deletePage(pageId) {
    const page = pageById(pageId);
    if (!page) return;
    if (!window.confirm(`Delete “${page.title || "Untitled page"}”?`)) return;
    const sectionId = page.sectionId;
    state.pages = state.pages.filter((item) => item.id !== pageId);
    if (state.activePageId === pageId) state.activePageId = firstPageId(sectionId);
    saveNow(true);
    renderAll();
  }

  function openPage(pageId) {
    const page = pageById(pageId);
    if (!page) return;
    state.activeSectionId = page.sectionId;
    state.activePageId = page.id;
    state.viewMode = "notes";
    saveNow(false);
    renderAll();
  }

  function setView(mode) {
    state.viewMode = mode === "board" ? "board" : "notes";
    saveNow(false);
    renderMain();
    renderViewButtons();
  }

  function setSidebarCollapsed(collapsed) {
    state.sidebarCollapsed = Boolean(collapsed);
    saveNow(false);
    renderSidebarState();
  }

  function renderAll() {
    ensureValidSelection();
    renderSections();
    renderPages();
    renderSidebarState();
    renderViewButtons();
    renderMain();
  }

  function ensureValidSelection() {
    if (!sectionById(state.activeSectionId)) state.activeSectionId = state.sections[0]?.id || null;
    const page = pageById(state.activePageId);
    if (page && page.sectionId !== state.activeSectionId && !byId("dmNotebookSearch")?.value.trim()) {
      state.activePageId = firstPageId(state.activeSectionId);
    }
  }

  function renderSections() {
    const list = byId("dmNotebookSectionList");
    if (!list) return;
    list.innerHTML = "";
    state.sections.slice().sort((a, b) => a.order - b.order).forEach((section) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `dm-notebook-section${section.id === state.activeSectionId ? " is-active" : ""}`;
      const count = state.pages.filter((page) => page.sectionId === section.id).length;
      button.innerHTML = `<span>${escapeHtml(section.name)}</span><small>${count}</small>`;
      button.addEventListener("click", () => {
        state.activeSectionId = section.id;
        state.activePageId = firstPageId(section.id);
        saveNow(false);
        renderAll();
      });
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        showContextMenu(event.clientX, event.clientY, "section", section.id);
      });
      list.appendChild(button);
    });
  }

  function renderPages() {
    const list = byId("dmNotebookPageList");
    const heading = byId("dmNotebookPagesHeading");
    if (!list || !heading) return;
    list.innerHTML = "";
    const query = String(byId("dmNotebookSearch")?.value || "").trim().toLowerCase();
    let pages;
    if (query) {
      heading.textContent = "Search Results";
      pages = state.pages.filter((page) => {
        const section = sectionById(page.sectionId);
        const haystack = `${page.title} ${plainText(page.bodyHtml)} ${section?.name || ""}`.toLowerCase();
        return haystack.includes(query);
      }).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    } else {
      heading.textContent = activeSection()?.name || "Pages";
      pages = state.pages.filter((page) => page.sectionId === state.activeSectionId).sort(pageSort);
    }

    if (!pages.length) {
      const empty = document.createElement("div");
      empty.className = "dm-notebook-list-empty";
      empty.textContent = query ? "No matching notes." : "No pages in this section.";
      list.appendChild(empty);
      return;
    }

    pages.forEach((page) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `dm-notebook-page-row${page.id === state.activePageId ? " is-active" : ""}`;
      row.draggable = !query;
      const sectionName = query ? `<span class="dm-page-section-name">${escapeHtml(sectionById(page.sectionId)?.name || "")}</span>` : "";
      row.innerHTML = `<span class="dm-page-row-title">${page.pinned ? "★ " : ""}${escapeHtml(page.title || "Untitled page")}</span>${sectionName}<small>${escapeHtml(STATUS_LABELS[page.status])}</small>`;
      row.addEventListener("click", () => openPage(page.id));
      row.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        showContextMenu(event.clientX, event.clientY, "page", page.id);
      });
      if (!query) {
        row.addEventListener("dragstart", (event) => {
          draggingPageId = page.id;
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", page.id);
          row.classList.add("is-dragging");
        });
        row.addEventListener("dragend", () => {
          draggingPageId = null;
          row.classList.remove("is-dragging");
        });
        row.addEventListener("dragover", (event) => event.preventDefault());
        row.addEventListener("drop", (event) => {
          event.preventDefault();
          reorderPageBefore(draggingPageId || event.dataTransfer.getData("text/plain"), page.id);
        });
      }
      list.appendChild(row);
    });
  }

  function reorderPageBefore(sourceId, targetId) {
    if (!sourceId || sourceId === targetId) return;
    const source = pageById(sourceId);
    const target = pageById(targetId);
    if (!source || !target || source.sectionId !== target.sectionId) return;
    const ordered = state.pages.filter((page) => page.sectionId === source.sectionId).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
    const without = ordered.filter((page) => page.id !== sourceId);
    const index = without.findIndex((page) => page.id === targetId);
    without.splice(Math.max(0, index), 0, source);
    without.forEach((page, idx) => { page.order = idx; });
    saveNow(true);
    renderPages();
    if (state.viewMode === "board") renderBoard();
  }

  function renderSidebarState() {
    const sidebar = byId("dmNotebookSidebar");
    const rail = byId("dmNotebookSidebarRail");
    if (!sidebar || !rail) return;
    sidebar.classList.toggle("is-collapsed", state.sidebarCollapsed);
    rail.hidden = !state.sidebarCollapsed;
  }

  function renderViewButtons() {
    byId("dmNotebookNotesView")?.classList.toggle("is-active", state.viewMode === "notes");
    byId("dmNotebookBoardView")?.classList.toggle("is-active", state.viewMode === "board");
  }

  function renderMain() {
    const editor = byId("dmNoteEditor");
    const board = byId("dmKanbanView");
    const empty = byId("dmNotebookEmpty");
    if (!editor || !board || !empty) return;

    if (state.viewMode === "board") {
      editor.hidden = true;
      empty.hidden = true;
      board.hidden = false;
      renderBoard();
      return;
    }

    board.hidden = true;
    const page = activePage();
    if (!page) {
      editor.hidden = true;
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    editor.hidden = false;
    renderEditor(page);
  }

  function renderEditor(page) {
    const title = byId("dmNoteTitle");
    const body = byId("dmNoteBody");
    const status = byId("dmNoteStatus");
    const sectionSelect = byId("dmNoteSection");
    const pin = byId("dmNotePin");
    const updated = byId("dmNoteUpdated");
    if (!title || !body || !status || !sectionSelect || !pin || !updated) return;

    title.value = page.title;
    body.innerHTML = sanitizeHtml(page.bodyHtml || "");
    title.dataset.pageId = page.id;
    body.dataset.pageId = page.id;
    status.value = cleanStatus(page.status);
    sectionSelect.innerHTML = state.sections.slice().sort((a, b) => a.order - b.order).map((section) => `<option value="${escapeAttr(section.id)}">${escapeHtml(section.name)}</option>`).join("");
    sectionSelect.value = page.sectionId;
    pin.textContent = page.pinned ? "★" : "☆";
    pin.classList.toggle("is-pinned", page.pinned);
    pin.title = page.pinned ? "Unpin page" : "Pin page";
    const date = new Date(page.updatedAt);
    updated.textContent = Number.isNaN(date.getTime()) ? "" : `Updated ${date.toLocaleDateString([], { day: "numeric", month: "short" })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  function renderBoard() {
    const section = activeSection();
    byId("dmKanbanSectionName").textContent = section?.name || "Board";
    const buckets = { notes: [], todo: [], done: [] };
    state.pages.filter((page) => page.sectionId === state.activeSectionId).sort(pageSort).forEach((page) => buckets[cleanStatus(page.status)].push(page));
    const mapping = {
      notes: ["dmKanbanNotes", "dmKanbanCountNotes"],
      todo: ["dmKanbanTodo", "dmKanbanCountTodo"],
      done: ["dmKanbanDone", "dmKanbanCountDone"]
    };
    Object.entries(mapping).forEach(([status, ids]) => {
      const list = byId(ids[0]);
      const count = byId(ids[1]);
      if (!list || !count) return;
      count.textContent = String(buckets[status].length);
      list.innerHTML = "";
      buckets[status].forEach((page) => list.appendChild(makeKanbanCard(page)));
    });
  }

  function makeKanbanCard(page) {
    const card = document.createElement("article");
    card.className = "dm-kanban-card";
    card.draggable = true;
    card.dataset.pageId = page.id;
    const excerpt = plainText(page.bodyHtml).trim().replace(/\s+/g, " ").slice(0, 180);
    card.innerHTML = `<div class="dm-kanban-card-title">${page.pinned ? "★ " : ""}${escapeHtml(page.title || "Untitled page")}</div>${excerpt ? `<p>${escapeHtml(excerpt)}${plainText(page.bodyHtml).trim().length > 180 ? "…" : ""}</p>` : "<p class=\"muted\">Empty note</p>"}`;
    card.addEventListener("click", () => openPage(page.id));
    card.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      showContextMenu(event.clientX, event.clientY, "page", page.id);
    });
    card.addEventListener("dragstart", (event) => {
      draggingPageId = page.id;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", page.id);
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => {
      draggingPageId = null;
      card.classList.remove("is-dragging");
    });
    return card;
  }

  function movePageToStatus(pageId, status) {
    const page = pageById(pageId);
    if (!page) return;
    page.status = cleanStatus(status);
    page.order = nextPageOrder(page.sectionId, page.status);
    touchPage(page);
    saveNow(true);
    renderPages();
    renderBoard();
  }

  function touchPage(page) {
    if (page) page.updatedAt = nowIso();
  }

  function saveEditorToState() {
    const page = activePage();
    if (!page) return;
    const title = byId("dmNoteTitle");
    const body = byId("dmNoteBody");
    if (!title || !body || title.dataset.pageId !== page.id || body.dataset.pageId !== page.id) return;
    page.title = title.value.trimStart() || "Untitled page";
    page.bodyHtml = sanitizeHtml(body.innerHTML);
    touchPage(page);
    scheduleSave();
    renderPages();
  }

  function changePageSection(sectionId) {
    const page = activePage();
    if (!page || !sectionById(sectionId) || page.sectionId === sectionId) return;
    page.sectionId = sectionId;
    page.order = nextPageOrder(sectionId, page.status);
    touchPage(page);
    state.activeSectionId = sectionId;
    saveNow(true);
    renderAll();
  }

  function togglePin(pageId) {
    const page = pageById(pageId);
    if (!page) return;
    page.pinned = !page.pinned;
    touchPage(page);
    saveNow(true);
    renderAll();
  }

  function showContextMenu(x, y, type, id) {
    const menu = byId("dmNotebookContextMenu");
    if (!menu) return;
    contextTarget = { type, id };
    const actions = [];
    if (type === "section") {
      actions.push(["rename-section", "Rename Section"], ["new-page-here", "New Page Here"], ["delete-section", "Delete Section", "danger"]);
    } else if (type === "page") {
      const page = pageById(id);
      actions.push(["open-page", "Open"], ["toggle-pin", page?.pinned ? "Unpin" : "Pin"], ["duplicate-page", "Duplicate"], ["delete-page", "Delete", "danger"]);
    }
    menu.innerHTML = actions.map(([action, label, cls]) => `<button type="button" data-action="${action}"${cls ? ` class="${cls}"` : ""}>${escapeHtml(label)}</button>`).join("");
    menu.hidden = false;
    const margin = 8;
    requestAnimationFrame(() => {
      const rect = menu.getBoundingClientRect();
      menu.style.left = `${Math.max(margin, Math.min(x, window.innerWidth - rect.width - margin))}px`;
      menu.style.top = `${Math.max(margin, Math.min(y, window.innerHeight - rect.height - margin))}px`;
    });
  }

  function hideContextMenu() {
    const menu = byId("dmNotebookContextMenu");
    if (menu) menu.hidden = true;
    contextTarget = null;
  }

  function handleContextAction(action) {
    const target = contextTarget;
    hideContextMenu();
    if (!target) return;
    if (action === "rename-section") renameSection(target.id);
    else if (action === "new-page-here") createPage({ sectionId: target.id });
    else if (action === "delete-section") deleteSection(target.id);
    else if (action === "open-page") openPage(target.id);
    else if (action === "toggle-pin") togglePin(target.id);
    else if (action === "duplicate-page") duplicatePage(target.id);
    else if (action === "delete-page") deletePage(target.id);
  }

  function openPageActionsMenu() {
    const page = activePage();
    const button = byId("dmNoteMore");
    if (!page || !button) return;
    const rect = button.getBoundingClientRect();
    showContextMenu(rect.right - 160, rect.bottom + 4, "page", page.id);
  }

  function execEditorCommand(command, value = null) {
    const body = byId("dmNoteBody");
    if (!body || body.hidden) return;
    restoreEditorRange();
    body.focus();
    document.execCommand(command, false, value);
    captureEditorRange();
    saveEditorToState();
  }

  function applyBlockFormat(tag) {
    const valid = ["p", "h2", "h3"].includes(tag) ? tag : "p";
    execEditorCommand("formatBlock", valid);
  }

  function insertChecklist() {
    const body = byId("dmNoteBody");
    if (!body) return;
    restoreEditorRange();
    body.focus();
    document.execCommand("insertHTML", false, '<div class="dm-note-checkline"><span data-dm-check="false" contenteditable="false">☐</span>&nbsp;</div>');
    captureEditorRange();
    saveEditorToState();
  }

  function addLink() {
    const url = String(window.prompt("Link URL:", "https://") || "").trim();
    if (!url) return;
    let safeUrl = url;
    if (!/^(https?:|mailto:)/i.test(safeUrl)) safeUrl = `https://${safeUrl}`;
    restoreEditorRange();
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      execEditorCommand("createLink", safeUrl);
    } else {
      document.execCommand("insertHTML", false, `<a href="${escapeAttr(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(safeUrl)}</a>`);
      saveEditorToState();
    }
  }

  function captureEditorRange() {
    const selection = window.getSelection();
    const body = byId("dmNoteBody");
    if (!selection || !selection.rangeCount || !body) return;
    const range = selection.getRangeAt(0);
    if (body.contains(range.commonAncestorContainer)) savedRange = range.cloneRange();
  }

  function restoreEditorRange() {
    const body = byId("dmNoteBody");
    if (!body || !savedRange) return;
    try {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange);
    } catch (_error) {
      savedRange = null;
    }
  }

  async function compressImageFile(file) {
    if (!file || !String(file.type || "").startsWith("image/")) throw new Error("Choose an image file.");
    const objectUrl = URL.createObjectURL(file);
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("The image could not be read."));
        img.src = objectUrl;
      });
      let maxDim = 1400;
      let quality = 0.84;
      let dataUrl = "";
      let width = image.naturalWidth;
      let height = image.naturalHeight;
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const scale = Math.min(1, maxDim / Math.max(image.naturalWidth, image.naturalHeight));
        width = Math.max(1, Math.round(image.naturalWidth * scale));
        height = Math.max(1, Math.round(image.naturalHeight * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { alpha: true });
        context.drawImage(image, 0, 0, width, height);
        dataUrl = canvas.toDataURL("image/webp", quality);
        const bytes = Math.ceil((dataUrl.length - dataUrl.indexOf(",") - 1) * 0.75);
        if (bytes <= IMAGE_TARGET_BYTES) break;
        if (quality > 0.52) quality -= 0.08;
        else maxDim = Math.round(maxDim * 0.82);
      }
      return { dataUrl, width, height };
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  async function insertImageFile(file) {
    const page = activePage();
    const body = byId("dmNoteBody");
    if (!page || !body) return;
    const status = byId("dmNotebookSaveStatus");
    if (status) status.textContent = "Compressing image…";
    try {
      const image = await compressImageFile(file);
      const candidate = deepClone(state);
      const candidatePage = candidate.pages.find((item) => item.id === page.id);
      const imageHtml = `<p><img src="${image.dataUrl}" alt="${escapeAttr(file.name || "Note image")}"></p>`;
      candidatePage.bodyHtml += imageHtml;
      if (stateBytes(candidate) > MAX_STATE_BYTES) throw new Error("That image would make DM Notes too large for reliable browser/cloud storage. Try a smaller image.");
      restoreEditorRange();
      body.focus();
      document.execCommand("insertHTML", false, imageHtml);
      captureEditorRange();
      saveEditorToState();
      saveNow(true);
    } catch (error) {
      window.alert(error?.message || "Could not add that image.");
      saveNow(false);
    }
  }

  function handlePaste(event) {
    const items = Array.from(event.clipboardData?.items || []);
    const imageItem = items.find((item) => String(item.type || "").startsWith("image/"));
    if (!imageItem) return;
    const file = imageItem.getAsFile();
    if (!file) return;
    event.preventDefault();
    captureEditorRange();
    insertImageFile(file);
  }

  function sanitizeHtml(html) {
    if (!html) return "";
    const template = document.createElement("template");
    template.innerHTML = html;
    const blocked = template.content.querySelectorAll("script,style,iframe,object,embed,form,input,button,textarea,select,meta,link");
    blocked.forEach((node) => node.remove());
    template.content.querySelectorAll("*").forEach((element) => {
      const tag = element.tagName.toLowerCase();
      const allowedTags = new Set(["p", "div", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h1", "h2", "h3", "blockquote", "a", "img", "span"]);
      if (!allowedTags.has(tag)) {
        element.replaceWith(...element.childNodes);
        return;
      }
      Array.from(element.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        let keep = false;
        if (tag === "a" && ["href", "target", "rel"].includes(name)) keep = true;
        if (tag === "img" && ["src", "alt"].includes(name)) keep = true;
        if (tag === "span" && name === "data-dm-check") keep = true;
        if (tag === "span" && name === "contenteditable") keep = true;
        if (name === "class" && ["span", "div"].includes(tag)) keep = true;
        if (!keep) element.removeAttribute(attr.name);
      });
      if (tag === "a") {
        const href = element.getAttribute("href") || "";
        if (!/^(https?:|mailto:)/i.test(href)) element.removeAttribute("href");
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noopener noreferrer");
      }
      if (tag === "img") {
        const src = element.getAttribute("src") || "";
        if (!/^data:image\//i.test(src)) element.remove();
      }
      if (tag === "span" && element.hasAttribute("data-dm-check")) {
        element.setAttribute("contenteditable", "false");
      }
    });
    return template.innerHTML;
  }

  function plainText(html) {
    const template = document.createElement("template");
    template.innerHTML = html || "";
    return template.content.textContent || "";
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  function bindEvents() {
    byId("dmNotebookSidebarToggle")?.addEventListener("click", () => setSidebarCollapsed(!state.sidebarCollapsed));
    byId("dmNotebookSidebarClose")?.addEventListener("click", () => setSidebarCollapsed(true));
    byId("dmNotebookSidebarRail")?.addEventListener("click", () => setSidebarCollapsed(false));
    byId("dmNotebookNewSection")?.addEventListener("click", () => createSection());
    byId("dmNotebookSectionAdd")?.addEventListener("click", () => createSection());
    byId("dmNotebookNewPage")?.addEventListener("click", () => createPage());
    byId("dmNotebookPageAdd")?.addEventListener("click", () => createPage());
    byId("dmNotebookEmptyNewPage")?.addEventListener("click", () => createPage());
    byId("dmNotebookNotesView")?.addEventListener("click", () => setView("notes"));
    byId("dmNotebookBoardView")?.addEventListener("click", () => setView("board"));
    byId("dmNotebookSearch")?.addEventListener("input", () => renderPages());

    byId("dmNoteTitle")?.addEventListener("input", saveEditorToState);
    byId("dmNoteBody")?.addEventListener("input", saveEditorToState);
    byId("dmNoteBody")?.addEventListener("keyup", captureEditorRange);
    byId("dmNoteBody")?.addEventListener("mouseup", captureEditorRange);
    byId("dmNoteBody")?.addEventListener("paste", handlePaste);
    byId("dmNoteBody")?.addEventListener("click", (event) => {
      const check = event.target.closest?.("[data-dm-check]");
      if (!check) return;
      const checked = check.getAttribute("data-dm-check") === "true";
      check.setAttribute("data-dm-check", checked ? "false" : "true");
      check.textContent = checked ? "☐" : "☑";
      saveEditorToState();
    });
    byId("dmNoteStatus")?.addEventListener("change", (event) => {
      const page = activePage();
      if (!page) return;
      page.status = cleanStatus(event.target.value);
      page.order = nextPageOrder(page.sectionId, page.status);
      touchPage(page);
      saveNow(true);
      renderPages();
    });
    byId("dmNoteSection")?.addEventListener("change", (event) => changePageSection(event.target.value));
    byId("dmNotePin")?.addEventListener("click", () => activePage() && togglePin(activePage().id));
    byId("dmNoteMore")?.addEventListener("click", (event) => { event.stopPropagation(); openPageActionsMenu(); });

    byId("dmNoteFormat")?.addEventListener("change", (event) => {
      applyBlockFormat(event.target.value);
      event.target.value = "p";
    });
    document.querySelectorAll("[data-dm-command]").forEach((button) => {
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("click", () => execEditorCommand(button.dataset.dmCommand));
    });
    byId("dmNoteChecklist")?.addEventListener("mousedown", (event) => event.preventDefault());
    byId("dmNoteChecklist")?.addEventListener("click", insertChecklist);
    byId("dmNoteAddLink")?.addEventListener("mousedown", () => captureEditorRange());
    byId("dmNoteAddLink")?.addEventListener("click", addLink);
    byId("dmNoteAddImage")?.addEventListener("mousedown", () => captureEditorRange());
    byId("dmNoteAddImage")?.addEventListener("click", () => byId("dmNoteImageInput")?.click());
    byId("dmNoteImageInput")?.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (file) await insertImageFile(file);
    });

    document.querySelectorAll(".dm-kanban-list").forEach((list) => {
      list.addEventListener("dragover", (event) => {
        event.preventDefault();
        list.classList.add("is-drop-target");
      });
      list.addEventListener("dragleave", () => list.classList.remove("is-drop-target"));
      list.addEventListener("drop", (event) => {
        event.preventDefault();
        list.classList.remove("is-drop-target");
        const pageId = draggingPageId || event.dataTransfer.getData("text/plain");
        movePageToStatus(pageId, list.dataset.status);
      });
    });
    document.querySelectorAll("[data-add-status]").forEach((button) => {
      button.addEventListener("click", () => createPage({ status: button.dataset.addStatus }));
    });

    byId("dmNotebookContextMenu")?.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (button) handleContextAction(button.dataset.action);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest("#dmNotebookContextMenu") && !event.target.closest("#dmNoteMore")) hideContextMenu();
    });
    window.addEventListener("resize", hideContextMenu);

    document.addEventListener("keydown", (event) => {
      if (!document.body.classList.contains("dm-notes-workspace")) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        byId("dmNotebookSearch")?.focus();
      }
      if ((event.ctrlKey || event.metaKey) && event.altKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        createPage();
      }
    });
  }

  function init() {
    if (initialised) return;
    initialised = true;
    loadState();
    bindEvents();
    renderAll();
    saveNow(false);
  }

  function exportState() {
    if (!state) loadState();
    saveEditorToState();
    return deepClone(state);
  }

  function importState(payload) {
    state = normalizeState(payload);
    saveNow(true);
    if (initialised) renderAll();
  }

  window.AldorDMNotes = {
    init,
    exportState,
    importState,
    createPage: (options = {}) => createPage(options),
    openPage: (pageId) => openPage(pageId),
    storageKey: STORAGE_KEY
  };
})();
