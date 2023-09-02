let _collection = null;

const layout = {
  get collection() {
    return _collection;
  },
  set collection(value) {
    if (value) {
      _collection = value;
      this.hasDrawer = true;
    } else {
      this.hasDrawer = false;
    }
  },
  hasAside: false,
  hasDrawer: false,
  get hasAsideOrDrawer() {
    return this.hasAside || this.hasDrawer;
  }
};

export { layout };
