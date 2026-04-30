// History manager with 8-hour auto-cleanup
// Stores processing history in localStorage and auto-removes after 8 hours

const HISTORY_KEY = 'imageflow_history';
const HISTORY_TTL = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

/**
 * Get all history entries (auto-cleans expired ones)
 */
export function getHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const entries = JSON.parse(raw);
    const now = Date.now();
    // Filter out entries older than 8 hours
    const valid = entries.filter(e => now - e.timestamp < HISTORY_TTL);
    // Save cleaned list back
    if (valid.length !== entries.length) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(valid));
    }
    return valid;
  } catch {
    return [];
  }
}

/**
 * Add a history entry
 */
export function addHistoryEntry(entry) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    history.unshift({
      ...entry,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      timestamp: Date.now(),
    });
    // Keep max 50 entries
    const trimmed = history.slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage full or unavailable, silently fail
  }
}

/**
 * Clear all history
 */
export function clearHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

/**
 * Remove a specific history entry by ID
 */
export function removeHistoryEntry(id) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const filtered = history.filter(e => e.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch {
    // silently fail
  }
}

/**
 * Format a timestamp relative to now
 */
export function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

/**
 * Calculate when history entry expires
 */
export function getExpiryTime(timestamp) {
  const remaining = HISTORY_TTL - (Date.now() - timestamp);
  if (remaining <= 0) return 'Expired';
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m remaining`;
}
