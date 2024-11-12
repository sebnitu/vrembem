import { eventEmitter } from "../../src/js/utilities/";

// Create a testable instance of the event emitter
const events = {
  events: {}
};
Object.assign(events, eventEmitter);

describe("eventEmitter", () => {
  afterEach(() => {
    // Clear events after each test
    events.events = {};
  });

  it("should add a listener to an event with on", () => {
    const mockListener = vi.fn();
    events.on("testEvent", mockListener, "arg1", "arg2");

    expect(events.events["testEvent"]).toHaveLength(1);
    expect(events.events["testEvent"][0].listener).toBe(mockListener);
    expect(events.events["testEvent"][0].args).toEqual(["arg1", "arg2"]);
  });

  it("should prevent duplicate listeners for the same event", () => {
    const mockListener = vi.fn();
    events.on("testEvent", mockListener);
    events.on("testEvent", mockListener); // Attempt to add a duplicate

    expect(events.events["testEvent"]).toHaveLength(1);
  });

  it("should allow different listeners for the same event", () => {
    const listenerOne = vi.fn();
    const listenerTwo = vi.fn();
    events.on("testEvent", listenerOne);
    events.on("testEvent", listenerTwo);

    expect(events.events["testEvent"]).toHaveLength(2);
    expect(events.events["testEvent"][0].listener).toBe(listenerOne);
    expect(events.events["testEvent"][1].listener).toBe(listenerTwo);
  });

  it("should remove a listener with off", () => {
    const mockListener = vi.fn();
    events.on("testEvent", mockListener);
    events.off("testEvent", mockListener);

    expect(events.events["testEvent"]).toHaveLength(0);
  });

  it("should handle off when the event does not exist", () => {
    const mockListener = vi.fn();
    expect(() => events.off("nonExistentEvent", mockListener)).not.toThrow();
  });

  it("should emit an event and call listeners with data and args", async () => {
    const mockListener = vi.fn();
    events.on("testEvent", mockListener, "arg1", "arg2");

    await events.emit("testEvent", "testData");

    expect(mockListener).toHaveBeenCalledWith("testData", "arg1", "arg2");
  });

  it("should await async listeners when emitting an event", async () => {
    const asyncListener = vi.fn().mockResolvedValueOnce("done");
    events.on("testEvent", asyncListener);

    await events.emit("testEvent", "testData");

    expect(asyncListener).toHaveBeenCalledWith("testData");
  });

  it("should not fail when emitting a non-existent event", async () => {
    await expect(events.emit("nonExistentEvent", "testData")).resolves.toBeUndefined();
  });

  it("should normalize event name by removing 'on' prefix in emit", async () => {
    const mockListener = vi.fn();
    events.on("mount", mockListener);

    await events.emit("onMount", "testData");

    expect(mockListener).toHaveBeenCalledWith("testData");
  });

  it("should normalize event name and call correct listeners for each variant", async () => {
    const mountListener = vi.fn();
    const otherListener = vi.fn();
    events.on("mount", mountListener);
    events.on("register", otherListener);

    await events.emit("onMount", "mountData");
    await events.emit("onRegister", "registerData");

    expect(mountListener).toHaveBeenCalledWith("mountData");
    expect(otherListener).toHaveBeenCalledWith("registerData");
  });
});
