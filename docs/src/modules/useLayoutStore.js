const layout = {
  hasDrawer: false,
  hasAside: false,
  get hasAsideOrDrawer() {
    return this.hasDrawer || this.hasAside;
  }
};

export { layout };
