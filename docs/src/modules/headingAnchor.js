import hashIcon from "@/assets/icons/hash-bold.svg?raw";

const config = {
  prefix: "#main",
  headings: ["h1", "h2", "h3"]
};

function createAnchorIcon() {
  const template = document.createElement("template");
  template.innerHTML = hashIcon.trim();
  const svg = template.content.firstElementChild;

  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("aria-hidden", "true");

  return svg;
}

const headingAnchor = {
  mount() {
    config.headings.forEach((heading) => {
      const els = document.querySelectorAll(`${config.prefix} ${heading}`);
      els.forEach((el) => {
        // Return if heading has the `no-anchor` class
        if (
          el.classList.contains("no-anchor") ||
          el.classList.contains("sr-only")
        )
          return;

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
        anchor.append(createAnchorIcon());
        el.append(anchor);
      });
    });
  }
};

export { headingAnchor };
