export type TrackedOrder = { id: string; createdAt: string };

const KEY = "qulse_tracked_orders";

export function trackOrder(id: string) {
  if (typeof window === "undefined") return;
  try {
    const list = getTrackedOrders();
    if (!list.find((o) => o.id === id)) {
      list.unshift({ id, createdAt: new Date().toISOString() });
      localStorage.setItem(KEY, JSON.stringify(list.slice(0, 30)));
    }
  } catch {
    // localStorage indisponible : le suivi ne sera simplement pas persistant.
  }
}

export function getTrackedOrders(): TrackedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function untrackOrder(id: string) {
  if (typeof window === "undefined") return;
  try {
    const list = getTrackedOrders().filter((o) => o.id !== id);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function clearTrackedOrders() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
