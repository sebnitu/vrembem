export class Drawer extends HTMLElement {
  #initialized = false;
  defaults: Record<string, string> = {};
  drawerModal!: HTMLDialogElement;
  drawerContainer!: HTMLDivElement;
  mqList: MediaQueryList | null = null;
  mqHandler: (event: MediaQueryListEvent) => void;

  constructor() {
    super();
    this.mqHandler = (event) => this.evaluateLayout(event.matches);
  }

  static get observedAttributes() {
    return ["breakpoint", "position"];
  }

  get isModal(): boolean {
    return this.mqList ? !this.mqList.matches : false;
  }

  getToken(el: Element, ...keys: string[]): string {
    const styles = getComputedStyle(el);
    const prefix = styles.getPropertyValue("--vb-prefix-tokens").trim();
    const prop = `--${[prefix, ...keys].filter(Boolean).join("-")}`;
    return styles.getPropertyValue(prop).trim();
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
    // 1. Ensure that an ID exists on the custom element
    const id = this.getAttribute("id");
    if (!id) {
      throw new Error(
        `<vb-drawer> failed to initialize: "id" attribute is required.`
      );
    }

    // 2. Get the default breakpoint and position tokens
    this.defaults.breakpoint = this.getToken(this, "drawer", "breakpoint");
    this.defaults.position = this.getToken(this, "drawer", "position");

    if (!this.drawerModal) {
      // 3. Build the internal structure
      this.drawerModal = document.createElement("dialog");
      this.drawerModal.setAttribute("id", `${id}-modal`);
      this.drawerModal.setAttribute("closedby", "any");
      this.drawerModal.classList.add("modal", "modal--drawer", "panel");

      this.drawerContainer = document.createElement("div");
      this.drawerContainer.classList.add("panel__container");

      // 4. Append the containers inside the custom element
      this.drawerModal.appendChild(this.drawerContainer);
      this.appendChild(this.drawerModal);
    }

    // 5. Apply the initial position modifier
    this.applyPosition(null, this.getAttribute("position"));

    // 6. Setup and initial match of media query
    const breakpoint =
      this.getAttribute("breakpoint") || this.defaults.breakpoint || "760px";
    this.setupMediaQuery(breakpoint);

    // 7. Set the initialized flag
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

    // Resolve named breakpoint tokens (e.g., "lg", "md")
    if (!/^\d/.test(bp)) {
      const value = this.getToken(document.body, "breakpoint", bp);
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
      while (this.drawerContainer.firstChild) {
        this.drawerModal.before(this.drawerContainer.firstChild);
      }
    } else {
      this.classList.add("is-modal");

      // Move children to the drawer modal
      while (this.firstChild && this.firstChild !== this.drawerModal) {
        this.drawerContainer.appendChild(this.firstChild);
      }
    }
  }

  applyPosition(oldPos: string | null, newPos: string | null) {
    // Remove the old position
    if (oldPos) this.drawerModal.classList.remove(`modal--pos-${oldPos}`);

    // Remove the default position
    const defaultPos = this.defaults.position || "left";
    this.drawerModal.classList.remove(`modal--pos-${defaultPos}`);

    // Apply the new position with the default as fallback
    const pos = newPos || defaultPos;
    this.drawerModal.classList.add(`modal--pos-${pos}`);
  }
}

if (!customElements.get("vb-drawer")) {
  customElements.define("vb-drawer", Drawer);
}
