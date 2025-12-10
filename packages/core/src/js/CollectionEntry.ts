import { getCustomProps, getConfig } from "./helpers";
import { getDataConfig, getElement } from "./utilities";
import type { Collection } from "./Collection";

export class CollectionEntry<TParent extends Collection<any>> {
  parent: TParent;
  el: HTMLElement;
  config: Record<string, any>;
  dataConfig: Record<string, any>;
  customProps: Record<string, any>;

  constructor(
    parent: TParent,
    query: string | HTMLElement,
    options: Record<string, any> = {}
  ) {
    this.parent = parent;
    this.el = getElement(query);
    this.config = { ...options };
    this.dataConfig = {};
    this.customProps = {};
  }

  get id(): string {
    return this.el.id;
  }

  applyConfig(options: Record<string, any>) {
    return Object.assign(this.config, options);
  }

  getConfig(
    key: string,
    options?: {
      fallback?: any;
      props?: string[];
    }
  ) {
    return getConfig.call(this, key, options);
  }

  buildDataConfig() {
    return Object.assign(
      this.dataConfig,
      getDataConfig(this.el, this.getConfig("dataConfig"))
    );
  }

  buildCustomProps() {
    return Object.assign(this.customProps, getCustomProps(this));
  }

  async init(options: Record<string, any> = {}) {
    // Apply config with passed options
    this.applyConfig(options);

    // Build the data attribute and custom property config objects
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
