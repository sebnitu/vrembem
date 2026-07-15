const handlers = new Map();

export function installMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query) => ({
      get matches() {
        return evaluate(query, window.innerWidth);
      },
      media: query,
      onchange: null,
      addEventListener: vi.fn((type, handler) => {
        if (type !== "change") return;
        if (!handlers.has(query)) handlers.set(query, new Set());
        handlers.get(query).add(handler);
      }),
      removeEventListener: vi.fn((type, handler) => {
        if (type !== "change") return;
        handlers.get(query)?.delete(handler);
      }),
      dispatchEvent: vi.fn()
    }))
  });
}

export function resizeWindow(value) {
  const prev = window.innerWidth;
  window.innerWidth = value;
  for (const [query, set] of handlers) {
    const was = evaluate(query, prev);
    const now = evaluate(query, value);
    if (was !== now) {
      for (const handler of set) {
        handler({ matches: now, media: query });
      }
    }
  }
}

export function resetMatchMedia() {
  handlers.clear();
}

function evaluate(query, value) {
  const match = query.match(/\d+/);
  if (!match) return false;
  const bp = parseInt(match[0], 10);
  if (query.includes("min-width")) return value >= bp;
  if (query.includes("max-width")) return value <= bp;
  return false;
}
