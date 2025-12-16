export class ConfigManager {
  #source: Record<string, any>;
  #sourceOrder: string[];

  constructor() {
    this.#source = {};
    this.#sourceOrder = [];
  }

  addConfigSource(key: string, config: Record<string, any>) {
    this.#sourceOrder.unshift(key);
    this.#source[key] = config;
  }

  removeConfigSource(key: string) {
    const index = this.#sourceOrder.indexOf(key);
    if (index !== -1) {
      this.#sourceOrder.splice(index, 1);
    }
    delete this.#source[key];
  }

  apply(config: Record<string, any>, key: string = "entry") {
    if (this.#source[key]) {
      Object.assign(this.#source[key], config);
    } else {
      throw new Error(`Config does not exist: ${key}`);
    }
  }

  get(key: string, options?: { fallback?: any; source?: string }) {
    const { fallback, source } = options ?? {};

    if (source) {
      const result = this.#source?.[source]?.[key];
      if (result !== undefined) {
        return result;
      }
    } else {
      for (const src of this.#sourceOrder) {
        const result = this.#source?.[src]?.[key];
        if (result !== undefined) {
          return result;
        }
      }
    }

    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error(`Config does not exist: ${key}`);
  }

  setSourceOrder(order: string[]) {
    const existingKeys = Object.keys(this.#source).reverse();
    const reordered = order.filter((key) => existingKeys.includes(key));
    for (const key of existingKeys) {
      if (!reordered.includes(key)) {
        reordered.push(key);
      }
    }
    return (this.#sourceOrder = reordered);
  }
}
