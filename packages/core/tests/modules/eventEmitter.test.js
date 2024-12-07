import { eventEmitter } from "../../src/js/modules";

// Create the base object to simulate a JavaScript plugin that the event emitter
// module can be assigned onto.
const baseObj = {
  events: {}
};
Object.assign(baseObj, eventEmitter);

describe("eventEmitter", () => {
  afterEach(() => {
    // Clear events after each test
    baseObj.events = {};
  });

  it("should add a listener to an event with on", () => {
    const mockListener = vi.fn();
    baseObj.on("testEvent", mockListener, "arg1", "arg2");

    expect(baseObj.events["testEvent"]).toHaveLength(1);
    expect(baseObj.events["testEvent"][0].listener).toBe(mockListener);
    expect(baseObj.events["testEvent"][0].args).toEqual(["arg1", "arg2"]);
  });

  it("should prevent duplicate listeners for the same event", () => {
    const mockListener = vi.fn();
    baseObj.on("testEvent", mockListener);
    baseObj.on("testEvent", mockListener); // Attempt to add a duplicate

    expect(baseObj.events["testEvent"]).toHaveLength(1);
  });

  it("should allow different listeners for the same event", () => {
    const listenerOne = vi.fn();
    const listenerTwo = vi.fn();
    baseObj.on("testEvent", listenerOne);
    baseObj.on("testEvent", listenerTwo);

    expect(baseObj.events["testEvent"]).toHaveLength(2);
    expect(baseObj.events["testEvent"][0].listener).toBe(listenerOne);
    expect(baseObj.events["testEvent"][1].listener).toBe(listenerTwo);
  });

  it("should remove a listener with off", () => {
    const mockListener = vi.fn();
    baseObj.on("testEvent", mockListener);
    baseObj.off("testEvent", mockListener);

    expect(baseObj.events["testEvent"]).toHaveLength(0);
  });

  it("should handle off when the event does not exist", () => {
    const mockListener = vi.fn();
    expect(() => baseObj.off("nonExistentEvent", mockListener)).not.toThrow();
  });

  it("should emit an event and call listeners with data and args", async () => {
    const mockListener = vi.fn();
    baseObj.on("testEvent", mockListener, "arg1", "arg2");

    await baseObj.emit("testEvent", "testData");

    expect(mockListener).toHaveBeenCalledWith("testData", "arg1", "arg2");
  });

  it("should not fail when emitting a non-existent event", async () => {
    await expect(
      baseObj.emit("nonExistentEvent", "testData")
    ).resolves.toBeUndefined();
  });

  it("should normalize event name and call correct listeners for each variant", async () => {
    const mountListener = vi.fn();
    const otherListener = vi.fn();
    baseObj.on("mount", mountListener);
    baseObj.on("register", otherListener);

    await baseObj.emit("onMount", "mountData");
    await baseObj.emit("onRegister", "registerData");

    expect(mountListener).toHaveBeenCalledWith("mountData");
    expect(otherListener).toHaveBeenCalledWith("registerData");
  });
});
