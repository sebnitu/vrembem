import { FocusTrap } from "../../src/js/modules";
import { focusTrap } from "../../src/js/plugins";

vi.mock("../../src/js/modules", () => ({
  FocusTrap: vi.fn().mockImplementation(() => ({
    mount: vi.fn(),
    unmount: vi.fn(),
  })),
}));

describe("focusTrap Plugin", () => {
  let plugin;
  let parentMock;
  let entryMock;

  beforeEach(() => {
    FocusTrap.mockClear();

    plugin = focusTrap();

    parentMock = {
      on: vi.fn(),
      off: vi.fn(),
    };

    entryMock = {
      parent: parentMock,
      dialog: document.createElement("div"),
      focusTrap: null,
    };
  });

  it("returns a plugin object with default properties", () => {
    expect(plugin.name).toBe("focusTrap");
    expect(plugin.defaults).toEqual({ condition: true });
    expect(typeof plugin.setup).toBe("function");
    expect(typeof plugin.teardown).toBe("function");
    expect(typeof plugin.onCreateEntry).toBe("function");
  });

  describe("setup", () => {
    it("attaches 'opened' and 'closed' event listeners to the parent", () => {
      plugin.setup({ parent: parentMock });
      expect(parentMock.on).toHaveBeenCalledWith("opened", expect.any(Function), plugin);
      expect(parentMock.on).toHaveBeenCalledWith("closed", expect.any(Function), plugin);
    });
  });

  describe("teardown", () => {
    it("removes 'opened' and 'closed' event listeners from the parent", () => {
      plugin.teardown({ parent: parentMock });
      expect(parentMock.off).toHaveBeenCalledWith("opened", expect.any(Function));
      expect(parentMock.off).toHaveBeenCalledWith("closed", expect.any(Function));
    });
  });

  describe("setupFocusTrap", () => {
    it("mounts the focus trap if condition evaluates to true", () => {
      const mockPlugin = {
        settings: { condition: true },
      };

      plugin.setup({ parent: parentMock });

      entryMock.focusTrap = new FocusTrap();
      const setupFocusTrap = parentMock.on.mock.calls[0][1];

      setupFocusTrap(entryMock, mockPlugin);

      expect(entryMock.focusTrap.mount).toHaveBeenCalledWith(entryMock.dialog);
    });

    it("does not mount the focus trap if condition evaluates to false", () => {
      const mockPlugin = {
        settings: { condition: false },
      };

      plugin.setup({ parent: parentMock });

      entryMock.focusTrap = new FocusTrap();
      const setupFocusTrap = parentMock.on.mock.calls[0][1];

      setupFocusTrap(entryMock, mockPlugin);

      expect(entryMock.focusTrap.mount).not.toHaveBeenCalled();
    });
  });

  describe("teardownFocusTrap", () => {
    it("unmounts the focus trap if condition evaluates to true", () => {
      const mockPlugin = {
        settings: { condition: true },
      };

      plugin.setup({ parent: parentMock });

      entryMock.focusTrap = new FocusTrap();
      const teardownFocusTrap = parentMock.on.mock.calls[1][1];

      teardownFocusTrap(entryMock, mockPlugin);

      expect(entryMock.focusTrap.unmount).toHaveBeenCalled();
    });

    it("does not unmount the focus trap if condition evaluates to false", () => {
      const mockPlugin = {
        settings: { condition: false },
      };

      plugin.setup({ parent: parentMock });

      entryMock.focusTrap = new FocusTrap();
      const teardownFocusTrap = parentMock.on.mock.calls[1][1];

      teardownFocusTrap(entryMock, mockPlugin);

      expect(entryMock.focusTrap.unmount).not.toHaveBeenCalled();
    });
  });
});
