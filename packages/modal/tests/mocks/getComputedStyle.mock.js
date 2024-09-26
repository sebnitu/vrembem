Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    get ["z-index"]() {
      return "1000";
    },
    getPropertyValue: () => {
      return "";
    }
  })
});
