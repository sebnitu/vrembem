import { drawer } from "./useDrawer.js";

function onThisPage(options = {}) {
  const settings = {
    selectorAnchors: "",
    selectorHeadings: ".layout__content",
    classActive: "is-active",
    ...options
  };

  const collection = [];

  function mount() {
    const els = document.querySelectorAll(settings.selectorAnchors);
    els.forEach((el) => {
      register(el);
    });

    setActive();
    window.addEventListener("scroll", () => {
      setActive();
    });
  }

  function register(anchor) {
    // Get the heading using the menu action's href.
    const href = anchor.getAttribute("href");
    const heading = document.querySelector(
      `${settings.selectorHeadings} ${href}`
    );

    // Guard if there is no heading returned.
    if (!heading) return;

    // Build the entry object.
    const entry = {
      anchor: anchor,
      heading: heading,
      get active() {
        return this.anchor.classList.contains(settings.classActive);
      },
      set active(value) {
        this.anchor.classList.toggle(settings.classActive, value);
      },
      get top() {
        const rect = heading.getBoundingClientRect();
        const margin = parseFloat(getComputedStyle(heading).scrollMarginTop);
        return Math.round(rect.top - margin);
      }
    };

    // Push entry into otp array.
    collection.push(entry);
  }

  function setActive() {
    // Filter out entries that have a positive top value.
    const pos = collection.filter((entry) => entry.top <= 0);
    // Find the entry with a negative top value that is closest to zero.
    const min = Math.max(...pos.map((entry) => entry.top));
    const result = collection.filter((entry) => entry.top === min);

    // Set the active state of entries by comparing them with the result.
    collection.forEach((entry) => {
      entry.active = entry === result[0];
    });

    // Close the modal drawer if open.
    if (drawer.activeModal && drawer.activeModal.id === "layout-aside") {
      drawer.activeModal.close();
    }
  }

  return {
    settings,
    collection,
    mount,
    register
  };
}

export { onThisPage };
