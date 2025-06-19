import { getCustomProps, getSetting } from "./helpers";
import { getDataConfig, getElement } from "./utilities";
import type { Collection } from "./Collection";

export class CollectionEntry<TParent extends Collection<any>> {
  parent: TParent;
  el: HTMLElement;
  settings: Record<string, any>;
  dataConfig: Record<string, any>;
  customProps: Record<string, any>;

  constructor(
    parent: TParent,
    query: string | HTMLElement,
    options: Record<string, any> = {}
  ) {
    this.parent = parent;
    this.el = getElement(query);
    this.settings = { ...options };
    this.dataConfig = {};
    this.customProps = {};
  }

  get id(): string | undefined {
    return this.el?.id;
  }

  applySettings(options: Record<string, any>) {
    return Object.assign(this.settings, options);
  }

  getSetting(key: string, options?: any) {
    return getSetting.call(this, key, options);
  }

  buildDataConfig() {
    return Object.assign(
      this.dataConfig,
      getDataConfig(this.el, this.getSetting("dataConfig"))
    );
  }

  buildCustomProps() {
    return Object.assign(this.customProps, getCustomProps(this));
  }

  async init(options: Record<string, any> = {}) {
    // Throw an error if the element for this entry was not found
    if (this.el === null) {
      throw new Error(
        `${this.parent.module ?? "Unknown"} element was not found with ID: "${this.id}"`
      );
    }

    // Apply settings with passed options
    this.applySettings(options);

    // Build the data attribute and custom property setting objects
    this.buildDataConfig();
    this.buildCustomProps();
  }

  async destroy() {
    // Remove all the owned properties from the entry
    Object.getOwnPropertyNames(this).forEach((prop) => {
      delete (this as any)[prop];
    });
  }
}
