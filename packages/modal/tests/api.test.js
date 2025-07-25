import "@testing-library/jest-dom";
import { delay } from "./helpers/delay";
import { transition } from "./helpers/transition";
import Modal from "../index";

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

describe("init() & destroy()", () => {
  let modal, entry, el, btnOpen;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = new Modal();
    el = document.querySelector("#modal-default");
    btnOpen = document.querySelector("[data-modal-open]");
  });

  it("should initialize the modal instance", async () => {
    await modal.init({ transition: false });
    entry = modal.get("modal-default");
    btnOpen.click();
    await delay();
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-opened");
  });

  it("should destroy the modal instance", async () => {
    await modal.destroy();
    expect(modal.collection.length).toBe(0);
    expect(el).toHaveClass("is-closed");
    btnOpen.click();
    await delay();
    expect(el).toHaveClass("is-closed");
  });

  it("should initialize the modal instance with event listeners disabled", async () => {
    const spy = jest.spyOn(modal, "initEventListeners");
    await modal.init({
      eventListeners: false,
      transition: false
    });
    expect(modal.settings.eventListeners).toBe(false);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should destroy the modal instance with event listeners disabled", async () => {
    const spy = jest.spyOn(modal, "destroyEventListeners");
    expect(modal.settings.eventListeners).toBe(false);
    await modal.destroy();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("initEventListeners() & destroyEventListeners()", () => {
  let modal, entry, btnOpen, btnClose;

  beforeAll(async () => {
    document.body.innerHTML = markup;
    modal = new Modal({
      eventListeners: false,
      transition: false
    });
    await modal.init();
    entry = modal.get("modal-default");
    btnOpen = document.querySelector("[data-modal-open]");
    btnClose = document.querySelector("[data-modal-close]");
  });

  it("should initialize event listeners", async () => {
    modal.initEventListeners();
    btnOpen.click();
    await delay();
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-opened");
  });

  it("should destroy event listeners", async () => {
    modal.destroyEventListeners();
    btnClose.click();
    await delay();
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-opened");
  });
});

describe("register() & deregister()", () => {
  let modal, entry;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = new Modal({
      teleport: ".modals"
    });
  });

  it("should register modal in the collection", async () => {
    expect(modal.collection.length).toBe(0);
    const result = await modal.register("modal-default");
    expect(modal.collection.length).toBe(1);

    entry = modal.get("modal-default");
    expect(result).toBe(entry);
    expect(entry.id).toBe("modal-default");
    expect(entry.state).toBe("closed");
  });

  it("should deregister modal from the collection", async () => {
    expect(modal.collection.length).toBe(1);
    const result = await modal.deregister("modal-default");
    expect(modal.collection.length).toBe(0);
    expect(entry).toEqual({});
    expect(result).toBe(modal.collection);
  });

  it("should reject promise with error if register is called on non-existent modal", async () => {
    let result;
    await modal.register("asdf").catch((error) => {
      result = error.message;
    });
    expect(result).toBe("No modal elements found using the ID: \"asdf\".");
  });

  it("should return collection if deregister is run non-existent modal", async () => {
    const result = await modal.deregister("asdf");
    expect(result).toBe(modal.collection);
  });

  it("should open and update global state if modal already has opened class", async () => {
    document.body.innerHTML = markupPreOpened;
    const main = document.querySelector("main");
    modal = new Modal({
      selectorInert: "main",
      selectorOverflow: "body, main",
      teleport: ".modals"
    });
    await modal.init();
    expect(document.body.style.overflow).toBe("hidden");
    expect(main.inert).toBe(true);
    expect(main.style.overflow).toBe("hidden");
    expect(modal.get("modal-default").state).toBe("opened");
  });

  it("re-registering a modal that is already open should retain the open state", async () => {
    document.body.innerHTML = markupPreOpened;
    modal = new Modal({ teleport: ".modals" });
    await modal.init();
    await modal.open("modal-default");
    expect(modal.active.id).toBe("modal-default");
    await modal.register("modal-default");
    expect(modal.active.id).toBe("modal-default");
  });
});

describe("open() & close()", () => {
  let modal, el, entry;

  beforeAll(async () => {
    document.body.innerHTML = markup;
    modal = new Modal();
    await modal.init();
    el = document.querySelector(".modal");
    entry = modal.get("modal-default");
  });

  it("should open modal", async () => {
    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");

    modal.open("modal-default");
    await transition(el);

    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");
  });

  it("should do nothing if modal is already open", async () => {
    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");

    modal.open("modal-default");
    await transition(el);

    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");
  });

  it("should close modal", async () => {
    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");

    modal.close();
    await transition(el);

    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");
  });

  it("should do nothing if modal is already closed", async () => {
    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");

    modal.close("modal-default");
    await transition(el);

    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");
  });

  it("should open and close modal with transitions option passed", async () => {
    await modal.open("modal-default", false);

    expect(el).toHaveClass("modal is-opened");
    expect(entry.state).toBe("opened");

    await modal.close("modal-default", false);

    expect(el).toHaveClass("modal is-closed");
    expect(entry.state).toBe("closed");
  });

  it("should run function when promise is returned from open api", async () => {
    let callbackCheck = false;

    modal.open("modal-default").then(() => {
      callbackCheck = true;
    });

    await transition(el);
    expect(callbackCheck).toBe(true);
  });

  it("should run function when promise is returned from close api", async () => {
    let callbackCheck = false;

    modal.close().then(() => {
      callbackCheck = true;
    });

    await transition(el);
    expect(callbackCheck).toBe(true);
  });

  it("should reject promise with error if open is called on non-existent modal", async () => {
    let result;
    await modal.open("asdf").catch((error) => {
      result = error.message;
    });
    expect(result).toBe("Modal not found in collection with id of \"asdf\".");
  });

  it("should reject promise with error if close is called on non-existent modal", async () => {
    let result;
    await modal.close("asdf").catch((error) => {
      result = error.message;
    });
    expect(result).toBe("Modal not found in collection with id of \"asdf\".");
  });
});

describe("replace()", () => {
  it("should close a modal and open a new one simultaneously", async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal();
    await modal.init();

    let entry = modal.get("modal-1");

    modal.open("modal-1");
    expect(entry.el).toHaveClass("is-opening");
    expect(entry.state).toBe("opening");
    await transition(entry.el);
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");

    modal.replace("modal-2");
    await transition(entry.el);

    expect(entry.el).toHaveClass("is-closed");
    expect(entry.state).toBe("closed");

    entry = modal.get("modal-2");
    await transition(entry.el);
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");
  });

  it("should close all open modals except for the replacement", async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal();
    await modal.init();

    modal.open("modal-1");
    modal.open("modal-2");
    modal.open("modal-3");

    await Promise.all(modal.collection.map(async (entry) => {
      await transition(entry.el);
    }));

    expect(modal.stack.value.length).toBe(3);
    expect(modal.get("modal-1").state).toBe("opened");
    expect(modal.get("modal-2").state).toBe("opened");
    expect(modal.get("modal-3").state).toBe("opened");

    modal.replace("modal-2");

    await Promise.all(modal.collection.map(async (entry) => {
      await transition(entry.el);
    }));

    expect(modal.stack.value.length).toBe(1);
    expect(modal.get("modal-1").state).toBe("closed");
    expect(modal.get("modal-2").state).toBe("opened");
    expect(modal.get("modal-3").state).toBe("closed");
  });

  it("should correctly handle focus management when focus param is passed", async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal({ transition: false });
    await modal.init();

    const entry = modal.get("modal-2");

    await modal.open("modal-1");
    await modal.replace("modal-2");

    expect(document.activeElement).toBe(entry.dialog);

    await modal.open("modal-1");
    await modal.replace("modal-2", false, false);

    expect(document.activeElement).toBe(document.body);
  });

  it("should reject promise with error if replace is called on non-existent modal", async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal();
    let result;
    await modal.replace("asdf").catch((error) => {
      result = error.message;
    });
    expect(result).toBe("Modal not found in collection with id of \"asdf\".");
  });
});

describe("closeAll()", () => {
  it("should close all open modals", async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal();
    await modal.init();

    modal.open("modal-1");
    modal.open("modal-2");
    modal.open("modal-3");

    await Promise.all(modal.collection.map(async (entry) => {
      expect(entry.el).toHaveClass("is-opening");
      expect(entry.state).toBe("opening");
      await transition(entry.el);
      expect(entry.el).toHaveClass("is-opened");
      expect(entry.state).toBe("opened");
    }));

    modal.closeAll();

    await Promise.all(modal.collection.map(async (entry) => {
      expect(entry.el).toHaveClass("is-closing");
      expect(entry.state).toBe("closing");
      await transition(entry.el);
      expect(entry.el).toHaveClass("is-closed");
      expect(entry.state).toBe("closed");
    }));
  });

  it("should return focus to stored trigger when all modals are closed", async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal({ transition: false });
    await modal.init();

    const btn = document.querySelector("button");
    modal.trigger = btn;

    await modal.open("modal-1");
    await modal.open("modal-2");
    await modal.open("modal-3");

    modal.collection.map(async (entry) => {
      expect(entry.state).toBe("opened");
    });

    await modal.closeAll();

    expect(document.activeElement).toBe(btn);
  });

  it("should not handle focus when param is set to false", async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal({ transition: false });
    await modal.init();

    const btn = document.querySelector("button");
    modal.trigger = btn;

    await modal.open("modal-1");
    await modal.open("modal-2");
    await modal.open("modal-3");

    modal.collection.map(async (entry) => {
      expect(entry.state).toBe("opened");
    });

    await modal.closeAll(false, false, false);

    expect(document.activeElement).toBe(document.body);
  });
});
