(() => {
  "use strict";

  const STORAGE_KEY = "aldor.dmNotes.v1";
  const STATE_VERSION = 3;
  const SESSION_BOARD_ID = "board-current-session";
  const WORLD_WIDTH = 4200;
  const WORLD_HEIGHT = 3000;
  const MIN_SCALE = 0.35;
  const MAX_SCALE = 2.25;
  const MAX_STATE_BYTES = 4_300_000;
  const IMAGE_TARGET_BYTES = 620_000;
  const PORTRAIT_TARGET_BYTES = 180_000;
  const HISTORY_MAX_ENTRIES = 18;
  const HISTORY_MAX_CHARS = 12_000_000;

  const STARTER_BOARDS = [
    "Party",
    "Factions & NPCs",
    "Quests / Missions",
    "Items",
    "Sessions",
    "General Notes"
  ];

  const CARD_TYPES = {
    note: { label: "Note", icon: "NOTE", color: "#eadcae" },
    pc: { label: "PC", icon: "PC", color: "#d8e5cf" },
    npc: { label: "NPC", icon: "NPC", color: "#e4d7ec" },
    faction: { label: "Faction", icon: "FAC", color: "#d1dfeb" },
    quest: { label: "Quest", icon: "QST", color: "#eddaa3" },
    location: { label: "Location", icon: "LOC", color: "#d7e5dc" },
    encounter: { label: "Encounter", icon: "ENC", color: "#ead0cf" },
    session: { label: "Session", icon: "SES", color: "#d5e3c8" },
    item: { label: "Item", icon: "ITM", color: "#e6dccb" },
    important: { label: "Important", icon: "!", color: "#ead0cf" },
    reference: { label: "Reference", icon: "REF", color: "#d1dfeb" },
    portal: { label: "Board Link", icon: "→", color: "#d6e0ea" }
  };

  const APP_LINKS = {
    "": { label: "None" },
    map: { label: "Map", tab: "map" },
    factions: { label: "Factions", tab: "factions" },
    encounters: { label: "Encounters", tab: "tables", target: "encounters-card" },
    delerium: { label: "Delerium", tab: "tables", target: "delerium-card" },
    tables: { label: "Other Tables", tab: "tables", target: "other-tables-card" },
    crafting: { label: "Crafting", tab: "crafting" },
    shop: { label: "Shop", tab: "shop" }
  };

  const BOARD_BACKGROUNDS = new Set(["cork", "dark", "paper", "grid", "plain"]);

  function defaultTemplates() {
    const definitions = [
      ["tpl-blank", "Blank Card", "note", "", "", [], ""],
      ["tpl-pc", "PC", "pc", "", "", [], "Current situation\n\nGoals\n\nSecrets\n\nNPC relationships\n\nCharacter-specific hooks\n\nThings to remember\n☐ "],
      ["tpl-npc", "NPC", "npc", "", "", [], "Role & manner\n\nWants\n\nKnows / may reveal\n\nWon't reveal\n\nDialogue / lines\n\nCurrent situation"],
      ["tpl-faction", "Faction", "faction", "", "", [], "Current objectives\n\nImportant NPCs\n\nRelationship with party\n\nCurrent plans\n\nConsequences / developments"],
      ["tpl-quest", "Quest / Mission", "quest", "", "Active", [], "Objective\n\nStatus / who gave it\n\nImportant information\n\nPossible outcomes\n\nRewards"],
      ["tpl-item", "Item", "item", "", "", [], "Current owner / location\n\nImportance\n\nRelevant information"],
      ["tpl-session", "Session", "session", "", "", [], "OPENING\n\nEXPECTED STRUCTURE\n\nNPC SCENES / DIALOGUE\n\nPOSSIBLE ENCOUNTERS\n\nTRAVEL / ROUTES\n\nTHINGS LIKELY TO HAPPEN\n\nREMINDERS\n☐ \n\nEND-OF-SESSION CONSEQUENCES"],
      ["tpl-location", "Location", "location", "", "", [], "What it looks / feels like\n\nWho is here\n\nWhat can happen\n\nSecrets / discoveries\n\nRoutes in / out"],
      ["tpl-encounter", "Encounter", "encounter", "", "", [], "Trigger\n\nCreatures / threat\n\nTerrain / complications\n\nWhat changes if avoided or resolved"]
    ];
    return definitions.map(([id, name, type, color, status, tags, body]) => ({
      id,
      name,
      type,
      color: color || CARD_TYPES[type]?.color || CARD_TYPES.note.color,
      status,
      tags,
      body
    }));
  }

  let state = null;
  let activeBoardId = null;
  let runMode = false;
  let previousBoardId = null;
  let saveTimer = null;
  let initialised = false;
  let interaction = null;
  let connectSource = null;
  let connectMode = false;
  let selectedConnectionId = null;
  let imageUploadBusy = false;
  let pendingCreatePoint = null;
  let lastBoardPointer = null;
  let selection = new Set();
  let historyUndo = [];
  let historyRedo = [];
  let navHistory = [];
  let navIndex = -1;
  let currentContext = null;

  const byId = (id) => document.getElementById(id);
  const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const deepClone = (value) => JSON.parse(JSON.stringify(value));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const snapValue = (value, grid) => Math.round(value / grid) * grid;

  function escapeText(value) {
    return String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function makeBoard(name, options = {}) {
    return {
      id: String(options.id || uid("board")),
      name: String(name || "Untitled Board").trim() || "Untitled Board",
      session: Boolean(options.session),
      createdAt: String(options.createdAt || nowIso()),
      background: BOARD_BACKGROUNDS.has(options.background) ? options.background : "cork",
      snap: Boolean(options.snap),
      gridSize: clamp(Number(options.gridSize) || 20, 10, 100)
    };
  }

  function defaultState() {
    const boards = [makeBoard("Current Session", { id: SESSION_BOARD_ID, session: true })]
      .concat(STARTER_BOARDS.map((name) => makeBoard(name)));
    return {
      version: STATE_VERSION,
      boards,
      cards: [],
      placements: [],
      images: [],
      frames: [],
      connections: [],
      templates: defaultTemplates(),
      boardViews: {},
      activeBoardId: boards[1]?.id || SESSION_BOARD_ID,
      ui: { sidebarOpen: true }
    };
  }

  function legacyBlocksToBody(blocks, noteLookup) {
    if (!Array.isArray(blocks)) return "";
    return blocks.map((block) => {
      const type = String(block?.type || "text");
      if (type === "heading") return String(block?.content || "").trim();
      if (type === "checklist") {
        const title = String(block?.title || "Checklist").trim();
        const items = Array.isArray(block?.items)
          ? block.items.map((item) => `${item?.done ? "☑" : "☐"} ${String(item?.text || "").trim()}`).filter((line) => line.trim().length > 1)
          : [];
        return [title, ...items].filter(Boolean).join("\n");
      }
      if (type === "reference") {
        const refTitle = noteLookup?.get(String(block?.noteId || "")) || "Referenced note";
        return `Reference: ${refTitle}`;
      }
      const title = String(block?.title || "").trim();
      const content = String(block?.content || "").trim();
      return [title, content].filter(Boolean).join("\n");
    }).filter(Boolean).join("\n\n");
  }

  function gridPosition(index) {
    const columns = 4;
    return {
      x: 180 + (index % columns) * 390,
      y: 170 + Math.floor(index / columns) * 300
    };
  }

  function migrateLegacyState(raw) {
    const legacyFolders = Array.isArray(raw?.folders) ? raw.folders : [];
    const legacyNotes = Array.isArray(raw?.notes) ? raw.notes : [];
    const noteLookup = new Map(legacyNotes.map((note) => [String(note?.id || ""), String(note?.title || "Untitled Note")]));
    const folderLookup = new Map(legacyFolders.map((folder) => [String(folder?.id || ""), folder]));
    const pathForFolder = (folderId) => {
      const parts = [];
      const seen = new Set();
      let current = folderLookup.get(String(folderId || ""));
      while (current && !seen.has(current.id)) {
        seen.add(current.id);
        parts.unshift(String(current.name || "Untitled Board"));
        current = current.parentId ? folderLookup.get(String(current.parentId)) : null;
      }
      return parts.join(" / ") || "General Notes";
    };

    const boardByLegacyFolder = new Map();
    const boards = [makeBoard("Current Session", { id: SESSION_BOARD_ID, session: true })];
    legacyFolders.forEach((folder) => {
      const board = makeBoard(pathForFolder(folder.id));
      boards.push(board);
      boardByLegacyFolder.set(String(folder.id), board.id);
    });
    if (boards.length === 1) STARTER_BOARDS.forEach((name) => boards.push(makeBoard(name)));

    const cards = legacyNotes.map((note) => {
      const type = note?.template && CARD_TYPES[note.template] ? note.template : (note?.template === "faction" ? "faction" : "note");
      return {
        id: String(note?.id || uid("card")),
        title: String(note?.title || "Untitled Card"),
        body: legacyBlocksToBody(note?.blocks, noteLookup),
        tags: Array.isArray(note?.tags) ? note.tags.map(String).filter(Boolean) : [],
        favorite: Boolean(note?.favorite),
        type,
        color: CARD_TYPES[type]?.color || CARD_TYPES.note.color,
        status: "",
        linkBoardId: "",
        appLinks: [],
        portrait: null,
        createdAt: String(note?.createdAt || nowIso()),
        updatedAt: String(note?.updatedAt || note?.createdAt || nowIso())
      };
    });

    const placements = [];
    const boardCounts = new Map();
    cards.forEach((card, index) => {
      const source = legacyNotes[index];
      const boardId = boardByLegacyFolder.get(String(source?.folderId || "")) || boards[1]?.id || SESSION_BOARD_ID;
      const count = boardCounts.get(boardId) || 0;
      boardCounts.set(boardId, count + 1);
      const pos = gridPosition(count);
      placements.push({ id: uid("place"), boardId, cardId: card.id, x: pos.x, y: pos.y, w: 330, h: 230, expandedH: 230, collapsed: false, z: count + 1 });
    });

    const legacySession = new Set(Array.isArray(raw?.sessionNoteIds) ? raw.sessionNoteIds.map(String) : []);
    let sessionCount = 0;
    cards.forEach((card) => {
      if (!legacySession.has(card.id)) return;
      const pos = gridPosition(sessionCount++);
      placements.push({ id: uid("place"), boardId: SESSION_BOARD_ID, cardId: card.id, x: pos.x, y: pos.y, w: 350, h: 240, expandedH: 240, collapsed: false, z: sessionCount });
    });

    return normaliseState({
      version: STATE_VERSION,
      boards,
      cards,
      placements,
      images: [],
      frames: [],
      connections: [],
      templates: defaultTemplates(),
      boardViews: {},
      activeBoardId: boards[1]?.id || SESSION_BOARD_ID,
      ui: { sidebarOpen: true }
    });
  }

  function normalisePortrait(raw) {
    if (!raw || typeof raw !== "object" || !/^data:image\//.test(String(raw.dataUrl || ""))) return null;
    return {
      dataUrl: String(raw.dataUrl),
      posX: clamp(Number(raw.posX) || 50, 0, 100),
      posY: clamp(Number(raw.posY) || 50, 0, 100),
      show: raw.show !== false
    };
  }

  function normaliseState(raw) {
    if (!raw || typeof raw !== "object") return defaultState();
    if (Number(raw.version) < 2 && (Array.isArray(raw.folders) || Array.isArray(raw.notes))) return migrateLegacyState(raw);

    const boards = Array.isArray(raw.boards) ? raw.boards.map((board) => makeBoard(board?.name, {
      id: board?.id,
      session: board?.session,
      createdAt: board?.createdAt,
      background: board?.background,
      snap: board?.snap,
      gridSize: board?.gridSize
    })) : [];

    let sessionBoard = boards.find((board) => board.session || board.id === SESSION_BOARD_ID);
    if (!sessionBoard) {
      sessionBoard = makeBoard("Current Session", { id: SESSION_BOARD_ID, session: true });
      boards.unshift(sessionBoard);
    } else {
      sessionBoard.id = SESSION_BOARD_ID;
      sessionBoard.name = "Current Session";
      sessionBoard.session = true;
      boards.forEach((board) => { if (board !== sessionBoard) board.session = false; });
    }
    if (boards.length === 1) STARTER_BOARDS.forEach((name) => boards.push(makeBoard(name)));

    const boardIds = new Set(boards.map((board) => board.id));
    const cards = Array.isArray(raw.cards) ? raw.cards.map((card) => {
      const legacyType = CARD_TYPES[card?.type] ? card.type : (CARD_TYPES[card?.style] ? card.style : "note");
      return {
        id: String(card?.id || uid("card")),
        title: String(card?.title || "Untitled Card"),
        body: String(card?.body || ""),
        tags: Array.isArray(card?.tags) ? card.tags.map(String).map((tag) => tag.trim()).filter(Boolean) : [],
        favorite: Boolean(card?.favorite),
        type: legacyType,
        color: /^#[0-9a-f]{6}$/i.test(String(card?.color || "")) ? String(card.color) : (CARD_TYPES[legacyType]?.color || CARD_TYPES.note.color),
        status: String(card?.status || "").trim(),
        linkBoardId: boardIds.has(String(card?.linkBoardId || "")) ? String(card.linkBoardId) : "",
        appLinks: Array.isArray(card?.appLinks)
          ? card.appLinks.map(String).filter((key) => key && APP_LINKS[key])
          : (card?.appLink && APP_LINKS[String(card.appLink)] ? [String(card.appLink)] : []),
        portrait: normalisePortrait(card?.portrait),
        createdAt: String(card?.createdAt || nowIso()),
        updatedAt: String(card?.updatedAt || card?.createdAt || nowIso())
      };
    }) : [];
    const cardIds = new Set(cards.map((card) => card.id));

    const placements = Array.isArray(raw.placements) ? raw.placements.map((placement) => {
      const height = clamp(Number(placement?.h) || 230, 58, 900);
      return {
        id: String(placement?.id || uid("place")),
        boardId: String(placement?.boardId || ""),
        cardId: String(placement?.cardId || ""),
        x: Number.isFinite(Number(placement?.x)) ? Number(placement.x) : 180,
        y: Number.isFinite(Number(placement?.y)) ? Number(placement.y) : 170,
        w: clamp(Number(placement?.w) || 330, 190, 900),
        h: height,
        expandedH: clamp(Number(placement?.expandedH) || Math.max(140, height), 140, 900),
        collapsed: Boolean(placement?.collapsed),
        z: Number(placement?.z) || 1
      };
    }).filter((placement) => boardIds.has(placement.boardId) && cardIds.has(placement.cardId)) : [];

    const images = Array.isArray(raw.images) ? raw.images.map((image) => ({
      id: String(image?.id || uid("image")),
      boardId: String(image?.boardId || ""),
      dataUrl: String(image?.dataUrl || ""),
      caption: String(image?.caption || ""),
      captionVisible: image?.captionVisible !== false,
      x: Number.isFinite(Number(image?.x)) ? Number(image.x) : 250,
      y: Number.isFinite(Number(image?.y)) ? Number(image.y) : 220,
      w: clamp(Number(image?.w) || 360, 120, 1200),
      h: clamp(Number(image?.h) || 270, 100, 1200),
      aspect: Number(image?.aspect) > 0 ? Number(image.aspect) : 4 / 3,
      fit: image?.fit === "cover" ? "cover" : "contain",
      posX: clamp(Number(image?.posX) || 50, 0, 100),
      posY: clamp(Number(image?.posY) || 50, 0, 100),
      z: Number(image?.z) || 1,
      createdAt: String(image?.createdAt || nowIso())
    })).filter((image) => boardIds.has(image.boardId) && /^data:image\//.test(image.dataUrl)) : [];
    const imageIds = new Set(images.map((image) => image.id));

    const frames = Array.isArray(raw.frames) ? raw.frames.map((frame) => ({
      id: String(frame?.id || uid("frame")),
      boardId: String(frame?.boardId || ""),
      label: String(frame?.label || "Group"),
      color: /^#[0-9a-f]{6}$/i.test(String(frame?.color || "")) ? String(frame.color) : "#b08b48",
      x: Number.isFinite(Number(frame?.x)) ? Number(frame.x) : 140,
      y: Number.isFinite(Number(frame?.y)) ? Number(frame.y) : 130,
      w: clamp(Number(frame?.w) || 760, 260, 1800),
      h: clamp(Number(frame?.h) || 500, 180, 1400),
      z: Number(frame?.z) || 1
    })).filter((frame) => boardIds.has(frame.boardId)) : [];

    const validEndpoint = (type, id, boardId) => {
      if (type === "card") return placements.some((placement) => placement.boardId === boardId && placement.cardId === id);
      if (type === "image") return imageIds.has(id) && images.some((image) => image.id === id && image.boardId === boardId);
      return false;
    };

    const connections = Array.isArray(raw.connections) ? raw.connections.map((connection) => ({
      id: String(connection?.id || uid("link")),
      boardId: String(connection?.boardId || ""),
      fromType: connection?.fromType === "image" ? "image" : "card",
      fromId: String(connection?.fromId || ""),
      toType: connection?.toType === "image" ? "image" : "card",
      toId: String(connection?.toId || ""),
      label: String(connection?.label || ""),
      style: ["solid", "dashed", "conflict", "arrow"].includes(connection?.style) ? connection.style : "solid"
    })).filter((connection) => boardIds.has(connection.boardId)
      && validEndpoint(connection.fromType, connection.fromId, connection.boardId)
      && validEndpoint(connection.toType, connection.toId, connection.boardId)
      && !(connection.fromType === connection.toType && connection.fromId === connection.toId)) : [];

    const templates = Array.isArray(raw.templates) && raw.templates.length ? raw.templates.map((template) => {
      const type = CARD_TYPES[template?.type] ? template.type : "note";
      return {
        id: String(template?.id || uid("tpl")),
        name: String(template?.name || "Template").trim() || "Template",
        type,
        color: /^#[0-9a-f]{6}$/i.test(String(template?.color || "")) ? String(template.color) : CARD_TYPES[type].color,
        status: String(template?.status || "").trim(),
        tags: Array.isArray(template?.tags) ? template.tags.map(String).map((tag) => tag.trim()).filter(Boolean) : [],
        body: String(template?.body || "")
      };
    }) : defaultTemplates();

    const boardViews = {};
    if (raw.boardViews && typeof raw.boardViews === "object") {
      Object.entries(raw.boardViews).forEach(([boardId, view]) => {
        if (!boardIds.has(boardId)) return;
        boardViews[boardId] = {
          x: Number(view?.x) || 0,
          y: Number(view?.y) || 0,
          scale: clamp(Number(view?.scale) || 1, MIN_SCALE, MAX_SCALE)
        };
      });
    }

    const active = boardIds.has(String(raw.activeBoardId || "")) ? String(raw.activeBoardId) : boards.find((board) => !board.session)?.id || SESSION_BOARD_ID;
    return {
      version: STATE_VERSION,
      boards,
      cards,
      placements,
      images,
      frames,
      connections,
      templates,
      boardViews,
      activeBoardId: active,
      ui: { sidebarOpen: raw?.ui?.sidebarOpen !== false }
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      state = raw ? normaliseState(JSON.parse(raw)) : defaultState();
    } catch (_error) {
      state = defaultState();
    }
    activeBoardId = state.activeBoardId;
    saveNow(false);
  }

  function stateBytes(candidate = state) {
    try {
      return new Blob([JSON.stringify(candidate)]).size;
    } catch (_error) {
      return JSON.stringify(candidate).length;
    }
  }

  function storageLabel() {
    const bytes = stateBytes();
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  function saveNow(markCloud = true) {
    if (!state) return;
    state.activeBoardId = activeBoardId;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("DM Notes save failed", error);
      const status = byId("dmBoardSaveStatus");
      if (status) status.textContent = "Save failed — image storage may be full";
      return;
    }
    if (markCloud && window.AldorCloudSync && typeof window.AldorCloudSync.markLocalChange === "function") {
      window.AldorCloudSync.markLocalChange(STORAGE_KEY);
    }
    const status = byId("dmBoardSaveStatus");
    if (status) status.textContent = `Saved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · ${storageLabel()}`;
  }

  function scheduleSave() {
    const status = byId("dmBoardSaveStatus");
    if (status) status.textContent = "Saving…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveNow(true), 400);
  }

  function snapshot() {
    return JSON.stringify({ state, activeBoardId });
  }

  function trimHistory() {
    while (historyUndo.length > HISTORY_MAX_ENTRIES) historyUndo.shift();
    let total = historyUndo.reduce((sum, item) => sum + item.snapshot.length, 0);
    while (historyUndo.length > 1 && total > HISTORY_MAX_CHARS) {
      total -= historyUndo[0].snapshot.length;
      historyUndo.shift();
    }
  }

  function recordHistory(label) {
    if (!state) return;
    historyUndo.push({ label, snapshot: snapshot() });
    historyRedo = [];
    trimHistory();
    updateUndoButtons();
  }

  function restoreSnapshot(serialized) {
    const parsed = JSON.parse(serialized);
    state = normaliseState(parsed.state);
    activeBoardId = state.boards.some((board) => board.id === parsed.activeBoardId) ? parsed.activeBoardId : state.activeBoardId;
    state.activeBoardId = activeBoardId;
    selection.clear();
    connectSource = null;
    selectedConnectionId = null;
    saveNow(true);
    renderAll();
  }

  function undo() {
    if (!historyUndo.length) return;
    const current = snapshot();
    const entry = historyUndo.pop();
    historyRedo.push({ label: entry.label, snapshot: current });
    restoreSnapshot(entry.snapshot);
    updateUndoButtons();
  }

  function redo() {
    if (!historyRedo.length) return;
    const current = snapshot();
    const entry = historyRedo.pop();
    historyUndo.push({ label: entry.label, snapshot: current });
    restoreSnapshot(entry.snapshot);
    updateUndoButtons();
  }

  function updateUndoButtons() {
    const undoButton = byId("dmBoardUndo");
    const redoButton = byId("dmBoardRedo");
    if (undoButton) {
      undoButton.disabled = !historyUndo.length;
      undoButton.title = historyUndo.length ? `Undo ${historyUndo.at(-1).label}` : "Nothing to undo";
    }
    if (redoButton) {
      redoButton.disabled = !historyRedo.length;
      redoButton.title = historyRedo.length ? `Redo ${historyRedo.at(-1).label}` : "Nothing to redo";
    }
  }

  function boardById(id) {
    return state.boards.find((board) => board.id === id) || null;
  }

  function cardById(id) {
    return state.cards.find((card) => card.id === id) || null;
  }

  function placementFor(boardId, cardId) {
    return state.placements.find((placement) => placement.boardId === boardId && placement.cardId === cardId) || null;
  }

  function imageById(id) {
    return state.images.find((image) => image.id === id) || null;
  }

  function frameById(id) {
    return state.frames.find((frame) => frame.id === id) || null;
  }

  function placementsForCard(cardId) {
    return state.placements.filter((placement) => placement.cardId === cardId);
  }

  function boardView(boardId = activeBoardId) {
    if (!state.boardViews[boardId]) state.boardViews[boardId] = { x: 0, y: 0, scale: 1 };
    return state.boardViews[boardId];
  }

  function nextZ(boardId = activeBoardId) {
    const values = [
      ...state.placements.filter((placement) => placement.boardId === boardId).map((placement) => placement.z || 1),
      ...state.images.filter((image) => image.boardId === boardId).map((image) => image.z || 1),
      ...state.frames.filter((frame) => frame.boardId === boardId).map((frame) => frame.z || 1)
    ];
    return (values.length ? Math.max(...values) : 0) + 1;
  }

  function boardElementsCount(boardId) {
    return state.placements.filter((placement) => placement.boardId === boardId).length
      + state.images.filter((image) => image.boardId === boardId).length
      + state.frames.filter((frame) => frame.boardId === boardId).length;
  }

  function defaultPlacement(boardId, cardId, options = {}) {
    const index = boardElementsCount(boardId);
    const pos = gridPosition(index);
    const w = clamp(Number(options.w) || 340, 190, 900);
    const h = clamp(Number(options.h) || 230, 58, 900);
    return {
      id: uid("place"), boardId, cardId,
      x: Number.isFinite(options.x) ? options.x : pos.x,
      y: Number.isFinite(options.y) ? options.y : pos.y,
      w, h, expandedH: Math.max(140, h), collapsed: false, z: nextZ(boardId)
    };
  }

  function addCardToBoard(cardId, boardId, options = {}) {
    if (!cardById(cardId) || !boardById(boardId) || placementFor(boardId, cardId)) return null;
    const placement = defaultPlacement(boardId, cardId, options);
    state.placements.push(placement);
    return placement;
  }

  function removeCardFromBoard(cardId, boardId) {
    state.placements = state.placements.filter((placement) => !(placement.cardId === cardId && placement.boardId === boardId));
    state.connections = state.connections.filter((connection) => !(connection.boardId === boardId
      && ((connection.fromType === "card" && connection.fromId === cardId) || (connection.toType === "card" && connection.toId === cardId))));
  }

  function pushNav(entry) {
    const boardId = String(entry?.boardId || "");
    if (!boardById(boardId)) return;
    const next = { boardId, cardId: entry?.cardId ? String(entry.cardId) : "" };
    const current = navHistory[navIndex];
    if (current && current.boardId === next.boardId && current.cardId === next.cardId) return;
    navHistory = navHistory.slice(0, navIndex + 1);
    navHistory.push(next);
    if (navHistory.length > 60) navHistory.shift();
    navIndex = navHistory.length - 1;
    updateNavButtons();
  }

  function updateNavButtons() {
    const back = byId("dmBoardBack");
    const forward = byId("dmBoardForward");
    if (back) back.disabled = navIndex <= 0;
    if (forward) forward.disabled = navIndex < 0 || navIndex >= navHistory.length - 1;
  }

  function restoreNavEntry(entry) {
    if (!entry || !boardById(entry.boardId)) return;
    activeBoardId = entry.boardId;
    state.activeBoardId = activeBoardId;
    selection.clear();
    connectSource = null;
    renderAll();
    if (entry.cardId) requestAnimationFrame(() => centerCard(entry.cardId, false));
  }

  function navBack() {
    if (navIndex <= 0) return;
    navIndex -= 1;
    restoreNavEntry(navHistory[navIndex]);
    updateNavButtons();
  }

  function navForward() {
    if (navIndex >= navHistory.length - 1) return;
    navIndex += 1;
    restoreNavEntry(navHistory[navIndex]);
    updateNavButtons();
  }

  function setActiveBoard(boardId, options = {}) {
    if (!boardById(boardId)) return;
    activeBoardId = boardId;
    state.activeBoardId = boardId;
    connectSource = null;
    selectedConnectionId = null;
    selection.clear();
    if (options.history !== false) pushNav({ boardId });
    if (!options.noSave) scheduleSave();
    renderAll();
    if (options.fit) requestAnimationFrame(fitBoard);
  }

  function createBoard(name) {
    const clean = String(name || "").trim();
    if (!clean) return null;
    recordHistory("create board");
    const board = makeBoard(clean);
    state.boards.push(board);
    activeBoardId = board.id;
    state.activeBoardId = activeBoardId;
    saveNow(true);
    pushNav({ boardId: activeBoardId });
    renderAll();
    return board;
  }

  function renameActiveBoard() {
    const board = boardById(activeBoardId);
    if (!board || board.session) return;
    const next = prompt("Board name", board.name);
    if (next === null) return;
    const clean = next.trim();
    if (!clean || clean === board.name) return;
    recordHistory("rename board");
    board.name = clean;
    saveNow(true);
    renderAll();
  }

  function deleteActiveBoard() {
    const board = boardById(activeBoardId);
    if (!board || board.session) return;
    const boardCardIds = state.placements.filter((placement) => placement.boardId === board.id).map((placement) => placement.cardId);
    const orphanIds = boardCardIds.filter((cardId) => placementsForCard(cardId).length === 1);
    const warning = orphanIds.length
      ? `Delete “${board.name}”? ${orphanIds.length} card${orphanIds.length === 1 ? "" : "s"} exist only on this board and will also be deleted. Shared cards will remain on their other boards.`
      : `Delete “${board.name}”? Cards shared with other boards will remain there.`;
    if (!confirm(warning)) return;
    recordHistory("delete board");
    state.boards = state.boards.filter((item) => item.id !== board.id);
    state.placements = state.placements.filter((placement) => placement.boardId !== board.id);
    state.images = state.images.filter((image) => image.boardId !== board.id);
    state.frames = state.frames.filter((frame) => frame.boardId !== board.id);
    state.connections = state.connections.filter((connection) => connection.boardId !== board.id);
    state.cards = state.cards.filter((card) => !orphanIds.includes(card.id));
    state.cards.forEach((card) => { if (card.linkBoardId === board.id) card.linkBoardId = ""; });
    delete state.boardViews[board.id];
    activeBoardId = state.boards.find((item) => !item.session)?.id || SESSION_BOARD_ID;
    saveNow(true);
    pushNav({ boardId: activeBoardId });
    renderAll();
  }

  function createCard({ title, templateId, boardId, point = null, quick = false, linkBoardId = "" }) {
    const template = state.templates.find((item) => item.id === templateId) || state.templates[0] || defaultTemplates()[0];
    const now = nowIso();
    const type = linkBoardId ? "portal" : (CARD_TYPES[template.type] ? template.type : "note");
    const card = {
      id: uid("card"),
      title: String(title || (linkBoardId ? `Open ${boardById(linkBoardId)?.name || "Board"}` : "Untitled Card")).trim() || "Untitled Card",
      body: linkBoardId ? "" : template.body,
      tags: linkBoardId ? [] : [...template.tags],
      favorite: false,
      type,
      color: linkBoardId ? CARD_TYPES.portal.color : template.color,
      status: linkBoardId ? "" : template.status,
      linkBoardId: boardById(linkBoardId) ? linkBoardId : "",
      appLinks: [],
      portrait: null,
      createdAt: now,
      updatedAt: now
    };
    state.cards.push(card);
    const targetBoardId = boardById(boardId) ? boardId : activeBoardId;
    const sourcePoint = point || pendingCreatePoint;
    const placement = addCardToBoard(card.id, targetBoardId, {
      w: quick ? 220 : (linkBoardId ? 250 : 340),
      h: quick ? 150 : (linkBoardId ? 145 : 230)
    });
    if (placement && sourcePoint && targetBoardId === activeBoardId) {
      placement.x = clamp(sourcePoint.x - placement.w / 2, 0, WORLD_WIDTH - placement.w);
      placement.y = clamp(sourcePoint.y - 40, 0, WORLD_HEIGHT - placement.h);
    }
    pendingCreatePoint = null;
    return card;
  }

  function createCardWithHistory(options) {
    recordHistory(options?.quick ? "create quick note" : "create card");
    const card = createCard(options);
    saveNow(true);
    renderAll();
    return card;
  }

  function createQuickCard(point = null) {
    const actualPoint = point || viewportCenterPoint();
    const card = createCardWithHistory({ title: "Quick Note", templateId: state.templates[0]?.id, boardId: activeBoardId, point: actualPoint, quick: true });
    if (card) setTimeout(() => openFocus(card.id), 0);
  }

  function duplicateCard(cardId, boardId = activeBoardId) {
    const card = cardById(cardId);
    if (!card) return;
    recordHistory("duplicate card");
    const now = nowIso();
    const copy = deepClone(card);
    copy.id = uid("card");
    copy.title = `${card.title} — Copy`;
    copy.createdAt = now;
    copy.updatedAt = now;
    state.cards.push(copy);
    const source = placementFor(activeBoardId, cardId) || placementsForCard(cardId)[0];
    const placement = addCardToBoard(copy.id, boardId, {
      x: source ? source.x + 36 : undefined,
      y: source ? source.y + 36 : undefined,
      w: source?.w || 340,
      h: source?.collapsed ? source.expandedH : source?.h || 230
    });
    if (placement && source?.collapsed) {
      placement.collapsed = source.collapsed;
      placement.expandedH = source.expandedH;
      placement.h = source.h;
    }
    saveNow(true);
    renderAll();
  }

  function deleteCard(cardId) {
    const card = cardById(cardId);
    if (!card || !confirm(`Delete “${card.title}” everywhere?`)) return;
    recordHistory("delete card");
    state.cards = state.cards.filter((item) => item.id !== cardId);
    state.placements = state.placements.filter((placement) => placement.cardId !== cardId);
    state.connections = state.connections.filter((connection) => !((connection.fromType === "card" && connection.fromId === cardId) || (connection.toType === "card" && connection.toId === cardId)));
    selection.delete(`card:${cardId}`);
    saveNow(true);
    closeDialog(byId("dmCardDialog"));
    closeDialog(byId("dmCardFocusDialog"));
    renderAll();
  }

  function deleteCardFromBoard(cardId, boardId = activeBoardId) {
    const card = cardById(cardId);
    if (!card) return;
    const memberships = placementsForCard(cardId);
    if (memberships.length <= 1) {
      deleteCard(cardId);
      return;
    }
    if (!confirm(`Remove “${card.title}” from this board? The same card will remain on its other boards.`)) return;
    recordHistory("remove card from board");
    removeCardFromBoard(cardId, boardId);
    selection.delete(`card:${cardId}`);
    saveNow(true);
    renderAll();
  }

  function touchCard(card) {
    card.updatedAt = nowIso();
    scheduleSave();
  }

  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "open");
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function fillTypeSelect(select, selected = "note") {
    if (!select) return;
    select.innerHTML = "";
    Object.entries(CARD_TYPES).forEach(([value, meta]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = meta.label;
      option.selected = value === selected;
      select.appendChild(option);
    });
  }

  function fillTemplateSelect(select, selectedId = "") {
    if (!select) return;
    select.innerHTML = "";
    state.templates.forEach((template) => {
      const option = document.createElement("option");
      option.value = template.id;
      option.textContent = template.name;
      option.selected = template.id === selectedId;
      select.appendChild(option);
    });
  }

  function fillBoardSelect(select, selectedId = activeBoardId, includeSession = true, excludeBoardId = "") {
    if (!select) return;
    select.innerHTML = "";
    state.boards.filter((board) => (includeSession || !board.session) && board.id !== excludeBoardId).forEach((board) => {
      const option = document.createElement("option");
      option.value = board.id;
      option.textContent = board.name;
      option.selected = board.id === selectedId;
      select.appendChild(option);
    });
  }

  function fillAppLinksSelect(select, selected = []) {
    if (!select) return;
    const chosen = new Set(Array.isArray(selected) ? selected : []);
    select.innerHTML = "";
    Object.entries(APP_LINKS).filter(([value]) => value).forEach(([value, info]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = info.label;
      option.selected = chosen.has(value);
      select.appendChild(option);
    });
  }

  function openNewCardDialog(point = null) {
    pendingCreatePoint = point;
    fillTemplateSelect(byId("dmNewCardTemplate"), state.templates[0]?.id);
    fillBoardSelect(byId("dmNewCardBoard"), activeBoardId, true);
    byId("dmNewCardTitle").value = "";
    openDialog(byId("dmNewCardDialog"));
    setTimeout(() => byId("dmNewCardTitle")?.focus(), 0);
  }

  function openNewBoardDialog() {
    byId("dmNewBoardName").value = "";
    openDialog(byId("dmNewBoardDialog"));
    setTimeout(() => byId("dmNewBoardName")?.focus(), 0);
  }

  function cardBoardMembership(cardId) {
    return new Set(state.placements.filter((placement) => placement.cardId === cardId).map((placement) => placement.boardId));
  }

  function renderCardBoardChecks(card) {
    const host = byId("dmCardBoards");
    if (!host) return;
    host.innerHTML = "";
    const membership = cardBoardMembership(card.id);
    state.boards.forEach((board) => {
      const label = document.createElement("label");
      label.className = "dm-board-membership-option";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = membership.has(board.id);
      input.dataset.boardId = board.id;
      input.addEventListener("change", () => {
        if (!byId("dmCardDialog")?.dataset.historyRecorded) {
          recordHistory("change card boards");
          byId("dmCardDialog").dataset.historyRecorded = "1";
        }
        if (input.checked) addCardToBoard(card.id, board.id);
        else {
          const currentMembership = cardBoardMembership(card.id);
          if (currentMembership.size <= 1) {
            input.checked = true;
            alert("A card must remain on at least one board.");
            return;
          }
          removeCardFromBoard(card.id, board.id);
        }
        touchCard(card);
        renderBoard();
        renderBoardSidebar();
      });
      const span = document.createElement("span");
      span.textContent = board.name;
      label.append(input, span);
      host.appendChild(label);
    });
  }

  function updatePortraitPreview(card) {
    const preview = byId("dmCardPortraitPreview");
    if (!preview) return;
    preview.innerHTML = "";
    if (!card?.portrait?.dataUrl) {
      const span = document.createElement("span");
      span.textContent = "No portrait";
      preview.appendChild(span);
      return;
    }
    const img = document.createElement("img");
    img.src = card.portrait.dataUrl;
    img.alt = `${card.title} portrait`;
    img.style.objectPosition = `${card.portrait.posX}% ${card.portrait.posY}%`;
    preview.appendChild(img);
  }

  function openCardEditor(cardId) {
    const card = cardById(cardId);
    if (!card) return;
    const dialog = byId("dmCardDialog");
    dialog.dataset.cardId = card.id;
    dialog.dataset.historyRecorded = "";
    byId("dmCardTitle").value = card.title;
    byId("dmCardBody").value = card.body;
    byId("dmCardTags").value = card.tags.join(", ");
    fillTypeSelect(byId("dmCardType"), card.type);
    byId("dmCardColor").value = card.color;
    byId("dmCardStatus").value = card.status;
    fillBoardSelect(byId("dmCardBoardLink"), card.linkBoardId, true);
    const boardLink = byId("dmCardBoardLink");
    if (boardLink) {
      const none = document.createElement("option");
      none.value = "";
      none.textContent = "None";
      boardLink.insertBefore(none, boardLink.firstChild);
      boardLink.value = card.linkBoardId || "";
    }
    fillAppLinksSelect(byId("dmCardAppLinks"), card.appLinks);
    byId("dmCardFavourite").checked = card.favorite;
    byId("dmCardPortraitX").value = String(card.portrait?.posX ?? 50);
    byId("dmCardPortraitY").value = String(card.portrait?.posY ?? 50);
    byId("dmCardPortraitShow").checked = Boolean(card.portrait?.show);
    updatePortraitPreview(card);
    renderCardBoardChecks(card);
    const path = byId("dmCardUpdated");
    if (path) path.textContent = `Updated ${new Date(card.updatedAt).toLocaleString()}`;
    openDialog(dialog);
  }

  function ensureCardEditHistory() {
    const dialog = byId("dmCardDialog");
    if (!dialog || dialog.dataset.historyRecorded) return;
    recordHistory("edit card");
    dialog.dataset.historyRecorded = "1";
  }

  function syncCardDialogToState() {
    const dialog = byId("dmCardDialog");
    const card = cardById(dialog?.dataset.cardId);
    if (!card) return;
    ensureCardEditHistory();
    card.title = byId("dmCardTitle").value.trim() || "Untitled Card";
    card.body = byId("dmCardBody").value;
    card.tags = byId("dmCardTags").value.split(",").map((tag) => tag.trim()).filter(Boolean);
    card.type = CARD_TYPES[byId("dmCardType").value] ? byId("dmCardType").value : "note";
    card.color = byId("dmCardColor").value;
    card.status = byId("dmCardStatus").value.trim();
    card.linkBoardId = boardById(byId("dmCardBoardLink").value) ? byId("dmCardBoardLink").value : "";
    card.appLinks = [...byId("dmCardAppLinks").selectedOptions].map((option) => option.value).filter((key) => APP_LINKS[key]);
    card.favorite = Boolean(byId("dmCardFavourite").checked);
    if (card.portrait) {
      card.portrait.posX = Number(byId("dmCardPortraitX").value) || 50;
      card.portrait.posY = Number(byId("dmCardPortraitY").value) || 50;
      card.portrait.show = Boolean(byId("dmCardPortraitShow").checked);
    }
    touchCard(card);
    updatePortraitPreview(card);
    renderBoard();
    renderSearchResults();
  }

  async function addCardPortrait(file) {
    const dialog = byId("dmCardDialog");
    const card = cardById(dialog?.dataset.cardId);
    if (!card || !file) return;
    try {
      const compressed = await compressImageFile(file, { maxDim: 600, targetBytes: PORTRAIT_TARGET_BYTES, quality: 0.82 });
      ensureCardEditHistory();
      card.portrait = { dataUrl: compressed.dataUrl, posX: 50, posY: 50, show: true };
      const candidateBytes = stateBytes(state);
      if (candidateBytes > MAX_STATE_BYTES) {
        card.portrait = null;
        throw new Error("That portrait would make DM Notes too large for reliable browser storage. Remove another image or use a smaller file.");
      }
      byId("dmCardPortraitX").value = "50";
      byId("dmCardPortraitY").value = "50";
      byId("dmCardPortraitShow").checked = true;
      touchCard(card);
      updatePortraitPreview(card);
      renderBoard();
    } catch (error) {
      alert(error?.message || "Portrait upload failed.");
    } finally {
      if (byId("dmCardPortraitInput")) byId("dmCardPortraitInput").value = "";
    }
  }

  function removeCardPortrait() {
    const card = cardById(byId("dmCardDialog")?.dataset.cardId);
    if (!card?.portrait) return;
    ensureCardEditHistory();
    card.portrait = null;
    touchCard(card);
    updatePortraitPreview(card);
    renderBoard();
  }

  function openFocus(cardId) {
    const card = cardById(cardId);
    if (!card) return;
    const dialog = byId("dmCardFocusDialog");
    dialog.dataset.cardId = card.id;
    dialog.dataset.historyRecorded = "";
    byId("dmCardFocusTitle").textContent = card.title;
    const meta = [CARD_TYPES[card.type]?.label, card.status, card.tags.map((tag) => `#${tag}`).join(" ")].filter(Boolean).join(" · ");
    byId("dmCardFocusMeta").textContent = meta;
    byId("dmCardFocusBody").value = card.body;
    openDialog(dialog);
    setTimeout(() => byId("dmCardFocusBody")?.focus(), 0);
  }

  function syncFocusBody() {
    const dialog = byId("dmCardFocusDialog");
    const card = cardById(dialog?.dataset.cardId);
    if (!card) return;
    if (!dialog.dataset.historyRecorded) {
      recordHistory("edit card notes");
      dialog.dataset.historyRecorded = "1";
    }
    card.body = byId("dmCardFocusBody").value;
    touchCard(card);
    renderBoard();
  }

  function saveCardAsTemplate() {
    const card = cardById(byId("dmCardDialog")?.dataset.cardId);
    if (!card) return;
    const name = prompt("Template name", `${card.title} Template`);
    if (!name?.trim()) return;
    recordHistory("create template");
    state.templates.push({
      id: uid("tpl"),
      name: name.trim(),
      type: card.type,
      color: card.color,
      status: card.status,
      tags: [...card.tags],
      body: card.body
    });
    saveNow(true);
    alert(`Template “${name.trim()}” created.`);
  }

  function renderTemplatesEditor(selectedId = "") {
    const select = byId("dmTemplateSelect");
    fillTemplateSelect(select, selectedId || select?.value || state.templates[0]?.id);
    const id = select?.value || state.templates[0]?.id;
    const template = state.templates.find((item) => item.id === id);
    if (!template) return;
    byId("dmTemplateName").value = template.name;
    fillTypeSelect(byId("dmTemplateType"), template.type);
    byId("dmTemplateColor").value = template.color;
    byId("dmTemplateStatus").value = template.status;
    byId("dmTemplateTags").value = template.tags.join(", ");
    byId("dmTemplateBody").value = template.body;
    byId("dmTemplateDelete").disabled = state.templates.length <= 1;
  }

  function openTemplatesDialog() {
    renderTemplatesEditor(state.templates[0]?.id);
    openDialog(byId("dmTemplateDialog"));
  }

  function createTemplate() {
    recordHistory("create template");
    const template = {
      id: uid("tpl"),
      name: "New Template",
      type: "note",
      color: CARD_TYPES.note.color,
      status: "",
      tags: [],
      body: ""
    };
    state.templates.push(template);
    saveNow(true);
    renderTemplatesEditor(template.id);
  }

  function saveTemplate() {
    const template = state.templates.find((item) => item.id === byId("dmTemplateSelect")?.value);
    if (!template) return;
    recordHistory("edit template");
    template.name = byId("dmTemplateName").value.trim() || "Template";
    template.type = CARD_TYPES[byId("dmTemplateType").value] ? byId("dmTemplateType").value : "note";
    template.color = byId("dmTemplateColor").value;
    template.status = byId("dmTemplateStatus").value.trim();
    template.tags = byId("dmTemplateTags").value.split(",").map((tag) => tag.trim()).filter(Boolean);
    template.body = byId("dmTemplateBody").value;
    saveNow(true);
    renderTemplatesEditor(template.id);
  }

  function deleteTemplate() {
    if (state.templates.length <= 1) return;
    const id = byId("dmTemplateSelect")?.value;
    const template = state.templates.find((item) => item.id === id);
    if (!template || !confirm(`Delete template “${template.name}”? Existing cards will not be affected.`)) return;
    recordHistory("delete template");
    state.templates = state.templates.filter((item) => item.id !== id);
    saveNow(true);
    renderTemplatesEditor(state.templates[0]?.id);
  }

  function endpointRect(type, id) {
    if (type === "card") {
      const placement = placementFor(activeBoardId, id);
      if (!placement) return null;
      return { x: placement.x, y: placement.y, w: placement.w, h: placement.h };
    }
    const image = state.images.find((item) => item.id === id && item.boardId === activeBoardId);
    return image ? { x: image.x, y: image.y, w: image.w, h: image.h } : null;
  }

  function connectorGeometry(connection) {
    const a = endpointRect(connection.fromType, connection.fromId);
    const b = endpointRect(connection.toType, connection.toId);
    if (!a || !b) return null;
    const ac = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
    const bc = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
    const dx = bc.x - ac.x;
    const dy = bc.y - ac.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const ux = dx / distance;
    const uy = dy / distance;
    const start = { x: ac.x + ux * Math.min(a.w, a.h) * 0.42, y: ac.y + uy * Math.min(a.w, a.h) * 0.42 };
    const end = { x: bc.x - ux * Math.min(b.w, b.h) * 0.42, y: bc.y - uy * Math.min(b.w, b.h) * 0.42 };
    const normal = { x: -uy, y: ux };
    const sag = clamp(distance * 0.08, 22, 90);
    const mid = { x: (start.x + end.x) / 2 + normal.x * sag, y: (start.y + end.y) / 2 + normal.y * sag };
    return {
      start, mid, end,
      path: `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`,
      labelX: (start.x + 2 * mid.x + end.x) / 4,
      labelY: (start.y + 2 * mid.y + end.y) / 4
    };
  }

  function renderConnections() {
    const svg = byId("dmBoardConnections");
    if (!svg) return;
    svg.innerHTML = `
      <defs>
        <marker id="dmBoardArrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
          <path d="M 1 1 L 11 6 L 1 11 z" class="dm-board-arrow-head"></path>
        </marker>
      </defs>`;
    state.connections.filter((connection) => connection.boardId === activeBoardId).forEach((connection) => {
      const geometry = connectorGeometry(connection);
      if (!geometry) return;
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.classList.add("dm-board-connection", `is-${connection.style}`);
      if (connection.id === selectedConnectionId) group.classList.add("is-selected");

      const hit = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hit.setAttribute("d", geometry.path);
      hit.setAttribute("class", "dm-board-connection-hit");
      hit.addEventListener("click", (event) => {
        event.stopPropagation();
        openConnectionEditor(connection.id);
      });

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", geometry.path);
      path.setAttribute("class", "dm-board-connection-line");
      if (connection.style === "arrow") path.setAttribute("marker-end", "url(#dmBoardArrow)");
      group.append(hit, path);

      if (connection.label) {
        const label = document.createElementNS("http://www.w3.org/2000/svg", "g");
        label.setAttribute("class", "dm-board-connection-label");
        label.setAttribute("transform", `translate(${geometry.labelX} ${geometry.labelY})`);
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.textContent = connection.label;
        label.appendChild(text);
        group.appendChild(label);
      }
      svg.appendChild(group);
    });
  }

  function endpointLabel(type, id) {
    if (type === "card") return cardById(id)?.title || "Card";
    return imageById(id)?.caption || "Image";
  }

  function openConnectionEditor(connectionId = null, pending = null) {
    const dialog = byId("dmConnectionDialog");
    const connection = connectionId ? state.connections.find((item) => item.id === connectionId) : null;
    selectedConnectionId = connection?.id || null;
    dialog.dataset.connectionId = connection?.id || "";
    dialog.dataset.fromType = pending?.fromType || connection?.fromType || "";
    dialog.dataset.fromId = pending?.fromId || connection?.fromId || "";
    dialog.dataset.toType = pending?.toType || connection?.toType || "";
    dialog.dataset.toId = pending?.toId || connection?.toId || "";
    byId("dmConnectionLabel").value = connection?.label || "";
    byId("dmConnectionStyle").value = connection?.style || "solid";
    byId("dmConnectionDelete").hidden = !connection;
    const fromText = endpointLabel(dialog.dataset.fromType, dialog.dataset.fromId);
    const toText = endpointLabel(dialog.dataset.toType, dialog.dataset.toId);
    byId("dmConnectionEndpoints").textContent = `${fromText} ↔ ${toText}`;
    openDialog(dialog);
  }

  function saveConnectionDialog() {
    const dialog = byId("dmConnectionDialog");
    const existingId = dialog.dataset.connectionId;
    let connection = state.connections.find((item) => item.id === existingId);
    recordHistory(connection ? "edit connection" : "create connection");
    if (!connection) {
      connection = {
        id: uid("link"), boardId: activeBoardId,
        fromType: dialog.dataset.fromType, fromId: dialog.dataset.fromId,
        toType: dialog.dataset.toType, toId: dialog.dataset.toId,
        label: "", style: "solid"
      };
      state.connections.push(connection);
    }
    connection.label = byId("dmConnectionLabel").value.trim();
    connection.style = ["solid", "dashed", "conflict", "arrow"].includes(byId("dmConnectionStyle").value)
      ? byId("dmConnectionStyle").value : "solid";
    selectedConnectionId = null;
    connectSource = null;
    saveNow(true);
    closeDialog(dialog);
    renderAll();
  }

  function deleteSelectedConnection() {
    const dialog = byId("dmConnectionDialog");
    const id = dialog.dataset.connectionId;
    if (!id) return;
    recordHistory("delete connection");
    state.connections = state.connections.filter((connection) => connection.id !== id);
    selectedConnectionId = null;
    saveNow(true);
    closeDialog(dialog);
    renderAll();
  }

  function beginConnectionEndpoint(type, id) {
    if (!connectMode) return false;
    if (!connectSource) {
      connectSource = { type, id };
      renderBoard();
      updateConnectStatus();
      return true;
    }
    if (connectSource.type === type && connectSource.id === id) {
      connectSource = null;
      renderBoard();
      updateConnectStatus();
      return true;
    }
    const pending = { fromType: connectSource.type, fromId: connectSource.id, toType: type, toId: id };
    connectSource = null;
    renderBoard();
    updateConnectStatus();
    openConnectionEditor(null, pending);
    return true;
  }

  function updateConnectStatus() {
    const status = byId("dmBoardConnectStatus");
    const button = byId("dmBoardConnect");
    if (button) button.classList.toggle("is-active", connectMode);
    if (!status) return;
    if (!connectMode) status.textContent = "";
    else if (!connectSource) status.textContent = "Connect mode: click the first card or image.";
    else status.textContent = `Connect mode: ${endpointLabel(connectSource.type, connectSource.id)} selected — click the second item.`;
  }

  function toggleConnectMode() {
    connectMode = !connectMode;
    connectSource = null;
    renderBoard();
    updateConnectStatus();
  }

  function selectionKey(kind, id) {
    return `${kind}:${id}`;
  }

  function selectedInfo(key) {
    const [kind, ...rest] = key.split(":");
    const id = rest.join(":");
    if (kind === "card") return { kind, id, data: placementFor(activeBoardId, id) };
    if (kind === "image") return { kind, id, data: state.images.find((image) => image.boardId === activeBoardId && image.id === id) || null };
    if (kind === "frame") return { kind, id, data: state.frames.find((frame) => frame.boardId === activeBoardId && frame.id === id) || null };
    return { kind, id, data: null };
  }

  function visibleSelection() {
    return [...selection].map(selectedInfo).filter((item) => item.data);
  }

  function selectOnly(kind, id) {
    selection.clear();
    selection.add(selectionKey(kind, id));
    renderSelectionState();
  }

  function toggleSelection(kind, id) {
    const key = selectionKey(kind, id);
    if (selection.has(key)) selection.delete(key); else selection.add(key);
    renderSelectionState();
  }

  function renderSelectionState() {
    const elements = byId("dmBoardElements");
    const frames = byId("dmBoardFrames");
    [elements, frames].filter(Boolean).forEach((host) => {
      host.querySelectorAll("[data-card-id], [data-image-id], [data-frame-id]").forEach((element) => {
        let key = "";
        if (element.dataset.cardId) key = selectionKey("card", element.dataset.cardId);
        else if (element.dataset.imageId) key = selectionKey("image", element.dataset.imageId);
        else if (element.dataset.frameId) key = selectionKey("frame", element.dataset.frameId);
        element.classList.toggle("is-selected", selection.has(key));
      });
    });
    const toolbar = byId("dmBoardSelectionToolbar");
    const count = visibleSelection().length;
    if (toolbar) toolbar.hidden = count < 2;
    if (byId("dmBoardSelectionCount")) byId("dmBoardSelectionCount").textContent = `${count} selected`;
    const sessionButton = byId("dmBoardSelectionSession");
    if (sessionButton) sessionButton.disabled = !visibleSelection().some((item) => item.kind === "card");
  }

  function beginMove(event, target, kind, id) {
    if (connectMode || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const key = selectionKey(kind, id);
    if (event.shiftKey || event.ctrlKey || event.metaKey) toggleSelection(kind, id);
    else if (!selection.has(key)) selectOnly(kind, id);
    if (!selection.has(key)) return;

    const view = boardView();
    const items = visibleSelection().map((item) => ({ ...item, startX: item.data.x, startY: item.data.y }));
    recordHistory(items.length > 1 ? "move selection" : `move ${kind}`);
    items.forEach((item) => { item.data.z = nextZ(activeBoardId); });
    interaction = {
      type: "move",
      kind,
      id,
      items,
      startClientX: event.clientX,
      startClientY: event.clientY,
      scale: view.scale,
      pointerId: event.pointerId
    };
    target.setPointerCapture?.(event.pointerId);
  }

  function beginResize(event, target, kind, id) {
    if (connectMode || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    selectOnly(kind, id);
    const view = boardView();
    const data = selectedInfo(selectionKey(kind, id)).data;
    if (!data) return;
    recordHistory(`resize ${kind}`);
    data.z = nextZ(activeBoardId);
    interaction = {
      type: "resize", kind, id,
      startClientX: event.clientX, startClientY: event.clientY,
      startW: data.w, startH: data.h,
      aspect: kind === "image" ? data.aspect || (data.w / data.h) : null,
      scale: view.scale, pointerId: event.pointerId
    };
    target.setPointerCapture?.(event.pointerId);
  }

  function applySnap(value, board) {
    return board?.snap ? snapValue(value, board.gridSize || 20) : value;
  }

  function handleElementPointerMove(event) {
    if (!interaction || event.pointerId !== interaction.pointerId) return;
    const dx = (event.clientX - interaction.startClientX) / interaction.scale;
    const dy = (event.clientY - interaction.startClientY) / interaction.scale;
    const board = boardById(activeBoardId);
    if (interaction.type === "move") {
      interaction.items.forEach((item) => {
        const data = item.data;
        let x = clamp(item.startX + dx, -data.w + 80, WORLD_WIDTH - 80);
        let y = clamp(item.startY + dy, -data.h + 60, WORLD_HEIGHT - 60);
        x = applySnap(x, board);
        y = applySnap(y, board);
        data.x = x;
        data.y = y;
        const selector = item.kind === "card" ? `[data-card-id="${CSS.escape(item.id)}"]`
          : item.kind === "image" ? `[data-image-id="${CSS.escape(item.id)}"]`
          : `[data-frame-id="${CSS.escape(item.id)}"]`;
        const host = item.kind === "frame" ? byId("dmBoardFrames") : byId("dmBoardElements");
        const element = host?.querySelector(selector);
        if (element) { element.style.left = `${data.x}px`; element.style.top = `${data.y}px`; }
      });
      renderConnections();
    } else if (interaction.type === "resize") {
      const info = selectedInfo(selectionKey(interaction.kind, interaction.id));
      const data = info.data;
      if (!data) return;
      if (interaction.kind === "image") {
        const nextW = clamp(interaction.startW + dx, 120, 1200);
        data.w = applySnap(nextW, board);
        data.h = applySnap(clamp(interaction.startH + dy, 100, 1200), board);
      } else if (interaction.kind === "frame") {
        data.w = applySnap(clamp(interaction.startW + dx, 260, 1800), board);
        data.h = applySnap(clamp(interaction.startH + dy, 180, 1400), board);
      } else {
        data.w = applySnap(clamp(interaction.startW + dx, 190, 900), board);
        data.h = data.collapsed ? 58 : applySnap(clamp(interaction.startH + dy, 140, 900), board);
        if (!data.collapsed) data.expandedH = data.h;
      }
      const selector = interaction.kind === "card" ? `[data-card-id="${CSS.escape(interaction.id)}"]`
        : interaction.kind === "image" ? `[data-image-id="${CSS.escape(interaction.id)}"]`
        : `[data-frame-id="${CSS.escape(interaction.id)}"]`;
      const host = interaction.kind === "frame" ? byId("dmBoardFrames") : byId("dmBoardElements");
      const element = host?.querySelector(selector);
      if (element) { element.style.width = `${data.w}px`; element.style.height = `${data.h}px`; }
      renderConnections();
    }
  }

  function finishElementInteraction(event) {
    if (!interaction || event.pointerId !== interaction.pointerId || !["move", "resize"].includes(interaction.type)) return;
    interaction = null;
    scheduleSave();
    renderSelectionState();
  }

  function toggleCardCollapsed(cardId) {
    const placement = placementFor(activeBoardId, cardId);
    if (!placement) return;
    recordHistory(placement.collapsed ? "expand card" : "collapse card");
    if (!placement.collapsed) {
      placement.expandedH = Math.max(140, placement.h);
      placement.collapsed = true;
      placement.h = 58;
    } else {
      placement.collapsed = false;
      placement.h = clamp(placement.expandedH || 230, 140, 900);
    }
    saveNow(true);
    renderBoard();
  }

  function fitCardToContent(cardId) {
    const placement = placementFor(activeBoardId, cardId);
    const card = cardById(cardId);
    if (!placement || !card) return;
    if (placement.collapsed) toggleCardCollapsed(cardId);
    recordHistory("fit card to content");
    const element = byId("dmBoardElements")?.querySelector(`[data-card-id="${CSS.escape(cardId)}"]`);
    const body = element?.querySelector(".dm-board-card-body");
    const header = element?.querySelector(".dm-board-card-header");
    const footer = element?.querySelector(".dm-board-card-footer");
    const links = element?.querySelector(".dm-board-card-links");
    const desired = (header?.scrollHeight || 48) + (body?.scrollHeight || 80) + (footer?.scrollHeight || 30) + (links?.scrollHeight || 0) + 12;
    placement.h = clamp(desired, 140, 900);
    placement.expandedH = placement.h;
    saveNow(true);
    renderBoard();
  }

  function renderCardBodyContent(text, host) {
    const value = String(text || "");
    if (!value.trim()) {
      const placeholder = document.createElement("span");
      placeholder.className = "dm-board-card-placeholder";
      placeholder.textContent = "Double-click to add notes…";
      host.appendChild(placeholder);
      return;
    }
    value.split(/\r?\n/).forEach((line) => {
      const row = document.createElement("div");
      const trimmed = line.trim();
      if (!trimmed) {
        row.className = "dm-board-card-spacer";
        row.textContent = " ";
      } else if (/^[A-Z0-9 &/:'’().-]{3,60}$/.test(trimmed) && /[A-Z]/.test(trimmed)) {
        row.className = "dm-board-card-section-title";
        row.textContent = trimmed;
      } else if (/^[☐☑]\s/.test(trimmed)) {
        row.className = "dm-board-card-checkline";
        row.textContent = trimmed;
      } else row.textContent = line;
      host.appendChild(row);
    });
  }

  function openCardLink(card) {
    if (card.linkBoardId && boardById(card.linkBoardId)) {
      setActiveBoard(card.linkBoardId);
      return;
    }
    if (card.appLinks?.length) openAppLink(card.appLinks[0]);
  }

  function openAppLink(key) {
    const info = APP_LINKS[key];
    if (!info || !info.tab) return;
    if (info.target && typeof window.navigateToSection === "function") window.navigateToSection(info.tab, info.target);
    else if (typeof window.showTab === "function") window.showTab(info.tab);
  }

  function makeCardElement(placement) {
    const card = cardById(placement.cardId);
    if (!card) return null;
    const article = document.createElement("article");
    article.className = `dm-board-card type-${card.type}${placement.collapsed ? " is-collapsed" : ""}`;
    article.dataset.cardId = card.id;
    article.style.left = `${placement.x}px`;
    article.style.top = `${placement.y}px`;
    article.style.width = `${placement.w}px`;
    article.style.height = `${placement.h}px`;
    article.style.zIndex = String(placement.z || 1);
    article.style.setProperty("--card-bg", card.color);
    article.style.setProperty("--card-edge", card.color);
    if (connectSource?.type === "card" && connectSource.id === card.id) article.classList.add("is-connect-source");
    if (selection.has(selectionKey("card", card.id))) article.classList.add("is-selected");

    if (card.portrait?.show && card.portrait.dataUrl && !placement.collapsed) {
      const portrait = document.createElement("div");
      portrait.className = "dm-board-card-portrait";
      const img = document.createElement("img");
      img.src = card.portrait.dataUrl;
      img.alt = "";
      img.style.objectPosition = `${card.portrait.posX}% ${card.portrait.posY}%`;
      portrait.appendChild(img);
      article.appendChild(portrait);
    }

    const header = document.createElement("div");
    header.className = "dm-board-card-header";
    const typeBadge = document.createElement("span");
    typeBadge.className = "dm-board-card-type";
    typeBadge.textContent = CARD_TYPES[card.type]?.icon || "NOTE";
    typeBadge.title = CARD_TYPES[card.type]?.label || "Note";
    const title = document.createElement("strong");
    title.textContent = card.title;
    const badges = document.createElement("span");
    badges.className = "dm-board-card-badges";
    if (card.favorite) badges.textContent += "★";
    if (placementFor(SESSION_BOARD_ID, card.id)) badges.textContent += `${badges.textContent ? " " : ""}●`;
    const collapse = document.createElement("button");
    collapse.type = "button";
    collapse.className = "dm-card-collapse-button";
    collapse.textContent = placement.collapsed ? "+" : "−";
    collapse.title = placement.collapsed ? "Expand card" : "Collapse card";
    collapse.addEventListener("click", (event) => { event.stopPropagation(); toggleCardCollapsed(card.id); });
    header.append(typeBadge, title, badges, collapse);

    const body = document.createElement("div");
    body.className = "dm-board-card-body";
    renderCardBodyContent(card.body, body);

    const links = document.createElement("div");
    links.className = "dm-board-card-links";
    if (card.linkBoardId && boardById(card.linkBoardId)) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `Open ${boardById(card.linkBoardId).name} →`;
      button.addEventListener("click", (event) => { event.stopPropagation(); setActiveBoard(card.linkBoardId); });
      links.appendChild(button);
    }
    (card.appLinks || []).forEach((appLink) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `Open ${APP_LINKS[appLink]?.label || "Aldor"}`;
      button.addEventListener("click", (event) => { event.stopPropagation(); openAppLink(appLink); });
      links.appendChild(button);
    });

    const footer = document.createElement("div");
    footer.className = "dm-board-card-footer";
    const status = card.status ? `<span class="dm-card-status">${escapeText(card.status)}</span>` : "";
    const tags = card.tags.length ? card.tags.map((tag) => `#${escapeText(tag)}`).join("  ") : "";
    footer.innerHTML = `${status}${status && tags ? " <span class=\"dm-card-footer-divider\">·</span> " : ""}${tags || escapeText(CARD_TYPES[card.type]?.label || "Note")}`;

    const resize = document.createElement("span");
    resize.className = "dm-board-resize-handle";
    resize.title = "Resize card";
    resize.setAttribute("aria-hidden", "true");

    article.append(header);
    if (!placement.collapsed) article.append(body, links, footer, resize);

    header.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;
      beginMove(event, article, "card", card.id);
    });
    article.addEventListener("pointermove", handleElementPointerMove);
    article.addEventListener("pointerup", finishElementInteraction);
    article.addEventListener("pointercancel", finishElementInteraction);
    resize.addEventListener("pointerdown", (event) => beginResize(event, article, "card", card.id));
    article.addEventListener("dblclick", (event) => {
      if (event.target.closest("button")) return;
      event.stopPropagation();
      if (!connectMode) openFocus(card.id);
    });
    article.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      event.stopPropagation();
      if (beginConnectionEndpoint("card", card.id)) return;
      if (!event.target.closest(".dm-board-card-header")) {
        if (event.shiftKey || event.ctrlKey || event.metaKey) toggleSelection("card", card.id);
        else selectOnly("card", card.id);
      }
      placement.z = nextZ(activeBoardId);
      article.style.zIndex = String(placement.z);
      scheduleSave();
    });
    article.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!selection.has(selectionKey("card", card.id))) selectOnly("card", card.id);
      showContextMenu(event.clientX, event.clientY, { kind: "card", id: card.id });
    });
    return article;
  }

  function makeImageElement(image) {
    const figure = document.createElement("figure");
    figure.className = "dm-board-image";
    figure.dataset.imageId = image.id;
    figure.style.left = `${image.x}px`;
    figure.style.top = `${image.y}px`;
    figure.style.width = `${image.w}px`;
    figure.style.height = `${image.h}px`;
    figure.style.zIndex = String(image.z || 1);
    if (connectSource?.type === "image" && connectSource.id === image.id) figure.classList.add("is-connect-source");
    if (selection.has(selectionKey("image", image.id))) figure.classList.add("is-selected");

    const img = document.createElement("img");
    img.src = image.dataUrl;
    img.alt = image.caption || "DM board image";
    img.draggable = false;
    img.style.objectFit = image.fit;
    img.style.objectPosition = `${image.posX}% ${image.posY}%`;
    const caption = document.createElement("figcaption");
    caption.textContent = image.caption;
    caption.hidden = !image.caption || !image.captionVisible;
    const handle = document.createElement("div");
    handle.className = "dm-board-image-drag-handle";
    handle.textContent = image.caption || "Image";
    const resize = document.createElement("span");
    resize.className = "dm-board-resize-handle";
    resize.title = "Resize image";
    figure.append(img, caption, handle, resize);

    handle.addEventListener("pointerdown", (event) => beginMove(event, figure, "image", image.id));
    figure.addEventListener("pointermove", handleElementPointerMove);
    figure.addEventListener("pointerup", finishElementInteraction);
    figure.addEventListener("pointercancel", finishElementInteraction);
    resize.addEventListener("pointerdown", (event) => beginResize(event, figure, "image", image.id));
    figure.addEventListener("dblclick", (event) => { event.stopPropagation(); if (!connectMode) openImageEditor(image.id); });
    figure.addEventListener("click", (event) => {
      event.stopPropagation();
      if (beginConnectionEndpoint("image", image.id)) return;
      if (!event.target.closest(".dm-board-image-drag-handle")) {
        if (event.shiftKey || event.ctrlKey || event.metaKey) toggleSelection("image", image.id); else selectOnly("image", image.id);
      }
      image.z = nextZ(activeBoardId);
      figure.style.zIndex = String(image.z);
      scheduleSave();
    });
    figure.addEventListener("contextmenu", (event) => {
      event.preventDefault(); event.stopPropagation();
      if (!selection.has(selectionKey("image", image.id))) selectOnly("image", image.id);
      showContextMenu(event.clientX, event.clientY, { kind: "image", id: image.id });
    });
    return figure;
  }

  function makeFrameElement(frame) {
    const element = document.createElement("section");
    element.className = "dm-board-frame";
    element.dataset.frameId = frame.id;
    element.style.left = `${frame.x}px`;
    element.style.top = `${frame.y}px`;
    element.style.width = `${frame.w}px`;
    element.style.height = `${frame.h}px`;
    element.style.zIndex = String(frame.z || 1);
    element.style.setProperty("--frame-color", frame.color);
    if (selection.has(selectionKey("frame", frame.id))) element.classList.add("is-selected");
    const header = document.createElement("div");
    header.className = "dm-board-frame-header";
    header.textContent = frame.label || "Group";
    const resize = document.createElement("span");
    resize.className = "dm-board-resize-handle";
    element.append(header, resize);
    header.addEventListener("pointerdown", (event) => beginMove(event, element, "frame", frame.id));
    element.addEventListener("pointermove", handleElementPointerMove);
    element.addEventListener("pointerup", finishElementInteraction);
    element.addEventListener("pointercancel", finishElementInteraction);
    resize.addEventListener("pointerdown", (event) => beginResize(event, element, "frame", frame.id));
    element.addEventListener("dblclick", (event) => { event.stopPropagation(); openFrameEditor(frame.id); });
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!event.target.closest(".dm-board-frame-header")) {
        if (event.shiftKey || event.ctrlKey || event.metaKey) toggleSelection("frame", frame.id); else selectOnly("frame", frame.id);
      }
    });
    element.addEventListener("contextmenu", (event) => {
      event.preventDefault(); event.stopPropagation();
      if (!selection.has(selectionKey("frame", frame.id))) selectOnly("frame", frame.id);
      showContextMenu(event.clientX, event.clientY, { kind: "frame", id: frame.id });
    });
    return element;
  }

  function renderBoard() {
    const world = byId("dmBoardWorld");
    if (!world || !state) return;
    const elements = byId("dmBoardElements");
    const frames = byId("dmBoardFrames");
    elements.innerHTML = "";
    frames.innerHTML = "";
    state.frames.filter((frame) => frame.boardId === activeBoardId).forEach((frame) => frames.appendChild(makeFrameElement(frame)));
    state.placements.filter((placement) => placement.boardId === activeBoardId).forEach((placement) => {
      const element = makeCardElement(placement);
      if (element) elements.appendChild(element);
    });
    state.images.filter((image) => image.boardId === activeBoardId).forEach((image) => elements.appendChild(makeImageElement(image)));
    renderConnections();
    applyBoardTransform();
    applyBoardBackground();
    renderSelectionState();
    const empty = byId("dmBoardEmpty");
    if (empty) empty.hidden = boardElementsCount(activeBoardId) > 0;
  }

  function applyBoardBackground() {
    const viewport = byId("dmBoardViewport");
    const board = boardById(activeBoardId);
    if (!viewport || !board) return;
    [...BOARD_BACKGROUNDS].forEach((name) => viewport.classList.remove(`bg-${name}`));
    viewport.classList.add(`bg-${board.background}`);
    const snapButton = byId("dmBoardSnapToggle");
    if (snapButton) snapButton.textContent = `Snap to Grid: ${board.snap ? "On" : "Off"}`;
  }

  function renderBoardSidebar() {
    const host = byId("dmBoardList");
    if (!host) return;
    host.innerHTML = "";
    state.boards.forEach((board) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dm-board-list-item";
      button.classList.toggle("is-active", board.id === activeBoardId);
      button.dataset.boardId = board.id;
      const count = state.placements.filter((placement) => placement.boardId === board.id).length;
      button.innerHTML = `<span>${board.session ? "● " : ""}${escapeText(board.name)}</span><small>${count}</small>`;
      button.addEventListener("click", () => setActiveBoard(board.id));
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        showContextMenu(event.clientX, event.clientY, { kind: "board", id: board.id });
      });
      host.appendChild(button);
    });
    const board = boardById(activeBoardId);
    byId("dmBoardRename").disabled = !board || board.session;
    byId("dmBoardDelete").disabled = !board || board.session;
    applySidebarVisibility();
  }

  function applySidebarVisibility() {
    const open = state?.ui?.sidebarOpen !== false;
    byId("dmBoardSidebar")?.classList.toggle("is-collapsed", !open);
    if (byId("dmBoardSidebarRail")) byId("dmBoardSidebarRail").hidden = open;
    if (byId("dmBoardSidebarToggle")) byId("dmBoardSidebarToggle").classList.toggle("is-active", open);
  }

  function toggleSidebar(force) {
    state.ui.sidebarOpen = typeof force === "boolean" ? force : !state.ui.sidebarOpen;
    applySidebarVisibility();
    scheduleSave();
  }

  function renderSessionBar() {
    const bar = byId("dmBoardSessionBar");
    if (bar) bar.hidden = !runMode;
  }

  function renderAll() {
    const page = byId("notes");
    page?.classList.toggle("dm-board-session-mode", runMode);
    const runButton = byId("dmBoardRunSession");
    if (runButton) runButton.textContent = runMode ? "Exit Session Mode" : "Run Session";
    renderBoardSidebar();
    renderSessionBar();
    renderBoard();
    updateConnectStatus();
    updateUndoButtons();
    updateNavButtons();
    const status = byId("dmBoardSaveStatus");
    if (status && !status.textContent) status.textContent = `Saved locally · ${storageLabel()}`;
  }

  function cardSearchText(card) {
    const boardNames = placementsForCard(card.id).map((placement) => boardById(placement.boardId)?.name || "").join(" ");
    return `${card.title} ${card.body} ${card.tags.join(" ")} ${card.status} ${CARD_TYPES[card.type]?.label || ""} ${boardNames}`.toLowerCase();
  }

  function centerCard(cardId, animateHighlight = true) {
    const placement = placementFor(activeBoardId, cardId);
    const viewport = byId("dmBoardViewport");
    if (!placement || !viewport) return;
    const view = boardView();
    const scale = Math.max(view.scale, 0.8);
    view.scale = scale;
    view.x = viewport.clientWidth / 2 - (placement.x + placement.w / 2) * scale;
    view.y = viewport.clientHeight / 2 - (placement.y + placement.h / 2) * scale;
    applyBoardTransform();
    scheduleSave();
    if (animateHighlight) requestAnimationFrame(() => {
      const element = byId("dmBoardElements")?.querySelector(`[data-card-id="${CSS.escape(cardId)}"]`);
      element?.classList.add("is-search-hit");
      setTimeout(() => element?.classList.remove("is-search-hit"), 1500);
    });
  }

  function locateCard(cardId) {
    const placements = placementsForCard(cardId);
    if (!placements.length) return;
    const preferred = placements.find((placement) => placement.boardId === activeBoardId)
      || placements.find((placement) => placement.boardId !== SESSION_BOARD_ID) || placements[0];
    if (preferred.boardId !== activeBoardId) {
      activeBoardId = preferred.boardId;
      state.activeBoardId = activeBoardId;
      selection.clear();
      renderAll();
    }
    pushNav({ boardId: activeBoardId, cardId });
    centerCard(cardId);
  }

  function renderSearchResults(mode = "query") {
    const popover = byId("dmBoardSearchResults");
    if (!popover || !state) return;
    const query = String(byId("dmBoardSearch")?.value || "").trim().toLowerCase();
    const cards = state.cards.filter((card) => mode === "favorites" ? card.favorite : query && cardSearchText(card).includes(query));
    if ((mode === "query" && !query) || !cards.length) {
      popover.hidden = true;
      popover.innerHTML = "";
      return;
    }
    popover.innerHTML = "";
    const heading = document.createElement("div");
    heading.className = "dm-board-search-heading";
    heading.textContent = mode === "favorites" ? "Favourite Cards" : `${cards.length} result${cards.length === 1 ? "" : "s"}`;
    popover.appendChild(heading);
    cards.slice(0, 40).forEach((card) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dm-board-search-result";
      const boardNames = [...new Set(placementsForCard(card.id).map((placement) => boardById(placement.boardId)?.name).filter(Boolean))];
      button.innerHTML = `<strong>${escapeText(card.title)}</strong><span>${escapeText([CARD_TYPES[card.type]?.label, card.status, boardNames.join(" · ")].filter(Boolean).join(" · "))}</span>`;
      button.addEventListener("click", () => { popover.hidden = true; locateCard(card.id); });
      popover.appendChild(button);
    });
    popover.hidden = false;
  }

  function boardPointFromClient(clientX, clientY) {
    const viewport = byId("dmBoardViewport");
    const rect = viewport.getBoundingClientRect();
    const view = boardView();
    return { x: (clientX - rect.left - view.x) / view.scale, y: (clientY - rect.top - view.y) / view.scale };
  }

  function viewportCenterPoint() {
    const viewport = byId("dmBoardViewport");
    if (!viewport) return { x: 600, y: 400 };
    const rect = viewport.getBoundingClientRect();
    return boardPointFromClient(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function applyBoardTransform() {
    const world = byId("dmBoardWorld");
    if (!world) return;
    const view = boardView();
    world.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.scale})`;
    const zoom = byId("dmBoardZoomLabel");
    if (zoom) zoom.textContent = `${Math.round(view.scale * 100)}%`;
  }

  function zoomAt(clientX, clientY, nextScale) {
    const viewport = byId("dmBoardViewport");
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const view = boardView();
    const oldScale = view.scale;
    const scale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    const worldX = (localX - view.x) / oldScale;
    const worldY = (localY - view.y) / oldScale;
    view.scale = scale;
    view.x = localX - worldX * scale;
    view.y = localY - worldY * scale;
    applyBoardTransform();
    scheduleSave();
  }

  function zoomBy(factor) {
    const viewport = byId("dmBoardViewport");
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, boardView().scale * factor);
  }

  function boardRects(boardId = activeBoardId) {
    return [
      ...state.placements.filter((placement) => placement.boardId === boardId).map((placement) => ({ x: placement.x, y: placement.y, w: placement.w, h: placement.h })),
      ...state.images.filter((image) => image.boardId === boardId).map((image) => ({ x: image.x, y: image.y, w: image.w, h: image.h })),
      ...state.frames.filter((frame) => frame.boardId === boardId).map((frame) => ({ x: frame.x, y: frame.y, w: frame.w, h: frame.h }))
    ];
  }

  function fitBoard() {
    const viewport = byId("dmBoardViewport");
    if (!viewport) return;
    const rects = boardRects();
    const view = boardView();
    if (!rects.length) {
      view.scale = 1; view.x = 20; view.y = 20;
      applyBoardTransform(); scheduleSave(); return;
    }
    const minX = Math.min(...rects.map((item) => item.x));
    const minY = Math.min(...rects.map((item) => item.y));
    const maxX = Math.max(...rects.map((item) => item.x + item.w));
    const maxY = Math.max(...rects.map((item) => item.y + item.h));
    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);
    const pad = 90;
    view.scale = clamp(Math.min((viewport.clientWidth - pad * 2) / width, (viewport.clientHeight - pad * 2) / height, 1.25), MIN_SCALE, MAX_SCALE);
    view.x = viewport.clientWidth / 2 - (minX + width / 2) * view.scale;
    view.y = viewport.clientHeight / 2 - (minY + height / 2) * view.scale;
    applyBoardTransform();
    scheduleSave();
  }

  function resetView() {
    const view = boardView();
    view.scale = 1; view.x = 20; view.y = 20;
    applyBoardTransform(); scheduleSave();
  }

  function startViewportInteraction(event) {
    if (event.button !== 0 || event.target.closest(".dm-board-card, .dm-board-image, .dm-board-frame, .dm-board-sidebar, .dm-board-sidebar-rail, .dm-board-selection-toolbar, .dm-board-context-menu, button, input, select")) return;
    event.preventDefault();
    hideContextMenu();
    const viewport = byId("dmBoardViewport");
    if (event.shiftKey) {
      const rect = viewport.getBoundingClientRect();
      interaction = { type: "marquee", pointerId: event.pointerId, startClientX: event.clientX, startClientY: event.clientY, rect };
      const marquee = byId("dmBoardMarquee");
      marquee.hidden = false;
      marquee.style.left = `${event.clientX - rect.left}px`;
      marquee.style.top = `${event.clientY - rect.top}px`;
      marquee.style.width = "0px";
      marquee.style.height = "0px";
    } else {
      if (!(event.ctrlKey || event.metaKey)) { selection.clear(); renderSelectionState(); }
      const view = boardView();
      interaction = { type: "pan", pointerId: event.pointerId, startClientX: event.clientX, startClientY: event.clientY, startX: view.x, startY: view.y };
      viewport.classList.add("is-panning");
    }
    viewport.setPointerCapture?.(event.pointerId);
  }

  function handleViewportMove(event) {
    lastBoardPointer = { clientX: event.clientX, clientY: event.clientY };
    if (!interaction || event.pointerId !== interaction.pointerId) return;
    if (interaction.type === "pan") {
      const view = boardView();
      view.x = interaction.startX + event.clientX - interaction.startClientX;
      view.y = interaction.startY + event.clientY - interaction.startClientY;
      applyBoardTransform();
    } else if (interaction.type === "marquee") {
      const marquee = byId("dmBoardMarquee");
      const rect = interaction.rect;
      const x1 = interaction.startClientX - rect.left;
      const y1 = interaction.startClientY - rect.top;
      const x2 = event.clientX - rect.left;
      const y2 = event.clientY - rect.top;
      marquee.style.left = `${Math.min(x1, x2)}px`;
      marquee.style.top = `${Math.min(y1, y2)}px`;
      marquee.style.width = `${Math.abs(x2 - x1)}px`;
      marquee.style.height = `${Math.abs(y2 - y1)}px`;
    }
  }

  function finishViewportInteraction(event) {
    if (!interaction || event.pointerId !== interaction.pointerId || !["pan", "marquee"].includes(interaction.type)) return;
    if (interaction.type === "pan") {
      byId("dmBoardViewport")?.classList.remove("is-panning");
      scheduleSave();
    } else {
      const viewportRect = interaction.rect;
      const x1 = Math.min(interaction.startClientX, event.clientX);
      const y1 = Math.min(interaction.startClientY, event.clientY);
      const x2 = Math.max(interaction.startClientX, event.clientX);
      const y2 = Math.max(interaction.startClientY, event.clientY);
      selection.clear();
      const candidates = [
        ...byId("dmBoardElements").querySelectorAll("[data-card-id], [data-image-id]"),
        ...byId("dmBoardFrames").querySelectorAll("[data-frame-id]")
      ];
      candidates.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const intersects = rect.right >= x1 && rect.left <= x2 && rect.bottom >= y1 && rect.top <= y2;
        if (!intersects) return;
        if (element.dataset.cardId) selection.add(selectionKey("card", element.dataset.cardId));
        else if (element.dataset.imageId) selection.add(selectionKey("image", element.dataset.imageId));
        else if (element.dataset.frameId) selection.add(selectionKey("frame", element.dataset.frameId));
      });
      byId("dmBoardMarquee").hidden = true;
      renderSelectionState();
      void viewportRect;
    }
    interaction = null;
  }

  function alignSelection(mode) {
    const items = visibleSelection();
    if (items.length < 2) return;
    recordHistory("align selection");
    const left = Math.min(...items.map((item) => item.data.x));
    const top = Math.min(...items.map((item) => item.data.y));
    const right = Math.max(...items.map((item) => item.data.x + item.data.w));
    const bottom = Math.max(...items.map((item) => item.data.y + item.data.h));
    if (mode === "left") items.forEach((item) => { item.data.x = left; });
    else if (mode === "top") items.forEach((item) => { item.data.y = top; });
    else if (mode === "hcenter") {
      const cx = (left + right) / 2;
      items.forEach((item) => { item.data.x = cx - item.data.w / 2; });
    } else if (mode === "vcenter") {
      const cy = (top + bottom) / 2;
      items.forEach((item) => { item.data.y = cy - item.data.h / 2; });
    } else if (mode === "distributeH") {
      const sorted = [...items].sort((a, b) => a.data.x - b.data.x);
      const totalWidth = sorted.reduce((sum, item) => sum + item.data.w, 0);
      const gap = (right - left - totalWidth) / Math.max(1, sorted.length - 1);
      let x = left;
      sorted.forEach((item) => { item.data.x = x; x += item.data.w + gap; });
    } else if (mode === "distributeV") {
      const sorted = [...items].sort((a, b) => a.data.y - b.data.y);
      const totalHeight = sorted.reduce((sum, item) => sum + item.data.h, 0);
      const gap = (bottom - top - totalHeight) / Math.max(1, sorted.length - 1);
      let y = top;
      sorted.forEach((item) => { item.data.y = y; y += item.data.h + gap; });
    }
    const board = boardById(activeBoardId);
    if (board?.snap) items.forEach((item) => { item.data.x = snapValue(item.data.x, board.gridSize); item.data.y = snapValue(item.data.y, board.gridSize); });
    saveNow(true);
    renderBoard();
  }

  function deleteSelection() {
    const items = visibleSelection();
    if (!items.length || !confirm(`Delete ${items.length} selected board item${items.length === 1 ? "" : "s"}? Shared cards will only be removed from this board unless this is their only placement.`)) return;
    recordHistory("delete selection");
    const keys = [...selection];
    keys.forEach((key) => {
      const item = selectedInfo(key);
      if (item.kind === "card") {
        const placements = placementsForCard(item.id);
        if (placements.length <= 1) {
          state.cards = state.cards.filter((card) => card.id !== item.id);
          state.placements = state.placements.filter((placement) => placement.cardId !== item.id);
          state.connections = state.connections.filter((connection) => !((connection.fromType === "card" && connection.fromId === item.id) || (connection.toType === "card" && connection.toId === item.id)));
        } else removeCardFromBoard(item.id, activeBoardId);
      } else if (item.kind === "image") {
        state.images = state.images.filter((image) => image.id !== item.id);
        state.connections = state.connections.filter((connection) => !((connection.fromType === "image" && connection.fromId === item.id) || (connection.toType === "image" && connection.toId === item.id)));
      } else if (item.kind === "frame") state.frames = state.frames.filter((frame) => frame.id !== item.id);
    });
    selection.clear();
    saveNow(true);
    renderAll();
  }

  function addSelectionToSession() {
    const cards = visibleSelection().filter((item) => item.kind === "card");
    if (!cards.length) return;
    recordHistory("add cards to current session");
    cards.forEach((item) => addCardToBoard(item.id, SESSION_BOARD_ID));
    saveNow(true);
    renderAll();
  }

  function addCardToSession(cardId) {
    if (placementFor(SESSION_BOARD_ID, cardId)) return;
    recordHistory("add card to current session");
    addCardToBoard(cardId, SESSION_BOARD_ID);
    saveNow(true);
    renderAll();
  }

  function removeCardFromSession(cardId) {
    if (!placementFor(SESSION_BOARD_ID, cardId)) return;
    if (placementsForCard(cardId).length <= 1) return;
    recordHistory("remove card from current session");
    removeCardFromBoard(cardId, SESSION_BOARD_ID);
    saveNow(true);
    renderAll();
  }

  function enterRunMode() {
    if (!runMode) {
      previousBoardId = activeBoardId;
      runMode = true;
      activeBoardId = SESSION_BOARD_ID;
      state.activeBoardId = activeBoardId;
      pushNav({ boardId: activeBoardId });
      saveNow(true);
      renderAll();
      requestAnimationFrame(fitBoard);
    } else {
      runMode = false;
      activeBoardId = boardById(previousBoardId) ? previousBoardId : state.boards.find((board) => !board.session)?.id || SESSION_BOARD_ID;
      previousBoardId = null;
      state.activeBoardId = activeBoardId;
      pushNav({ boardId: activeBoardId });
      saveNow(true);
      renderAll();
    }
  }

  function openBoardSettings() {
    const board = boardById(activeBoardId);
    if (!board) return;
    byId("dmBoardSettingsName").textContent = board.name;
    byId("dmBoardBackground").value = board.background;
    byId("dmBoardSnap").checked = board.snap;
    byId("dmBoardGridSize").value = String(board.gridSize);
    openDialog(byId("dmBoardSettingsDialog"));
  }

  function saveBoardSettings() {
    const board = boardById(activeBoardId);
    if (!board) return;
    recordHistory("change board appearance");
    board.background = BOARD_BACKGROUNDS.has(byId("dmBoardBackground").value) ? byId("dmBoardBackground").value : "cork";
    board.snap = Boolean(byId("dmBoardSnap").checked);
    board.gridSize = clamp(Number(byId("dmBoardGridSize").value) || 20, 10, 100);
    saveNow(true);
    closeDialog(byId("dmBoardSettingsDialog"));
    renderAll();
  }

  function toggleSnap() {
    const board = boardById(activeBoardId);
    if (!board) return;
    recordHistory("toggle grid snap");
    board.snap = !board.snap;
    saveNow(true);
    applyBoardBackground();
  }

  function createFrame(point = null) {
    const center = point || viewportCenterPoint();
    recordHistory("create frame");
    const frame = {
      id: uid("frame"), boardId: activeBoardId, label: "New Group", color: "#b08b48",
      x: clamp(center.x - 380, 0, WORLD_WIDTH - 760), y: clamp(center.y - 250, 0, WORLD_HEIGHT - 500),
      w: 760, h: 500, z: nextZ(activeBoardId)
    };
    state.frames.push(frame);
    saveNow(true);
    renderAll();
    openFrameEditor(frame.id);
  }

  function openFrameEditor(frameId) {
    const frame = frameById(frameId);
    if (!frame) return;
    const dialog = byId("dmFrameDialog");
    dialog.dataset.frameId = frame.id;
    byId("dmFrameLabel").value = frame.label;
    byId("dmFrameColor").value = frame.color;
    openDialog(dialog);
  }

  function saveFrame() {
    const frame = frameById(byId("dmFrameDialog")?.dataset.frameId);
    if (!frame) return;
    recordHistory("edit frame");
    frame.label = byId("dmFrameLabel").value.trim() || "Group";
    frame.color = byId("dmFrameColor").value;
    saveNow(true);
    closeDialog(byId("dmFrameDialog"));
    renderBoard();
  }

  function deleteFrame(frameId = byId("dmFrameDialog")?.dataset.frameId) {
    const frame = frameById(frameId);
    if (!frame || !confirm(`Delete group “${frame.label}”? Cards inside it are not deleted.`)) return;
    recordHistory("delete frame");
    state.frames = state.frames.filter((item) => item.id !== frame.id);
    selection.delete(selectionKey("frame", frame.id));
    saveNow(true);
    closeDialog(byId("dmFrameDialog"));
    renderAll();
  }

  function openShareCardDialog(cardId) {
    const card = cardById(cardId);
    if (!card) return;
    const dialog = byId("dmShareCardDialog");
    dialog.dataset.cardId = card.id;
    const membership = cardBoardMembership(card.id);
    const select = byId("dmShareCardBoard");
    select.innerHTML = "";
    state.boards.filter((board) => !membership.has(board.id)).forEach((board) => {
      const option = document.createElement("option"); option.value = board.id; option.textContent = board.name; select.appendChild(option);
    });
    if (!select.options.length) {
      const option = document.createElement("option"); option.value = ""; option.textContent = "Card is already on every board"; select.appendChild(option);
    }
    openDialog(dialog);
  }

  function saveShareCard() {
    const cardId = byId("dmShareCardDialog")?.dataset.cardId;
    const boardId = byId("dmShareCardBoard")?.value;
    if (!cardById(cardId) || !boardById(boardId) || placementFor(boardId, cardId)) return;
    recordHistory("share card to board");
    addCardToBoard(cardId, boardId);
    saveNow(true);
    closeDialog(byId("dmShareCardDialog"));
    renderAll();
  }

  function openBoardLinkDialog(targetId = "") {
    const target = boardById(targetId) && targetId !== activeBoardId ? targetId : state.boards.find((board) => board.id !== activeBoardId)?.id || "";
    fillBoardSelect(byId("dmBoardLinkTarget"), target, true, activeBoardId);
    byId("dmBoardLinkTitle").value = target ? `Open ${boardById(target)?.name || "Board"}` : "";
    openDialog(byId("dmBoardLinkDialog"));
  }

  function createBoardLink() {
    const targetId = byId("dmBoardLinkTarget")?.value;
    if (!boardById(targetId)) return;
    const title = byId("dmBoardLinkTitle")?.value.trim() || `Open ${boardById(targetId).name}`;
    recordHistory("create board link");
    createCard({ title, templateId: state.templates[0]?.id, boardId: activeBoardId, point: viewportCenterPoint(), quick: false, linkBoardId: targetId });
    saveNow(true);
    closeDialog(byId("dmBoardLinkDialog"));
    renderAll();
  }

  async function compressImageFile(file, options = {}) {
    if (!file || !file.type.startsWith("image/")) throw new Error("Choose an image file.");
    const bitmapUrl = URL.createObjectURL(file);
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("The image could not be read."));
        img.src = bitmapUrl;
      });
      let maxDim = Number(options.maxDim) || 1200;
      let quality = Number(options.quality) || 0.82;
      const targetBytes = Number(options.targetBytes) || IMAGE_TARGET_BYTES;
      let dataUrl = "";
      let width = image.naturalWidth;
      let height = image.naturalHeight;
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const scale = Math.min(1, maxDim / Math.max(image.naturalWidth, image.naturalHeight));
        width = Math.max(1, Math.round(image.naturalWidth * scale));
        height = Math.max(1, Math.round(image.naturalHeight * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        const context = canvas.getContext("2d", { alpha: true });
        context.drawImage(image, 0, 0, width, height);
        dataUrl = canvas.toDataURL("image/webp", quality);
        const bytes = Math.ceil((dataUrl.length - dataUrl.indexOf(",") - 1) * 0.75);
        if (bytes <= targetBytes) break;
        if (quality > 0.52) quality -= 0.08; else maxDim = Math.round(maxDim * 0.82);
      }
      return { dataUrl, width, height, aspect: width / height };
    } finally {
      URL.revokeObjectURL(bitmapUrl);
    }
  }

  async function addImageFromFile(file, point = null) {
    if (imageUploadBusy) return;
    imageUploadBusy = true;
    const status = byId("dmBoardConnectStatus");
    if (status) status.textContent = "Compressing image…";
    try {
      const compressed = await compressImageFile(file);
      const center = point || viewportCenterPoint();
      const width = Math.min(460, Math.max(240, compressed.width * 0.45));
      const height = width / compressed.aspect;
      const image = {
        id: uid("image"), boardId: activeBoardId, dataUrl: compressed.dataUrl,
        caption: file.name.replace(/\.[^.]+$/, ""), captionVisible: true,
        x: clamp(center.x - width / 2, 0, WORLD_WIDTH - width), y: clamp(center.y - height / 2, 0, WORLD_HEIGHT - height),
        w: width, h: height, aspect: compressed.aspect, fit: "contain", posX: 50, posY: 50,
        z: nextZ(activeBoardId), createdAt: nowIso()
      };
      const candidate = deepClone(state); candidate.images.push(image);
      const bytes = stateBytes(candidate);
      if (bytes > MAX_STATE_BYTES) throw new Error(`That image would make DM Notes about ${(bytes / 1024 / 1024).toFixed(1)} MB. Remove an image or use a smaller file first.`);
      recordHistory("add image");
      state.images.push(image);
      saveNow(true);
      renderAll();
    } catch (error) {
      alert(error?.message || "Image upload failed.");
    } finally {
      imageUploadBusy = false;
      updateConnectStatus();
      const input = byId("dmBoardImageInput");
      if (input) input.value = "";
    }
  }

  function updateImageCropPreview(image) {
    const preview = byId("dmImageCropPreview");
    if (!preview || !image) return;
    preview.innerHTML = "";
    const img = document.createElement("img");
    img.src = image.dataUrl;
    img.alt = image.caption || "Image preview";
    img.style.objectFit = byId("dmImageFit")?.value || image.fit;
    img.style.objectPosition = `${byId("dmImagePosX")?.value ?? image.posX}% ${byId("dmImagePosY")?.value ?? image.posY}%`;
    preview.appendChild(img);
  }

  function openImageEditor(imageId) {
    const image = imageById(imageId);
    if (!image) return;
    const dialog = byId("dmImageDialog");
    dialog.dataset.imageId = image.id;
    dialog.dataset.portraitPreset = "";
    byId("dmImageCaption").value = image.caption;
    byId("dmImageCaptionVisible").checked = image.captionVisible;
    byId("dmImageFit").value = image.fit;
    byId("dmImagePosX").value = String(image.posX);
    byId("dmImagePosY").value = String(image.posY);
    updateImageCropPreview(image);
    openDialog(dialog);
  }

  function saveImageDialog() {
    const dialog = byId("dmImageDialog");
    const image = imageById(dialog.dataset.imageId);
    if (!image) return;
    recordHistory("edit image");
    image.caption = byId("dmImageCaption").value.trim();
    image.captionVisible = Boolean(byId("dmImageCaptionVisible").checked);
    image.fit = byId("dmImageFit").value === "cover" ? "cover" : "contain";
    image.posX = Number(byId("dmImagePosX").value) || 50;
    image.posY = Number(byId("dmImagePosY").value) || 50;
    if (dialog.dataset.portraitPreset === "1") {
      const width = Math.min(image.w, 480);
      image.w = width;
      image.h = width * 4 / 3;
    }
    dialog.dataset.portraitPreset = "";
    saveNow(true);
    closeDialog(dialog);
    renderBoard();
  }

  function portraitCropImage() {
    const dialog = byId("dmImageDialog");
    const image = imageById(dialog?.dataset.imageId);
    if (!image) return;
    byId("dmImageFit").value = "cover";
    dialog.dataset.portraitPreset = "1";
    updateImageCropPreview(image);
  }

  function deleteImageDialog(imageId = byId("dmImageDialog")?.dataset.imageId) {
    const image = imageById(imageId);
    if (!image || !confirm("Remove this image from the board?")) return;
    recordHistory("delete image");
    state.images = state.images.filter((item) => item.id !== image.id);
    state.connections = state.connections.filter((connection) => !((connection.fromType === "image" && connection.fromId === image.id) || (connection.toType === "image" && connection.toId === image.id)));
    selection.delete(selectionKey("image", image.id));
    saveNow(true);
    closeDialog(byId("dmImageDialog"));
    renderAll();
  }

  function addPastedImage(event) {
    if (!byId("notes")?.classList.contains("active-panel")) return;
    if (event.target.closest("input, textarea, select, [contenteditable='true']")) return;
    const items = [...(event.clipboardData?.items || [])];
    const imageItem = items.find((item) => item.kind === "file" && item.type.startsWith("image/"));
    if (!imageItem) return;
    const file = imageItem.getAsFile();
    if (!file) return;
    event.preventDefault();
    const point = lastBoardPointer ? boardPointFromClient(lastBoardPointer.clientX, lastBoardPointer.clientY) : viewportCenterPoint();
    addImageFromFile(file, point);
  }

  function openContextForBoard(clientX, clientY) {
    showContextMenu(clientX, clientY, { kind: "background", point: boardPointFromClient(clientX, clientY) });
  }

  function menuButton(label, action, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (options.danger) button.classList.add("is-danger");
    if (options.disabled) button.disabled = true;
    button.addEventListener("click", () => { hideContextMenu(); action(); });
    return button;
  }

  function showContextMenu(clientX, clientY, context) {
    const menu = byId("dmBoardContextMenu");
    if (!menu) return;
    currentContext = context;
    menu.innerHTML = "";
    if (context.kind === "card") {
      const card = cardById(context.id);
      const placement = placementFor(activeBoardId, context.id);
      if (!card || !placement) return;
      menu.append(
        menuButton("Focus / Preview", () => openFocus(card.id)),
        menuButton("Edit Details", () => openCardEditor(card.id)),
        menuButton(placement.collapsed ? "Expand Card" : "Collapse Card", () => toggleCardCollapsed(card.id)),
        menuButton("Fit to Content", () => fitCardToContent(card.id)),
        menuButton(card.favorite ? "Remove Favourite" : "Favourite", () => {
          recordHistory("toggle favourite"); card.favorite = !card.favorite; touchCard(card); renderAll();
        }),
        document.createElement("hr"),
        menuButton(placementFor(SESSION_BOARD_ID, card.id) ? "Remove from Current Session" : "Add to Current Session", () => {
          if (placementFor(SESSION_BOARD_ID, card.id)) removeCardFromSession(card.id); else addCardToSession(card.id);
        }, { disabled: activeBoardId === SESSION_BOARD_ID && placementsForCard(card.id).length <= 1 }),
        menuButton("Add Same Card to Another Board…", () => openShareCardDialog(card.id)),
        menuButton("Duplicate as Independent Card", () => duplicateCard(card.id)),
        menuButton("Connect from This Card", () => {
          connectMode = true; connectSource = { type: "card", id: card.id }; renderBoard(); updateConnectStatus();
        }),
        document.createElement("hr"),
        menuButton("Remove from This Board", () => deleteCardFromBoard(card.id), { danger: true }),
        menuButton("Delete Card Everywhere", () => deleteCard(card.id), { danger: true })
      );
    } else if (context.kind === "image") {
      const image = imageById(context.id);
      if (!image) return;
      menu.append(
        menuButton("Edit / Crop Image", () => openImageEditor(image.id)),
        menuButton("Connect from This Image", () => { connectMode = true; connectSource = { type: "image", id: image.id }; renderBoard(); updateConnectStatus(); }),
        menuButton("Remove Image", () => deleteImageDialog(image.id), { danger: true })
      );
    } else if (context.kind === "frame") {
      const frame = frameById(context.id);
      if (!frame) return;
      menu.append(menuButton("Edit Group / Frame", () => openFrameEditor(frame.id)), menuButton("Delete Frame", () => deleteFrame(frame.id), { danger: true }));
    } else if (context.kind === "board") {
      const board = boardById(context.id);
      if (!board) return;
      menu.append(menuButton(`Open ${board.name}`, () => setActiveBoard(board.id)));
      if (board.id !== activeBoardId) menu.append(menuButton("Add Link to This Board", () => openBoardLinkDialog(board.id)));
      if (!board.session) {
        menu.append(menuButton("Rename Board", () => { setActiveBoard(board.id); renameActiveBoard(); }), menuButton("Delete Board", () => { setActiveBoard(board.id); deleteActiveBoard(); }, { danger: true }));
      }
    } else if (context.kind === "background") {
      menu.append(
        menuButton("Quick Note Here", () => createQuickCard(context.point)),
        menuButton("New Card Here…", () => openNewCardDialog(context.point)),
        menuButton("Add Group / Frame Here", () => createFrame(context.point)),
        menuButton("Add Board Link…", () => openBoardLinkDialog()),
        document.createElement("hr"),
        menuButton("Select All", () => {
          selection.clear();
          state.placements.filter((p) => p.boardId === activeBoardId).forEach((p) => selection.add(selectionKey("card", p.cardId)));
          state.images.filter((i) => i.boardId === activeBoardId).forEach((i) => selection.add(selectionKey("image", i.id)));
          state.frames.filter((f) => f.boardId === activeBoardId).forEach((f) => selection.add(selectionKey("frame", f.id)));
          renderSelectionState();
        }),
        menuButton("Fit Board", fitBoard),
        menuButton("Board Appearance…", openBoardSettings)
      );
    }
    const viewport = byId("dmBoardViewport");
    const rect = viewport.getBoundingClientRect();
    menu.hidden = false;
    const width = 250;
    const x = clamp(clientX - rect.left, 8, Math.max(8, rect.width - width - 8));
    const y = clamp(clientY - rect.top, 8, Math.max(8, rect.height - 360));
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
  }

  function hideContextMenu() {
    const menu = byId("dmBoardContextMenu");
    if (menu) menu.hidden = true;
    currentContext = null;
  }

  function toggleMoreMenu(force) {
    const menu = byId("dmBoardMoreMenu");
    const button = byId("dmBoardMoreToggle");
    if (!menu || !button) return;
    const open = typeof force === "boolean" ? force : menu.hidden;
    menu.hidden = !open;
    button.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function enterBoardFromPortal(card) {
    if (card?.linkBoardId) setActiveBoard(card.linkBoardId);
  }

  function boardExportBounds() {
    const rects = boardRects();
    if (!rects.length) return { minX: 0, minY: 0, maxX: 1200, maxY: 800, width: 1200, height: 800 };
    const minX = Math.min(...rects.map((r) => r.x)) - 70;
    const minY = Math.min(...rects.map((r) => r.y)) - 70;
    const maxX = Math.max(...rects.map((r) => r.x + r.w)) + 70;
    const maxY = Math.max(...rects.map((r) => r.y + r.h)) + 70;
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
  }

  function wrapCanvasText(context, text, maxWidth) {
    const words = String(text || "").split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (context.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
      else line = test;
    });
    if (line) lines.push(line);
    return lines;
  }

  function hexWithAlpha(hex, alpha) {
    const value = String(hex || "#000000").replace("#", "");
    const r = parseInt(value.slice(0, 2), 16) || 0;
    const g = parseInt(value.slice(2, 4), 16) || 0;
    const b = parseInt(value.slice(4, 6), 16) || 0;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function loadCanvasImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  async function renderBoardToCanvas() {
    const bounds = boardExportBounds();
    const scale = Math.min(1.5, Math.max(0.5, 1800 / Math.max(bounds.width, 1)));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(600, Math.ceil(bounds.width * scale));
    canvas.height = Math.max(400, Math.ceil(bounds.height * scale));
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.translate(-bounds.minX, -bounds.minY);
    const board = boardById(activeBoardId);
    const backgrounds = { cork: "#765437", dark: "#1d1a18", paper: "#eee7d7", grid: "#dedbd0", plain: "#2b2825" };
    ctx.fillStyle = backgrounds[board?.background] || backgrounds.cork;
    ctx.fillRect(bounds.minX, bounds.minY, bounds.width, bounds.height);

    state.frames.filter((f) => f.boardId === activeBoardId).forEach((frame) => {
      ctx.fillStyle = hexWithAlpha(frame.color, 0.10); ctx.strokeStyle = frame.color; ctx.lineWidth = 4;
      ctx.fillRect(frame.x, frame.y, frame.w, frame.h); ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
      ctx.fillStyle = frame.color; ctx.font = "bold 22px sans-serif"; ctx.fillText(frame.label, frame.x + 14, frame.y + 28);
    });

    state.connections.filter((c) => c.boardId === activeBoardId).forEach((connection) => {
      const g = connectorGeometry(connection); if (!g) return;
      ctx.save(); ctx.beginPath(); ctx.moveTo(g.start.x, g.start.y); ctx.quadraticCurveTo(g.mid.x, g.mid.y, g.end.x, g.end.y);
      ctx.strokeStyle = connection.style === "conflict" ? "#cf3c52" : connection.style === "dashed" ? "#d8d0c0" : connection.style === "arrow" ? "#7aa7c7" : "#b08b48";
      ctx.lineWidth = connection.style === "conflict" ? 5 : 4;
      if (["dashed", "conflict"].includes(connection.style)) ctx.setLineDash(connection.style === "dashed" ? [14, 12] : [6, 7]);
      ctx.stroke(); ctx.restore();
      if (connection.label) {
        ctx.font = "bold 18px sans-serif"; ctx.fillStyle = "#f5efe4"; ctx.textAlign = "center"; ctx.fillText(connection.label, g.labelX, g.labelY);
      }
    });

    for (const image of state.images.filter((i) => i.boardId === activeBoardId)) {
      const img = await loadCanvasImage(image.dataUrl);
      ctx.fillStyle = "#15100c"; ctx.fillRect(image.x, image.y, image.w, image.h);
      if (img) {
        if (image.fit === "cover") {
          const scaleImg = Math.max(image.w / img.width, image.h / img.height);
          const sw = image.w / scaleImg, sh = image.h / scaleImg;
          const sx = (img.width - sw) * (image.posX / 100), sy = (img.height - sh) * (image.posY / 100);
          ctx.drawImage(img, sx, sy, sw, sh, image.x, image.y, image.w, image.h);
        } else {
          const ratio = Math.min(image.w / img.width, image.h / img.height);
          const dw = img.width * ratio, dh = img.height * ratio;
          ctx.drawImage(img, image.x + (image.w - dw) / 2, image.y + (image.h - dh) / 2, dw, dh);
        }
      }
      ctx.strokeStyle = "#e8dfcf"; ctx.lineWidth = 5; ctx.strokeRect(image.x, image.y, image.w, image.h);
      if (image.captionVisible && image.caption) { ctx.fillStyle = "#f4ede1"; ctx.font = "16px sans-serif"; ctx.textAlign = "center"; ctx.fillText(image.caption, image.x + image.w / 2, image.y + image.h + 22); }
    }

    for (const placement of state.placements.filter((p) => p.boardId === activeBoardId)) {
      const card = cardById(placement.cardId); if (!card) continue;
      ctx.fillStyle = card.color; ctx.strokeStyle = "rgba(48,34,17,.7)"; ctx.lineWidth = 3;
      ctx.fillRect(placement.x, placement.y, placement.w, placement.h); ctx.strokeRect(placement.x, placement.y, placement.w, placement.h);
      ctx.fillStyle = "#241a11"; ctx.font = "bold 20px Georgia"; ctx.textAlign = "left";
      ctx.fillText(card.title, placement.x + 14, placement.y + 30, placement.w - 28);
      if (placement.collapsed) continue;
      ctx.font = "15px sans-serif";
      let y = placement.y + 58;
      const maxY = placement.y + placement.h - 34;
      const paragraphs = card.body.split(/\r?\n/);
      for (const paragraph of paragraphs) {
        if (y > maxY) break;
        const lines = wrapCanvasText(ctx, paragraph || " ", placement.w - 28);
        for (const line of lines) {
          if (y > maxY) break;
          ctx.fillText(line, placement.x + 14, y, placement.w - 28); y += 20;
        }
        y += 4;
      }
      if (card.status) {
        ctx.fillStyle = "rgba(36,26,17,.18)"; ctx.fillRect(placement.x + 12, placement.y + placement.h - 29, Math.min(120, 14 + ctx.measureText(card.status).width), 20);
        ctx.fillStyle = "#241a11"; ctx.font = "bold 12px sans-serif"; ctx.fillText(card.status, placement.x + 18, placement.y + placement.h - 15);
      }
    }
    return canvas;
  }

  async function exportBoardPng() {
    toggleMoreMenu(false);
    const canvas = await renderBoardToCanvas();
    const link = document.createElement("a");
    const boardName = (boardById(activeBoardId)?.name || "DM Board").replace(/[^a-z0-9-_]+/gi, "-");
    link.download = `${boardName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function printBoardPdf() {
    toggleMoreMenu(false);
    const printWindow = window.open("", "_blank");
    if (!printWindow) { alert("Allow pop-ups to print or save the board as PDF."); return; }
    printWindow.document.write("<p style='font-family:sans-serif'>Preparing board…</p>");
    const canvas = await renderBoardToCanvas();
    const dataUrl = canvas.toDataURL("image/png");
    const title = escapeText(boardById(activeBoardId)?.name || "DM Board");
    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html><head><title>${title}</title><style>html,body{margin:0;background:#fff}img{display:block;max-width:100%;height:auto;margin:auto}@page{margin:8mm}</style></head><body><img src="${dataUrl}" alt="${title}"><script>window.onload=()=>setTimeout(()=>window.print(),250)<\/script></body></html>`);
    printWindow.document.close();
  }

  function openMoreToolsOnOutsideClick(event) {
    if (!event.target.closest(".dm-board-more-wrap")) toggleMoreMenu(false);
  }

  function bindStaticEvents() {
    byId("dmBoardSidebarToggle")?.addEventListener("click", () => toggleSidebar());
    byId("dmBoardSidebarClose")?.addEventListener("click", () => toggleSidebar(false));
    byId("dmBoardSidebarRail")?.addEventListener("click", () => toggleSidebar(true));
    byId("dmBoardBack")?.addEventListener("click", navBack);
    byId("dmBoardForward")?.addEventListener("click", navForward);
    byId("dmBoardNewCard")?.addEventListener("click", () => openNewCardDialog());
    byId("dmBoardQuickNote")?.addEventListener("click", () => createQuickCard());
    byId("dmBoardEmptyNewCard")?.addEventListener("click", () => openNewCardDialog());
    byId("dmBoardNewBoard")?.addEventListener("click", openNewBoardDialog);
    byId("dmBoardRename")?.addEventListener("click", renameActiveBoard);
    byId("dmBoardDelete")?.addEventListener("click", deleteActiveBoard);
    byId("dmBoardConnect")?.addEventListener("click", toggleConnectMode);
    byId("dmBoardAddImage")?.addEventListener("click", () => byId("dmBoardImageInput")?.click());
    byId("dmBoardImageInput")?.addEventListener("change", (event) => addImageFromFile(event.target.files?.[0]));
    byId("dmBoardFit")?.addEventListener("click", fitBoard);
    byId("dmBoardResetView")?.addEventListener("click", resetView);
    byId("dmBoardZoomIn")?.addEventListener("click", () => zoomBy(1.18));
    byId("dmBoardZoomOut")?.addEventListener("click", () => zoomBy(1 / 1.18));
    byId("dmBoardRunSession")?.addEventListener("click", enterRunMode);
    byId("dmBoardExitSession")?.addEventListener("click", enterRunMode);
    byId("dmBoardFavourites")?.addEventListener("click", () => { renderSearchResults("favorites"); toggleMoreMenu(false); });
    byId("dmBoardSearch")?.addEventListener("input", () => renderSearchResults("query"));
    byId("dmBoardSearch")?.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { event.currentTarget.value = ""; renderSearchResults("query"); }
    });
    byId("dmBoardMoreToggle")?.addEventListener("click", () => toggleMoreMenu());
    byId("dmBoardAddFrame")?.addEventListener("click", () => { toggleMoreMenu(false); createFrame(); });
    byId("dmBoardAddPortal")?.addEventListener("click", () => { toggleMoreMenu(false); openBoardLinkDialog(); });
    byId("dmBoardTemplates")?.addEventListener("click", () => { toggleMoreMenu(false); openTemplatesDialog(); });
    byId("dmBoardSettings")?.addEventListener("click", () => { toggleMoreMenu(false); openBoardSettings(); });
    byId("dmBoardSnapToggle")?.addEventListener("click", () => { toggleSnap(); });
    byId("dmBoardUndo")?.addEventListener("click", () => { toggleMoreMenu(false); undo(); });
    byId("dmBoardRedo")?.addEventListener("click", () => { toggleMoreMenu(false); redo(); });
    byId("dmBoardExportPng")?.addEventListener("click", exportBoardPng);
    byId("dmBoardPrintPdf")?.addEventListener("click", printBoardPdf);

    byId("dmCreateCard")?.addEventListener("click", () => {
      createCardWithHistory({
        title: byId("dmNewCardTitle")?.value,
        templateId: byId("dmNewCardTemplate")?.value,
        boardId: byId("dmNewCardBoard")?.value,
        point: pendingCreatePoint
      });
      closeDialog(byId("dmNewCardDialog"));
    });
    byId("dmNewCardTitle")?.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); byId("dmCreateCard")?.click(); } });
    byId("dmCreateBoard")?.addEventListener("click", () => { if (createBoard(byId("dmNewBoardName")?.value)) closeDialog(byId("dmNewBoardDialog")); });
    byId("dmNewBoardName")?.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); byId("dmCreateBoard")?.click(); } });

    ["dmCardTitle", "dmCardBody", "dmCardTags", "dmCardStatus"].forEach((id) => byId(id)?.addEventListener("input", syncCardDialogToState));
    ["dmCardType", "dmCardColor", "dmCardBoardLink", "dmCardAppLinks", "dmCardFavourite", "dmCardPortraitShow"].forEach((id) => byId(id)?.addEventListener("change", syncCardDialogToState));
    ["dmCardPortraitX", "dmCardPortraitY"].forEach((id) => byId(id)?.addEventListener("input", syncCardDialogToState));
    byId("dmCardDelete")?.addEventListener("click", () => deleteCard(byId("dmCardDialog")?.dataset.cardId));
    byId("dmCardClose")?.addEventListener("click", () => closeDialog(byId("dmCardDialog")));
    byId("dmCardFocus")?.addEventListener("click", () => { const id = byId("dmCardDialog")?.dataset.cardId; closeDialog(byId("dmCardDialog")); openFocus(id); });
    byId("dmCardSaveTemplate")?.addEventListener("click", saveCardAsTemplate);
    byId("dmCardPortraitUpload")?.addEventListener("click", () => byId("dmCardPortraitInput")?.click());
    byId("dmCardPortraitInput")?.addEventListener("change", (event) => addCardPortrait(event.target.files?.[0]));
    byId("dmCardPortraitRemove")?.addEventListener("click", removeCardPortrait);

    byId("dmCardFocusBody")?.addEventListener("input", syncFocusBody);
    byId("dmCardFocusDetails")?.addEventListener("click", () => { const id = byId("dmCardFocusDialog")?.dataset.cardId; closeDialog(byId("dmCardFocusDialog")); openCardEditor(id); });

    byId("dmTemplateSelect")?.addEventListener("change", (event) => renderTemplatesEditor(event.target.value));
    byId("dmTemplateNew")?.addEventListener("click", createTemplate);
    byId("dmTemplateSave")?.addEventListener("click", saveTemplate);
    byId("dmTemplateDelete")?.addEventListener("click", deleteTemplate);

    byId("dmBoardSettingsSave")?.addEventListener("click", saveBoardSettings);
    byId("dmFrameSave")?.addEventListener("click", saveFrame);
    byId("dmFrameDelete")?.addEventListener("click", () => deleteFrame());
    byId("dmShareCardSave")?.addEventListener("click", saveShareCard);
    byId("dmBoardLinkCreate")?.addEventListener("click", createBoardLink);

    byId("dmConnectionSave")?.addEventListener("click", saveConnectionDialog);
    byId("dmConnectionDelete")?.addEventListener("click", deleteSelectedConnection);
    byId("dmImageSave")?.addEventListener("click", saveImageDialog);
    byId("dmImageDelete")?.addEventListener("click", () => deleteImageDialog());
    byId("dmImagePortrait")?.addEventListener("click", portraitCropImage);
    ["dmImageFit", "dmImagePosX", "dmImagePosY"].forEach((id) => byId(id)?.addEventListener(id === "dmImageFit" ? "change" : "input", () => {
      const image = imageById(byId("dmImageDialog")?.dataset.imageId); if (image) updateImageCropPreview(image);
    }));

    document.querySelectorAll("[data-align]").forEach((button) => button.addEventListener("click", () => alignSelection(button.dataset.align)));
    byId("dmBoardSelectionSession")?.addEventListener("click", addSelectionToSession);
    byId("dmBoardSelectionDelete")?.addEventListener("click", deleteSelection);

    const viewport = byId("dmBoardViewport");
    viewport?.addEventListener("pointerdown", startViewportInteraction);
    viewport?.addEventListener("pointermove", handleViewportMove);
    viewport?.addEventListener("pointerup", finishViewportInteraction);
    viewport?.addEventListener("pointercancel", finishViewportInteraction);
    viewport?.addEventListener("wheel", (event) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      zoomAt(event.clientX, event.clientY, boardView().scale * factor);
    }, { passive: false });
    viewport?.addEventListener("dblclick", (event) => {
      if (event.target === viewport || event.target.id === "dmBoardWorld" || event.target.id === "dmBoardElements" || event.target.id === "dmBoardFrames") {
        createQuickCard(boardPointFromClient(event.clientX, event.clientY));
      }
    });
    viewport?.addEventListener("contextmenu", (event) => {
      if (event.target.closest(".dm-board-card, .dm-board-image, .dm-board-frame, .dm-board-sidebar, .dm-board-context-menu")) return;
      event.preventDefault();
      openContextForBoard(event.clientX, event.clientY);
    });

    document.addEventListener("paste", addPastedImage);
    document.addEventListener("click", (event) => {
      const popover = byId("dmBoardSearchResults");
      if (popover && !popover.hidden && !event.target.closest(".dm-board-search-wrap")) popover.hidden = true;
      if (!event.target.closest(".dm-board-context-menu")) hideContextMenu();
      openMoreToolsOnOutsideClick(event);
    });
    document.addEventListener("keydown", (event) => {
      if (!byId("notes")?.classList.contains("active-panel")) return;
      const typing = event.target.closest("input, textarea, select, [contenteditable='true']");
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && !typing) {
        event.preventDefault(); if (event.shiftKey) redo(); else undo();
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y" && !typing) {
        event.preventDefault(); redo();
      } else if (event.key === "Delete" && !typing && selection.size) {
        event.preventDefault(); deleteSelection();
      } else if (event.key === "Escape") {
        hideContextMenu(); connectMode = false; connectSource = null; updateConnectStatus();
      }
    });

    document.querySelectorAll("[data-dm-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.dmJump;
        if (target === "encounters" && typeof window.navigateToSection === "function") window.navigateToSection("tables", "encounters-card");
        else if (typeof window.showTab === "function") window.showTab(target);
      });
    });
  }

  function init() {
    if (initialised) return;
    initialised = true;
    loadState();
    bindStaticEvents();
    pushNav({ boardId: activeBoardId });
    renderAll();
    requestAnimationFrame(() => {
      const view = boardView();
      if (view.x === 0 && view.y === 0 && boardElementsCount(activeBoardId)) fitBoard(); else applyBoardTransform();
    });
  }

  function exportState() {
    if (!state) loadState();
    return deepClone(state);
  }

  function importState(raw) {
    state = normaliseState(raw);
    activeBoardId = state.activeBoardId;
    runMode = false;
    previousBoardId = null;
    connectMode = false;
    connectSource = null;
    selection.clear();
    historyUndo = [];
    historyRedo = [];
    navHistory = [];
    navIndex = -1;
    saveNow(false);
    if (initialised) {
      pushNav({ boardId: activeBoardId });
      renderAll();
    }
  }

  window.AldorDMNotes = { init, exportState, importState, storageKey: STORAGE_KEY };
})();
