import { _ } from "@vrembem/core";
import {
  handleClick,
  handleTooltipClick,
  handleMouseEnter,
  handleMouseLeave
} from "./handlers";
import type { PopoverEntry } from "./PopoverEntry";

type EventBinding = {
  keys: ("el" | "trigger")[];
  events: string[];
  handler: (event: MouseEvent | Event) => void;
};

export function registerEventListeners(entry: PopoverEntry) {
  // If event listeners aren't already setup
  if (!_(entry).events.length) {
    // Add event listeners based on event type
    const eventType = entry.config.get("event");

    // If the event type is hover
    if (eventType === "hover") {
      // Setup event listeners object for hover
      _(entry).events = [
        {
          keys: ["el", "trigger"],
          events: ["mouseenter", "focus"],
          handler: handleMouseEnter.bind(entry.parent, entry)
        },
        {
          keys: ["el", "trigger"],
          events: ["mouseleave", "focusout"],
          handler: handleMouseLeave.bind(entry.parent, entry)
        },
        {
          keys: ["trigger"],
          events: ["click"],
          handler: handleTooltipClick.bind(null, entry)
        }
      ];

      // Loop through listeners and apply to the appropriate elements
      _(entry).events.forEach((eventObj: EventBinding) => {
        eventObj.keys.forEach((key) => {
          eventObj.events.forEach((event) => {
            const target = entry[key] as HTMLElement;
            target.addEventListener(event, eventObj.handler);
          });
        });
      });
    }

    // Else the event type is click
    else {
      // Setup event listeners object for click
      _(entry).events = [
        {
          keys: ["trigger"],
          events: ["click"],
          handler: handleClick.bind(entry.parent, entry)
        }
      ];

      // Loop through listeners and apply to the appropriate elements
      _(entry).events.forEach((eventObj: EventBinding) => {
        eventObj.keys.forEach((key) => {
          eventObj.events.forEach((event) => {
            const target = entry[key] as HTMLElement;
            target.addEventListener(event, eventObj.handler);
          });
        });
      });
    }
  }
}

export function deregisterEventListeners(entry: PopoverEntry) {
  // If event listeners have been setup
  if (_(entry).events) {
    // Loop through listeners and remove from the appropriate elements
    _(entry).events.forEach((eventObj: EventBinding) => {
      eventObj.keys.forEach((key) => {
        eventObj.events.forEach((event) => {
          const target = entry[key] as HTMLElement;
          target.removeEventListener(event, eventObj.handler);
        });
      });
    });

    // Remove eventListeners object from collection
    _(entry).events = [];
  }
}
