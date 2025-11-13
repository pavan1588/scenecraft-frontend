export type HistoryItemType = "analyzer" | "editor";

export type HistoryItem = {
  id: string;
  type: HistoryItemType;
  title: string;
  createdAt: string;      // ISO string
  summary?: string;
};

const STORAGE_KEY = "scenecraft-history-v1";

function safeParse(raw: string | null): HistoryItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return safeParse(raw);
}

export function addHistoryItem(item: HistoryItem) {
  if (typeof window === "undefined") return;
  const current = loadHistory();
  const next = [item, ...current].slice(0, 50); // cap at 50 entries
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
