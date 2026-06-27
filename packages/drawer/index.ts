export class Drawer extends HTMLElement {
  #initialized = false;
  drawerModal!: HTMLDialogElement;
  mqList: MediaQueryList | null = null;
  mqHandler: (event: MediaQueryListEvent) => void;

  constructor() {
    super();
    this.mqHandler = (event) => this.evaluateLayout(event.matches);
  }

  static {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      vb-drawer { display: block; }
      vb-drawer.is-modal { display: contents; }
      vb-drawer.is-modal > :not(dialog) { display: none; }
    `);
    document.adoptedStyleSheets.push(sheet);
  }

  static get observedAttributes() {
    return ["breakpoint", "position"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue === newValue || !this.#initialized) return;
    if (name === "breakpoint") {
      this.setupMediaQuery(newValue);
    }
    if (name === "position") {
      this.applyPosition(oldValue, newValue);
    }
  }

  connectedCallback() {
    // Create internal structure
    this.drawerModal = document.createElement("dialog");

    // Setup the modal attributes
    this.drawerModal.setAttribute("id", `${this.getAttribute("id")}-modal`);
    this.drawerModal.setAttribute("closedby", "any");

    // Apply modal component and drawer modifier
    this.drawerModal.classList.add("modal", "modal--drawer");

    // Apply the initial position modifier
    const pos = this.getAttribute("position") || "bottom";
    this.applyPosition(null, pos);

    // Apply panel component to dialog modal
    this.drawerModal.classList.add("panel");

    // Append the containers inside the custom element
    this.appendChild(this.drawerModal);

    const bp = this.getAttribute("breakpoint") || "600px";
    this.setupMediaQuery(bp);

    // Set the initialized flag
    this.#initialized = true;
  }

  disconnectedCallback() {
    this.teardownMediaQuery();
  }

  setupMediaQuery(bp: string | null) {
    // Guard in case there is no breakpoint provided
    if (!bp) return;

    // Remove any existing media query setup
    this.teardownMediaQuery();

    // Check custom properties for non-numeric, unitless values
    // Example: "lg", "md", etc...
    if (!/^\d/.test(bp)) {
      const styles = getComputedStyle(document.body);
      const prefix = styles.getPropertyValue("--vb-prefix-tokens").trim();
      const prop = [prefix, "breakpoint", bp].filter(Boolean).join("-");
      const value = styles.getPropertyValue(`--${prop}`).trim();
      bp = value || bp;
    }

    // Make unitless values default to pixels
    bp = /^\d+$/.test(bp) ? `${bp}px` : bp;

    // Setup the media query list and initial run of evaluateLayout
    this.mqList = window.matchMedia(`(min-width: ${bp})`);
    this.mqList.addEventListener("change", this.mqHandler);
    this.evaluateLayout(this.mqList.matches);
  }

  teardownMediaQuery() {
    if (this.mqList) {
      this.mqList.removeEventListener("change", this.mqHandler);
      this.mqList = null;
    }
  }

  evaluateLayout(matches: boolean) {
    if (matches) {
      this.classList.remove("is-modal");

      // Close the modal if it's open
      if (this.drawerModal.hasAttribute("open")) {
        this.drawerModal.close();
      }

      // Move children outside of the drawer modal
      while (this.drawerModal.firstChild) {
        this.drawerModal.before(this.drawerModal.firstChild);
      }
    } else {
      this.classList.add("is-modal");

      // Move children to the drawer modal
      while (this.firstChild && this.firstChild !== this.drawerModal) {
        this.drawerModal.appendChild(this.firstChild);
      }
    }
  }

  applyPosition(oldPos: string | null, newPos: string | null) {
    if (oldPos) this.drawerModal.classList.remove(`modal--pos-${oldPos}`);
    this.drawerModal.classList.add(`modal--pos-${newPos}`);
  }
}

if (!customElements.get("vb-drawer")) {
  customElements.define("vb-drawer", Drawer);
}
