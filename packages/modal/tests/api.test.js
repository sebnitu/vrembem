import "@testing-library/jest-dom/vitest";
import { ModalCollection } from "../index";

const markup = `
  <main>
    <button data-modal-open="modal-default">Modal Default</button>
    <div id="modal-default" class="modal">
      <div class="modal__dialog">
        <button data-modal-close>Close</button>
      </div>
    </div>
  </main>
  <div class="modals"></div>
`;

const markupMulti = `
  <button>...</button>
  <div id="modal-1" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-2" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-3" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-4" class="modal"></div>
`;

const markupPreOpened = `
  <main>
    <button data-modal-open="modal-default">Modal Default</button>
    <div id="modal-default" class="modal is-opened">
      <div class="modal__dialog">
        <button data-modal-close>Close</button>
      </div>
    </div>
  </main>
  <div class="modals"></div>
`;

describe("mount() & unmount()", () => {
  let modals, entry, el, btnOpen;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modals = new ModalCollection();
    el = document.querySelector("#modal-default");
    btnOpen = document.querySelector("[data-modal-open]");
  });

  it("should mount the modal instance", async () => {
    modals.updateConfig({ transition: false });
    await modals.mount();
    entry = modals.get("modal-default");
    btnOpen.click();
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-opened");
  });

  it("should unmount the modal instance", async () => {
    await modals.unmount();
    expect(modals.collection.length).toBe(0);
    expect(el).toHaveClass("is-closed");
    btnOpen.click();
    expect(el).toHaveClass("is-closed");
  });
});

describe("register() & deregister()", () => {
  let modals, entry;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modals = new ModalCollection({
      teleport: ".modals"
    });
  });

  it("should register modal in the collection", async () => {
    expect(modals.collection.length).toBe(0);
    const result = await modals.register(
      await modals.createEntry("modal-default")
    );
    expect(modals.collection.length).toBe(1);

    entry = modals.get("modal-default");
    expect(result).toBe(entry);
    expect(entry.id).toBe("modal-default");
    expect(entry.state).toBe("closed");
  });

  it("should reject promise with error if register is called on non-existent modal", async () => {
    const result = await modals.createEntry("asdf").catch((error) => {
      return error.message;
    });
    expect(result).toBe('Element not found with ID: "asdf"');
  });

  it("should open and update global state if modal already has opened class", async () => {
    document.body.innerHTML = markupPreOpened;
    const main = document.querySelector("main");
    modals = new ModalCollection({
      selectorInert: "main",
      selectorOverflow: "body, main",
      teleport: ".modals"
    });
    await modals.mount();
    expect(document.body.style.overflow).toBe("hidden");
    expect(main.inert).toBe(true);
    expect(main.style.overflow).toBe("hidden");
    expect(modals.get("modal-default").state).toBe("opened");
  });

  it("re-registering a modal that is already open should retain the open state", async () => {
    document.body.innerHTML = markupPreOpened;
    modals = new ModalCollection({ teleport: ".modals" });
    await modals.mount();
    await modals.open("modal-default");
    expect(modals.active.id).toBe("modal-default");
    await modals.register(await modals.createEntry("modal-default"));
    expect(modals.active.id).toBe("modal-default");
  });

  it("should use the root modal element as dialog if selector returned null", async () => {
    document.body.innerHTML = markupMulti;
    modals = new ModalCollection();
    const entry = await modals.register(await modals.createEntry("modal-4"));
    expect(entry.el).toBe(entry.dialog);
  });
});

describe("open() & close()", () => {
  let modals, el, entry;

  beforeAll(async () => {
    document.body.innerHTML = markup;
    document
      .querySelector("#modal-default")
      .style.setProperty("--modal-transition-duration", "0.3s");
    modals = new ModalCollection();
    await modals.mount();
    el = document.querySelector(".modal");
    entry = modals.get("modal-default");
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should open modal", async () => {
    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");

    modals.open("modal-default");
    await vi.runAllTimers();

    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");
  });

  it("should do nothing if modal is already open", async () => {
    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");

    modals.open("modal-default");
    await vi.runAllTimers();

    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");
  });

  it("should close modal", async () => {
    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");

    modals.close();
    await vi.runAllTimers();

    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");
  });

  it("should do nothing if modal is already closed", async () => {
    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");

    modals.close("modal-default");
    await vi.runAllTimers();

    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");
  });

  it("should open and close modal with transitions option passed", async () => {
    await modals.open("modal-default", false);

    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");

    await modals.close("modal-default", false);

    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");
  });

  it("should reject promise with error if open is called on non-existent modal", async () => {
    let result;
    await modals.open("asdf").catch((error) => {
      result = error.message;
    });
    expect(result).toBe(
      'Modal entry not found in collection with id of "asdf"'
    );
  });

  it("should reject promise with error if close is called on non-existent modal", async () => {
    let result;
    await modals.close("asdf").catch((error) => {
      result = error.message;
    });
    expect(result).toBe(
      'Modal entry not found in collection with id of "asdf"'
    );
  });
});

describe("replace()", () => {
  beforeEach(() => {
    document.body.innerHTML = markupMulti;
    document.querySelectorAll(".modal").forEach((el) => {
      el.style.setProperty("--modal-transition-duration", "0.3s");
    });
    vi.useFakeTimers();
  });

  it("should close a modal and open a new one simultaneously", async () => {
    const modals = new ModalCollection();
    await modals.mount();

    let entry = modals.get("modal-1");

    modals.open("modal-1");
    expect(entry.el).toHaveClass("is-opening");
    expect(entry.state).toBe("opening");
    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");

    modals.replace("modal-2");
    await vi.runAllTimers();

    expect(entry.el).toHaveClass("is-closed");
    expect(entry.state).toBe("closed");

    entry = modals.get("modal-2");
    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");
  });

  it("should close all open modals except for the replacement", async () => {
    const modals = new ModalCollection();
    await modals.mount();

    modals.open("modal-1");
    modals.open("modal-2");
    modals.open("modal-3");
    modals.open("modal-4");

    await Promise.all(
      modals.collection.map(async () => {
        await vi.runAllTimers();
      })
    );

    expect(modals.stack.length).toBe(4);
    expect(modals.get("modal-1").state).toBe("opened");
    expect(modals.get("modal-2").state).toBe("opened");
    expect(modals.get("modal-3").state).toBe("opened");
    expect(modals.get("modal-4").state).toBe("opened");

    modals.replace("modal-2");

    await Promise.all(
      modals.collection.map(async () => {
        await vi.runAllTimers();
      })
    );

    expect(modals.stack.length).toBe(1);
    expect(modals.get("modal-1").state).toBe("closed");
    expect(modals.get("modal-2").state).toBe("opened");
    expect(modals.get("modal-3").state).toBe("closed");
    expect(modals.get("modal-4").state).toBe("closed");
  });

  it("should correctly handle focus management when focus param is passed", async () => {
    const modals = new ModalCollection({ transition: false });
    await modals.mount();
    await modals.open("modal-1");
    expect(document.activeElement).toBe(modals.get("modal-1").dialog);
    await modals.replace("modal-2");
    expect(document.activeElement).toBe(modals.get("modal-2").dialog);
  });

  it("should reject promise with error if replace is called on non-existent modal", async () => {
    const modals = new ModalCollection();
    let result;
    await modals.replace("asdf").catch((error) => {
      result = error.message;
    });
    expect(result).toBe(
      'Modal entry not found in collection with id of "asdf"'
    );
  });
});

describe("closeAll()", () => {
  beforeEach(() => {
    document.body.innerHTML = markupMulti;
    document.querySelectorAll(".modal").forEach((el) => {
      el.style.setProperty("--modal-transition-duration", "0.3s");
    });
    vi.useFakeTimers();
  });

  it("should close all open modals", async () => {
    const modals = new ModalCollection();
    await modals.mount();

    modals.open("modal-1");
    modals.open("modal-2");
    modals.open("modal-3");
    modals.open("modal-4");

    modals.collection.map(async (entry) => {
      expect(entry.el).toHaveClass("is-opening");
      expect(entry.state).toBe("opening");
    });

    await vi.runAllTimers();

    modals.collection.map(async (entry) => {
      expect(entry.el).toHaveClass("is-opened");
      expect(entry.state).toBe("opened");
    });

    modals.closeAll();

    modals.collection.map(async (entry) => {
      expect(entry.el).toHaveClass("is-closing");
      expect(entry.state).toBe("closing");
    });

    await vi.runAllTimers();

    modals.collection.map(async (entry) => {
      expect(entry.el).toHaveClass("is-closed");
      expect(entry.state).toBe("closed");
    });
  });

  it("should return focus to stored trigger when all modals are closed", async () => {
    const modals = new ModalCollection({ transition: false });
    await modals.mount();

    const btn = document.querySelector("button");
    modals.trigger = btn;

    await modals.open("modal-1");
    await modals.open("modal-2");
    await modals.open("modal-3");
    await modals.open("modal-4");

    modals.collection.map(async (entry) => {
      expect(entry.state).toBe("opened");
    });

    await modals.closeAll();

    expect(document.activeElement).toBe(btn);
  });

  it("should not handle focus when param is set to false", async () => {
    const modals = new ModalCollection({ transition: false });
    await modals.mount();

    const btn = document.querySelector("button");
    modals.trigger = btn;

    await modals.open("modal-1");
    await modals.open("modal-2");
    await modals.open("modal-3");
    await modals.open("modal-4");

    modals.collection.map(async (entry) => {
      expect(entry.state).toBe("opened");
    });

    await modals.closeAll("", false, false);

    expect(document.activeElement).toBe(document.body);
  });
});
