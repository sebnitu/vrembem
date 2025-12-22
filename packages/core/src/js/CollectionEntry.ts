import { getElement } from "./utilities";
import { ConfigManager } from "./modules";

export interface CollectionEntryConstructor<TEntry extends CollectionEntry> {
  new(parent: any, query: string | HTMLElement): TEntry;
}

export class CollectionEntry {
  parent: any;
  el: HTMLElement;
  id: string;
  config = new ConfigManager();

  constructor(parent: any, query: string | HTMLElement) {
    this.parent = parent;
    this.el = getElement(query);
    this.id = this.el.id;
    this.config.set("parent", this.parent.config);
    this.config.set("entry", {});
  }
}
