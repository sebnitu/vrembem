import { expect } from "vitest";
import { Collection } from "../../src/js/Collection";
import { mediaQuery } from "../../src/js/plugins";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    get matches() {
      return matches(query, window.innerWidth);
    },
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

function matches(query, value) {
  let queryValue = query.match(/\d+/)[0];
  if (query.includes("min")) return value > queryValue;
  if (query.includes("max")) return value < queryValue;
  return undefined;
}

function hasChanged(query, prev, next) {
  return (matches(query, prev) !== matches(query, next));
}

function resizeWindow(value, collection) {
  const prevValue = window.innerWidth;
  window.innerWidth = value;
  for (const entry of collection) {
    if (entry.mql && hasChanged(entry.mql.media, prevValue, value)) {
      entry.mql.onchange(entry.mql, entry);
    }
  }
  window.dispatchEvent(new Event("resize"));
}

document.body.style.setProperty("--breakpoint-md", "600px");
document.body.innerHTML = `
  <div class="entry" id="entry-1">One</div>
  <div class="entry" id="entry-2" data-breakpoint="900px">Two</div>
  <div class="entry" id="entry-3" data-breakpoint="md" data-media-query="(max-width: {{BP}})">Three</div>
`;

const collection = new Collection({
  selector: ".entry"
});

test("should register and setup the mediaQuery plugin on collection mount", async () => {
  window.innerWidth = 800;
  const spyFunction = vi.fn();
  expect(collection.plugins.length).toBe(0);
  await collection.mount({
    plugins: [
      mediaQuery({
        onChange: spyFunction
      })
    ]
  });
  expect(collection.plugins.length).toBe(1);
  expect(typeof collection.get("entry-1").mql).toBe("undefined");

  expect(collection.get("entry-2").mql.media).toBe("(min-width: 900px)");
  expect(typeof collection.get("entry-2").mql.onchange).toBe("function");
  expect(collection.get("entry-2").mql.matches).toBe(false);

  expect(collection.get("entry-3").mql.media).toBe("(max-width: 600px)");
  expect(typeof collection.get("entry-3").mql.onchange).toBe("function");
  expect(collection.get("entry-3").mql.matches).toBe(false);

  expect(spyFunction).toBeCalledTimes(2);

  resizeWindow(960, collection.collection);
  expect(collection.get("entry-2").mql.matches).toBe(true);
  expect(collection.get("entry-3").mql.matches).toBe(false);

  expect(spyFunction).toBeCalledTimes(3);

  resizeWindow(340, collection.collection);
  expect(collection.get("entry-2").mql.matches).toBe(false);
  expect(collection.get("entry-3").mql.matches).toBe(true);

  expect(spyFunction).toBeCalledTimes(5);
});

test("should undo the mediaQuery setup on collection unmount", async () => {
  const mql_1 = collection.get("entry-2").mql;
  const mql_2 = collection.get("entry-3").mql;
  await collection.unmount();
  expect(mql_1.onchange).toBe(null);
  expect(mql_2.onchange).toBe(null);  
});

test("should remove the mediaQuery plugin when the remove method is called", async () => {
  expect(collection.plugins.length).toBe(1);
  await collection.plugins.remove("mediaQuery");
  expect(collection.plugins.length).toBe(0);
});

test("should be able to apply settings in various ways", async () => {
  window.innerWidth = 500;
  const spyFunction = vi.fn();
  await collection.mount({
    plugins: [
      mediaQuery({
        breakpoints: {
          "entry-1": "333px",
          "md": "444px"
        },
        mediaQueries: {
          "entry-2": "(max-width: {{BP}})"
        },
        onChange: spyFunction
      })
    ]
  });

  expect(spyFunction).toBeCalledTimes(3);
  expect(collection.get("entry-1").mql.media).toBe("(min-width: 333px)");
  expect(collection.get("entry-2").mql.media).toBe("(max-width: 900px)");
  expect(collection.get("entry-3").mql.media).toBe("(max-width: 444px)");

  expect(collection.get("entry-1").mql.matches).toBe(true);
  expect(collection.get("entry-2").mql.matches).toBe(true);
  expect(collection.get("entry-3").mql.matches).toBe(false);

  resizeWindow(200, collection.collection);
  expect(collection.get("entry-1").mql.matches).toBe(false);
  expect(collection.get("entry-2").mql.matches).toBe(true);
  expect(collection.get("entry-3").mql.matches).toBe(true);

  resizeWindow(1000, collection.collection);
  expect(collection.get("entry-1").mql.matches).toBe(true);
  expect(collection.get("entry-2").mql.matches).toBe(false);
  expect(collection.get("entry-3").mql.matches).toBe(false);
});

test("should unmount the plugin when the unmount method is called", () => {
  const plugin = collection.plugins.find((plugin) => plugin.name === "mediaQuery");
  plugin.unmount(collection);
  expect(collection.get("entry-1").mql).toBe(null);
  expect(collection.get("entry-2").mql).toBe(null);
  expect(collection.get("entry-3").mql).toBe(null);
});

test("Should setup a default anonymous function on instantiation", () => {
  const plugin = mediaQuery();
  plugin.settings.onChange();
  expect(typeof plugin.settings.onChange).toBe("function");
});
