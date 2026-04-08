export function getElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element: #${id}`);
  return el as T;
}

export function updateVisitorCounter(
  selector: string,
  storageKey: string,
  initial: number
): number {
  const raw = localStorage.getItem(storageKey) ?? String(initial);
  const count = parseInt(raw, 10) + 1;
  localStorage.setItem(storageKey, String(count));
  const el = document.querySelector(selector);
  if (el) el.textContent = String(count).padStart(6, "0");
  return count;
}
