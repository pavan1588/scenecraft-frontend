import { useEffect, useState } from "react";

export type HistoryKind = "scene-analyzer" | "scene-editor" | "full-script";

export interface HistoryEntry {
  id: string;
  kind: HistoryKind;        // internal grouping key
  type: string;             // "analyzer" | "editor" | etc. (used in UI)
  title: string;            // short label shown in history list
  createdAt: string;        // ISO string, used by UI
  prompt: string;           // user input (scene / script)
  response: string;         // AI output
  meta?: Record<string, any>;
  // optional extra timestamp for internal use / backwards compat
  timestamp?: string;
}

// Alias used by the pages
export type HistoryItem = HistoryEntry;

const STORAGE_KEY = "scenecraft-history-v1";

function loadAll(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveAll(items: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore quota / private mode errors
  }
}

// NOTE: caller can pass a HistoryKind, a string (e.g. email), or null/undefined.
export function loadHistory(kind?: HistoryKind | string | null): HistoryItem[] {
  const all = loadAll();

  if (!kind) return all;

  if (
    kind === "scene-analyzer" ||
    kind === "scene-editor" ||
    kind === "full-script"
  ) {
    return all.filter((item) => item.kind === kind);
  }

  // If kind is some other string (e.g. user email), ignore it for now.
  return all;
}

// Flexible helper: supports addHistoryItem(item) and addHistoryItem(email, item)
export function addHistoryItem(
  userOrItem: string | null | any,
  maybeItem?: any
): HistoryItem {
  const baseItemRaw =
    typeof userOrItem === "string" || userOrItem === null
      ? maybeItem
      : userOrItem;

  // Ensure we have an object
  const baseItemObj: any = baseItemRaw || {};

  const meta =
    typeof userOrItem === "string" && userOrItem
      ? { ...(baseItemObj.meta ?? {}), userEmail: userOrItem }
      : baseItemObj.meta;

  const itemWithoutIdAndTs: any = { ...baseItemObj, meta };
  delete itemWithoutIdAndTs.id;
  delete itemWithoutIdAndTs.timestamp;

  const all = loadAll();

  const newItem: HistoryEntry = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now()),
    timestamp: new Date().toISOString(),
    ...itemWithoutIdAndTs,
  };

  all.unshift(newItem);

  // keep latest 50 per kind
  const byKind: Record<HistoryKind, HistoryEntry[]> = {
    "scene-analyzer": [],
    "scene-editor": [],
    "full-script": [],
  };

  for (const entry of all) {
    if (!byKind[entry.kind]) continue;
    if (byKind[entry.kind].length < 50) {
      byKind[entry.kind].push(entry);
    }
  }

  const merged = [
    ...byKind["scene-analyzer"],
    ...byKind["scene-editor"],
    ...byKind["full-script"],
  ];

  saveAll(merged);
  return newItem;
}

export function clearHistory(kind?: HistoryKind | string | null) {
  if (!kind) {
    saveAll([]);
    return;
  }

  if (
    kind === "scene-analyzer" ||
    kind === "scene-editor" ||
    kind === "full-script"
  ) {
    const all = loadAll();
    const filtered = all.filter((item) => item.kind !== kind);
    saveAll(filtered);
    return;
  }

  // unknown string: for now do nothing (no per-email partitioning here)
}

export function useHistory(kind?: HistoryKind | string | null) {
  const [items, setItems] = useState<HistoryItem[]>([]);

  const refresh = () => {
    setItems(loadHistory(kind));
  };

  useEffect(() => {
    refresh();
  }, [kind]);

  const clear = () => {
    clearHistory(kind);
    refresh();
  };

  return { items, refresh, clear };
}
