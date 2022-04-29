export function localStore(key, enable = true) {

  function getStore() {
    const value = localStorage.getItem(key);
    return (value) ? JSON.parse(value) : {};
  }

  function setStore(obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  return {
    proxy: getStore(),

    get value() {
      return this.proxy;
    },

    add(prop, value) {
      this.proxy[prop] = value;
      if (enable) setStore(this.value);
      return this.value;
    },

    remove(prop) {
      delete this.proxy[prop];
      if (enable) setStore(this.value);
      return this.value;
    }
  };
}
