import feather from "feather-icons";

const config = {
  prefix: ".layout__content",
  headings: ["h1", "h2", "h3"]
};

const svg = feather.icons.hash.toSvg({
  class: "icon icon_size_sm",
  role: "img"
});

const headingAnchor = {
  mount() {
    config.headings.forEach((heading) => {
      const els = document.querySelectorAll(`${config.prefix} ${heading}`);
      els.forEach((el) => {
        // Return if heading has the `no-anchor` class
        if (el.classList.contains("no-anchor")) return;

        // Return if heading is in a code example
        if (el.closest(".code-example")) return;

        // Setup the heading anchor
        el.setAttribute("tabindex", "-1");
        const elText = el.innerHTML;
        const elId = el.getAttribute("id");
        const anchor = document.createElement("a");
        anchor.setAttribute("class", "heading-anchor");
        anchor.setAttribute("href", "#" + elId);
        anchor.setAttribute("aria-label", `Permalink to '${elText}'`);
        anchor.innerHTML = svg;
        el.append(anchor);
      });
    });
  }
};

export { headingAnchor };
