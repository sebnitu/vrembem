import { Collection } from "../../src/js/Collection";
import { teleport } from "../../src/js/plugins";

document.body.innerHTML = `
  <main id="main">
    <div class="entry" id="entry-1">One</div>
    <div class="entry" id="entry-2">Two</div>
    <div class="entry" id="entry-3">Three</div>
  </main>
  <div id="entries"></div>
`;

const collection = new Collection({
  selector: ".entry"
});
const main = document.getElementById("main");
const container = document.getElementById("entries");

test("should register and setup the teleport plugin on collection mount", async () => {
  expect(collection.plugins.length).toBe(0);
  await collection.mount({
    plugins: [
      teleport({
        where: "#entries"
      })
    ]
  });
  expect(collection.plugins.length).toBe(1);
  const entry = collection.get("entry-1");
  expect(entry.id).toBe("entry-1");
  expect(typeof entry.teleport).toBe("function");
  expect(typeof entry.teleportReturn).toBe("function");
  expect(main.children.length).toBe(0);
  expect(container.children.length).toBe(3);
});

test("should be able to run teleport multiple times on an entry", async () => {
  const entry = collection.get("entry-1");
  expect(typeof entry.teleport).toBe("function");
  expect(typeof entry.teleportReturn).toBe("function");
  entry.teleport();
  entry.teleport();
  expect(main.children.length).toBe(0);
  expect(container.children.length).toBe(3);
});

test("should return teleported entries when collection is unmounted", async () => {
  expect(main.children.length).toBe(0);
  expect(container.children.length).toBe(3);
  await collection.unmount();
  expect(main.children.length).toBe(3);
  expect(container.children.length).toBe(0);
});

test("should unmount the teleport plugin entirely when the plugin is removed", async () => {
  await collection.mount();
  expect(main.children.length).toBe(0);
  expect(container.children.length).toBe(3);

  await collection.plugins.remove("teleport");
  expect(main.children.length).toBe(3);
  expect(container.children.length).toBe(0);

  const entry = collection.get("entry-1");
  expect(typeof entry.teleport).toBe("undefined");
  expect(typeof entry.teleportReturn).toBe("undefined");
});
