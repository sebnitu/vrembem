const settings = {
  prefix: ".layout__content",
  headings: ["h1", "h2", "h3", "h4", "h5", "h6"]
};

const headerAnchor = {
  mount() {
    settings.headings.forEach((heading) => {
      const els = document.querySelectorAll(`${settings.prefix} ${heading}`);
      els.forEach((el) => {
        // Return if heading has the `no-anchor` class.
        if (el.classList.contains("no-anchor")) return;
        
        // Return if heading is in a code example.
        if (el.closest(".code-example")) return;

        // Setup the heading anchor.
        el.setAttribute("tabindex", "-1");
        const elText = el.innerHTML;
        const elId = el.getAttribute("id");
        const anchor = document.createElement("a");
        anchor.setAttribute("class", "header-anchor");
        anchor.setAttribute("href", "#" + elId);
        anchor.setAttribute("aria-label", `Permalink to '${elText}'`);
        anchor.innerHTML = "#";
        el.prepend(anchor);
      });
    });
  }
};

export { headerAnchor };
