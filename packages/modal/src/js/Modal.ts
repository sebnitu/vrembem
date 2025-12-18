import { Collection, StackArray, setGlobalState } from "@vrembem/core";

import { config, ModalConfig } from "./config";
import { ModalEntry } from "./ModalEntry";
import { handleClick, handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";
import { closeAll } from "./closeAll";
import { replace } from "./replace";
import { updateFocusState } from "./helpers/updateFocusState";

export class Modal extends Collection<ModalEntry> {
  #handleClick: (event: MouseEvent) => void;
  #handleKeydown: (event: KeyboardEvent) => void;
  declare config: ModalConfig;
  trigger: HTMLElement | null;
  stack: StackArray<ModalEntry>;

  constructor(options: ModalConfig) {
    super({ ...config, ...options });
    this.module = "Modal";
    this.entryClass = ModalEntry as new (
      parent: Collection<ModalEntry>,
      query: string | HTMLElement,
      options?: Record<string, any>
    ) => ModalEntry;
    this.trigger = null;
    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);

    // Setup stack property using StackArray
    this.stack = new StackArray({
      onChange: () => {
        setGlobalState(
          !!this.stack.top,
          this.config.selectorInert,
          this.config.selectorOverflow
        );
      }
    });
  }

  get active() {
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
  ): Promise<ModalEntry | null> {
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
    const result = await closeAll.call(this, exclude, transition);
    // Update focus if the focus param is true
    if (focus) {
      updateFocusState(this);
    }
    return result;
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
