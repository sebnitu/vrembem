import { Collection, StackArray, setGlobalState, _ } from "@vrembem/core";
import { config, ModalConfig } from "./config";
import { ModalEntry } from "./ModalEntry";
import { handleClick, handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";
import { closeAll } from "./closeAll";
import { replace } from "./replace";
import { updateFocusState } from "./helpers/updateFocusState";

export class Modal extends Collection<ModalEntry, ModalConfig> {
  readonly entryClass = ModalEntry;
  trigger: HTMLElement | null;
  stack: StackArray<ModalEntry>;

  constructor(options: Partial<ModalConfig>) {
    super({ ...config, ...options });
    this.name = "Modal";
    this.trigger = null;

    // Set the initial state of private store
    _(this, {
      handlers: {
        click: handleClick.bind(this),
        keydown: handleKeydown.bind(this)
      }
    });

    // Setup stack property using StackArray
    this.stack = new StackArray({
      onChange: () => {
        setGlobalState(
          !!this.stack.top,
          this.config.selectorInert,
          this.config.selectorOverflow
        );
        this.emit("stackChange");
      }
    });
  }

  get active(): ModalEntry | undefined {
    return this.stack.top;
  }

  async open(
    id: string,
    transition?: boolean,
    focus?: boolean
  ): Promise<ModalEntry> {
    const entry = this.getOrThrow(id);
    return open(entry, transition, focus);
  }

  async close(
    id?: string,
    transition?: boolean,
    focus?: boolean
  ): Promise<ModalEntry | undefined> {
    const entry = id ? this.getOrThrow(id) : this.active;
    return close(entry, transition, focus);
  }

  async replace(
    id: string,
    transition?: boolean,
    focus?: boolean
  ): Promise<{ opened: ModalEntry; closed: ModalEntry[] }> {
    const entry = this.getOrThrow(id);
    return replace(entry, transition, focus);
  }

  async closeAll(
    exclude?: string,
    transition?: boolean,
    focus: boolean = true
  ): Promise<ModalEntry[]> {
    const result = await closeAll(this, exclude, transition);
    // Update focus if the focus param is true
    if (focus) {
      updateFocusState(this);
    }
    return result;
  }

  async afterMount() {
    document.addEventListener("click", _(this).handlers.click);
    document.addEventListener("keydown", _(this).handlers.keydown);
  }

  async beforeUnmount() {
    this.trigger = null;
  }

  async afterUnmount() {
    document.removeEventListener("click", _(this).handlers.click);
    document.removeEventListener("keydown", _(this).handlers.keydown);
  }
}
