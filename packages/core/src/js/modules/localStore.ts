export function localStore<T extends Record<string, any> = Record<string, any>>(
  key: string,
  enable: boolean = true
) {
  const local = localStorage.getItem(key);
  const store: T = local ? JSON.parse(local) : {};

  return {
    get<K extends keyof T>(prop?: K, fallback?: T[K]): T[K] | T | undefined {
      if (!prop) return store;
      return prop in store ? store[prop] : fallback;
    },
    set<K extends keyof T>(prop: K, value?: T[K]): T {
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
