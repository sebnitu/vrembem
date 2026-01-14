import { Collection, StackArray, setGlobalState } from "@vrembem/core";

import { config, ModalConfig } from "./config";
import { ModalEntry } from "./ModalEntry";
import { handleClick, handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";
import { closeAll } from "./closeAll";
import { replace } from "./replace";
import { updateFocusState } from "./helpers/updateFocusState";

export class Modal extends Collection<ModalEntry, ModalConfig> {
  #handleClick: (event: MouseEvent) => void;
  #handleKeydown: (event: KeyboardEvent) => void;
  entryClass = ModalEntry;
  trigger: HTMLElement | null;
  stack: StackArray<ModalEntry>;

  constructor(options: Partial<ModalConfig>) {
    super({ ...config, ...options });
    this.name = "Modal";
    this.trigger = null;
    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);

    // Setup stack property using StackArray
    this.stack = new StackArray({
      onChange: () => {
        // Update the global state
        setGlobalState(
          !!this.stack.top,
          this.config.selectorInert,
          this.config.selectorOverflow
        );
        // Update the focus state
        if (this.stack.top) {
          updateFocusState(this.stack.top.parent);
        }
        // Emit the stack change event
        this.emit("stackChange");
      }
    });
  }

  get active() {
    return this.stack.top;
  }

  async open(id: string, transition?: boolean): Promise<ModalEntry> {
    const entry = this.getOrThrow(id);
    return open(entry, transition);
  }

  async close(id?: string, transition?: boolean): Promise<ModalEntry | null> {
    const entry = id ? this.getOrThrow(id) : this.active;
    return close(entry, transition);
  }

  async replace(
    id: string,
    transition?: boolean
  ): Promise<{ opened: ModalEntry; closed: ModalEntry[] }> {
    const entry = this.getOrThrow(id);
    return replace(entry, transition);
  }

  async closeAll(
    exclude?: string,
    transition?: boolean
  ): Promise<ModalEntry[]> {
    return await closeAll.call(this, exclude, transition);
  }

  async afterMount() {
    document.addEventListener("click", this.#handleClick, false);
    document.addEventListener("keydown", this.#handleKeydown, false);
  }

  async beforeUnmount() {
    this.trigger = null;
  }

  async afterUnmount() {
    document.removeEventListener("click", this.#handleClick, false);
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }
}
