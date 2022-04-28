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
      console.log('localStore() => set');
      if (value === undefined) {
        delete target[property];
      } else {
        target[property] = value;
      }
      if (enable) setStore(target);
      return true;
    }
  });
}
