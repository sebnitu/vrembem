export class Popover extends HTMLElement {
  triggerEl: HTMLElement | null = null;
  popoverEl: HTMLElement | null = null;
  tooltipEl: HTMLElement | null = null;
  tooltipId: string | null = null;

  constructor() {
    super();
    // Bind this context to onToggle method
    this.onToggle = this.onToggle.bind(this);
  }

  connectedCallback() {
    // Get the trigger element if it has a popover and tooltip
    this.triggerEl = this.querySelector("[popovertarget][interestfor]");
    if (!this.triggerEl) return;

    const popoverId = this.triggerEl.getAttribute("popovertarget");
    const tooltipId = this.triggerEl.getAttribute("interestfor");
    if (!popoverId || !tooltipId) return;

    // Get the popover and tooltip
    this.popoverEl = document.getElementById(popoverId);
    this.tooltipEl = document.getElementById(tooltipId);
    if (!this.popoverEl || !this.tooltipEl) return;

    // Store the tooltip ID
    this.tooltipId = this.tooltipEl.id;

    this.popoverEl.addEventListener("toggle", this.onToggle);
  }

  disconnectedCallback() {
    this.popoverEl?.removeEventListener("toggle", this.onToggle);
  }

  onToggle(event: ToggleEvent) {
    if (!this.triggerEl || !this.tooltipEl || !this.tooltipId) return;
    if (event.newState === "open") {
      this.triggerEl.removeAttribute("interestfor");
      this.tooltipEl.hidePopover?.();
    } else {
      this.triggerEl.setAttribute("interestfor", this.tooltipId);
    }
  }
}
