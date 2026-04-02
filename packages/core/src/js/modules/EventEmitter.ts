export type EventListener = (...args: any[]) => void | Promise<void>;

export interface EventEntry {
  listener: EventListener;
  args: any[];
}

export class EventEmitter {
  readonly events = new Map<string, EventEntry[]>();

  on(event: string, listener: EventListener, ...args: any[]): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    const entries = this.events.get(event)!;
    if (!entries.some((entry) => entry.listener === listener)) {
      entries.push({ listener, args });
    }
  }

  off(event: string, listenerRef: EventListener): void {
    const entries = this.events.get(event);
    if (!entries) return;
    this.events.set(
      event,
      entries.filter((entry) => entry.listener !== listenerRef)
    );
  }

  async emit(event: string, ...args: any[]): Promise<void> {
    event = event.startsWith("on")
      ? event.slice(2, 3).toLowerCase() + event.slice(3)
      : event;
    const entries = this.events.get(event);
    if (!entries) return;
    for (const { listener, args: listenerArgs } of entries) {
      await listener(...args, ...listenerArgs);
    }
  }
}
