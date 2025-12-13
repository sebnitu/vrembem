export type EventListener = (...args: any[]) => void | Promise<void>;

export interface EventEntry {
  listener: EventListener;
  args: any[];
}

export interface EventMap {
  [event: string]: EventEntry[];
}

export class EventEmitter {
  readonly events: EventMap = {};

  on(event: string, listener: EventListener, ...args: any[]): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    const listenerExists = this.events[event].some(
      (entry) => entry.listener === listener
    );
    if (!listenerExists) {
      this.events[event].push({ listener, args });
    }
  }

  off(event: string, listenerRef: EventListener): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(
      (entry) => entry.listener !== listenerRef
    );
  }

  async emit(event: string, ...args: any[]): Promise<void> {
    event = event.startsWith("on")
      ? event.slice(2, 3).toLowerCase() + event.slice(3)
      : event;
    if (!this.events[event]) return;
    for (const { listener, args: listenerArgs } of this.events[event]) {
      await listener(...args, ...listenerArgs);
    }
  }
}
