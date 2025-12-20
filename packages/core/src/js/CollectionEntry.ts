import { getElement } from "./utilities";
import { ConfigManager } from "./modules";
import type { Collection } from "./Collection";

export type CollectionEntryConstructor<
  TParent extends Collection<any>, 
  TEntry extends CollectionEntry<TParent>
> = {
  new (
    parent: Collection<any>,
    query: string | HTMLElement,
    options?: Record<string, any>
  ): TEntry;
}

export class CollectionEntry<TParent extends Collection<any>> {
  parent: TParent;
  el: HTMLElement;
  config = new ConfigManager();

  constructor(
    parent: TParent,
    query: string | HTMLElement,
    options: Record<string, any> = {}
  ) {
    this.parent = parent;
    this.el = getElement(query);
    this.config.addConfigSource("parent", this.parent.config);
    this.config.addConfigSource("entry", options);
  }

  get id(): string {
    return this.el.id;
  }

  async init(options: Record<string, any> = {}) {
    this.config.apply(options);
  }

  async destroy() {
    // Remove all the owned properties from the entry
    Object.getOwnPropertyNames(this).forEach((prop) => {
      delete (this as any)[prop];
    });
  }
}
