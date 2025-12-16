import { getAttrData } from "@vrembem/core";

export function scrollSpy(options = {}) {
  const config = {
    selector: ".scroll-spy",
    attrConfig: "scroll-config",
    value: 0,
    operator: "<",
    classActive: "is-active",
    ...options
  };

  const collection = [];

  function mount() {
    const els = document.querySelectorAll(config.selector);
    els.forEach((el) => {
      register(el);
    });

    checkScroll();
    document.addEventListener("scroll", () => {
      checkScroll();
    });
  }

  function register(el) {
    const data = getAttrData(el, config.attrConfig);
    const entry = {
      el: el,
      ...{ ...config, ...data }
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
    config,
    collection,
    mount,
    register
  };
}
