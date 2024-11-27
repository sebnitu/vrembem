import { getDataConfig } from "@vrembem/core";

function scrollSpy(options = {}) {
  const settings = {
    selector: ".scroll-spy",
    dataConfig: "scroll-config",
    value: 0,
    operator: "<",
    classActive: "is-active",
    ...options
  };

  const collection = [];

  function mount() {
    const els = document.querySelectorAll(settings.selector);
    els.forEach((el) => {
      register(el);
    });

    checkScroll();
    document.addEventListener("scroll", () => {
      checkScroll();
    });
  }

  function register(el) {
    const config = getDataConfig(el, settings.dataConfig);
    const entry = {
      el: el,
      ...{ ...settings, ...config }
    };
    collection.push(entry);
  }

  function checkScroll() {
    const top = document.documentElement.scrollTop;
    collection.forEach((entry) => {
      entry.el.classList.toggle(
        entry.classActive,
        customOperator(entry.value, entry.operator, top)
      );
    });
  }

  function customOperator(a, op, b) {
    switch (op) {
      case "<":
        return a < b;
      case ">":
        return a > b;
      case "<=":
        return a <= b;
      case ">=":
        return a >= b;
    }
  }

  return {
    settings,
    collection,
    mount,
    register
  };
}

export { scrollSpy };
