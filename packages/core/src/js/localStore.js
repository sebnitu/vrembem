export function localStore(key, enable = true) {

  function getStore() {
    const value = localStorage.getItem(key);
    return (value) ? JSON.parse(value) : {};
  }

  function setStore(obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  return new Proxy(getStore(), {
    set: (target, property, value) => {
      target[property] = value;
      if (enable) setStore(target);
      return true;
    },

    deleteProperty: (target, property) => {
      delete target[property];
      if (enable) setStore(target);
      return true;
    }
  });
}
