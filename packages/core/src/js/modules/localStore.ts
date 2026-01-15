export function localStore<
  ValueMap extends Record<string, any> = Record<string, any>
>(key: string, enable: boolean = true) {
  const local = localStorage.getItem(key);
  const store: ValueMap = local ? JSON.parse(local) : {};

  return {
    get<Key extends keyof ValueMap>(
      prop?: Key,
      fallback?: ValueMap[Key]
    ): ValueMap[Key] | ValueMap | undefined {
      if (!prop) return store;
      return prop in store ? store[prop] : fallback;
    },
    set<Key extends keyof ValueMap>(
      prop: Key,
      value?: ValueMap[Key]
    ): ValueMap {
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
