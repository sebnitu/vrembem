import { getElement } from "./utilities";
import { ConfigManager } from "./modules";

export interface CollectionEntryConstructor<TEntry extends CollectionEntry> {
  new (parent: any, query: string | HTMLElement): TEntry;
}

export class CollectionEntry {
  parent: any;
  el: HTMLElement;
  config = new ConfigManager();

  constructor(parent: any, query: string | HTMLElement) {
    this.parent = parent;
    this.el = getElement(query);
    this.config.addConfigSource("parent", this.parent.config);
    this.config.addConfigSource("entry", {});
  }

  get id(): string {
    return this.el.id;
  }

  async destroy() {
    // Remove all the owned properties from the entry
    Object.getOwnPropertyNames(this).forEach((prop) => {
      delete (this as any)[prop];
    });
  }
}
