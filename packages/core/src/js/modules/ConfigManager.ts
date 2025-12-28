export class ConfigManager {
  #source: Record<string, Record<string, any>>;
  #sourceOrder: string[];

  constructor() {
    this.#source = {};
    this.#sourceOrder = [];
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

  set(
    keyOrConfig: string | Record<string, any>,
    config: Record<string, any> = {}
  ): Record<string, any> {
    let key: string;
    let value: Record<string, any>;

    if (typeof keyOrConfig === "string") {
      key = keyOrConfig;
      value = config;
    } else {
      key = "entry";
      value = keyOrConfig;
    }

    if (this.#source[key]) {
      Object.assign(this.#source[key], value);
    } else {
      this.#sourceOrder.unshift(key);
      this.#source[key] = value;
    }
    return this.#source[key];
  }

  remove(key: string) {
    const index = this.#sourceOrder.indexOf(key);
    if (index !== -1) {
      this.#sourceOrder.splice(index, 1);
    }
    delete this.#source[key];
  }

  setSourceOrder(order: string[]): string[] {
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
