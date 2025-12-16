Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: (value) => {
      switch (value) {
        case "z-index":
          return "1000";
        default:
          return "";
      }
    }
  })
});
