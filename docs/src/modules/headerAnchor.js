function headerAnchor(options = {}) {
  const settings = {
    prefix: ".layout__content",
    headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
    ...options
  };

  function mount() {
    settings.headings.forEach((heading) => {
      const els = document.querySelectorAll(`${settings.prefix} ${heading}`);
      els.forEach((el) => {
        el.setAttribute('tabindex', '-1');
        const elText = el.innerHTML;
        const elId = el.getAttribute("id");
        const anchor = document.createElement("a");
        anchor.setAttribute("class", "header-anchor");
        anchor.setAttribute("href", "#" + elId);
        anchor.setAttribute("aria-label", `Permalink to "${elText}"`);
        anchor.innerHTML = "#";
        el.append(anchor);
      });
    });
  }

  return {
    settings,
    mount
  };
}

export { headerAnchor };
