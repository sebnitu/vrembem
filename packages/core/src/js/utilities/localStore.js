export function localStore(key, enable = true) {
  const local = localStorage.getItem(key);
  const store = (local) ? JSON.parse(local) : {};

  return {
    get(prop, fallback = undefined) {
      if (!prop) return store;
      return (prop in store) ? store[prop] : fallback;
    },

    set(prop, value) {
      if (value) {
        store[prop] = value;
      } else {
        delete store[prop];
      }
      if (enable) localStorage.setItem(key, JSON.stringify(store));
      return store;
    }
  };
}
