import { StackArray } from "../../src/js/modules/StackArray";

function createEntry(id) {
  const el = document.createElement("div");
  el.style.zIndex = "";
  return { id, el };
}

describe("StackArray", () => {
  let stack;
  let onChange;

  beforeEach(() => {
    onChange = vi.fn();
    stack = new StackArray({ onChange });
  });

  it("should add entries and call onChange", () => {
    const entry = createEntry("a");
    stack.add(entry);
    expect(stack.length).toBe(1);
    expect(stack.top).toBe(entry);
    expect(onChange).toHaveBeenCalled();
  });

  it("should remove entries and call onChange", () => {
    const entry = createEntry("a");
    stack.add(entry);
    stack.remove(entry);
    expect(stack.length).toBe(0);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(entry.el.style.zIndex).toBe("");
  });

  it("should move entry to top", () => {
    const a = createEntry("a");
    const b = createEntry("b");
    stack.add(a);
    stack.add(b);
    stack.moveToTop(a);
    expect(stack.top).toBe(a);
  });

  it("should return the top entry", () => {
    const a = createEntry("a");
    const b = createEntry("b");
    stack.add(a);
    stack.add(b);
    expect(stack.top).toBe(b);
    stack.remove(b);
    expect(stack.top).toBe(a);
    stack.remove(a);
    expect(stack.top).toBeNull();
  });

  it("should return a copy of the stack", () => {
    const a = createEntry("a");
    stack.add(a);
    const copy = stack.copy;
    expect(copy).not.toBe(stack);
    expect(copy[0]).toBe(a);
  });

  it("should update zIndex in updateIndex", () => {
    const a = createEntry("a");
    const b = createEntry("b");
    stack.add(a);
    stack.add(b);
    // Set initial z-index
    a.el.style.zIndex = "10";
    b.el.style.zIndex = "20";
    stack.updateIndex();
    expect(a.el.style.zIndex).not.toBe("10");
    expect(b.el.style.zIndex).not.toBe("20");
  });
});
