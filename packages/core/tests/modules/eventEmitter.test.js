import { EventEmitter } from "../../src/js/modules";

describe("EventEmitter", () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it("should add a listener to an event with on", () => {
    const mockListener = vi.fn();
    emitter.on("testEvent", mockListener, "arg1", "arg2");

    expect(emitter["events"]["testEvent"]).toHaveLength(1);
    expect(emitter["events"]["testEvent"][0].listener).toBe(mockListener);
    expect(emitter["events"]["testEvent"][0].args).toEqual(["arg1", "arg2"]);
  });

  it("should prevent duplicate listeners for the same event", () => {
    const mockListener = vi.fn();
    emitter.on("testEvent", mockListener);
    emitter.on("testEvent", mockListener); // Attempt to add a duplicate

    expect(emitter["events"]["testEvent"]).toHaveLength(1);
  });

  it("should allow different listeners for the same event", () => {
    const listenerOne = vi.fn();
    const listenerTwo = vi.fn();
    emitter.on("testEvent", listenerOne);
    emitter.on("testEvent", listenerTwo);

    expect(emitter["events"]["testEvent"]).toHaveLength(2);
    expect(emitter["events"]["testEvent"][0].listener).toBe(listenerOne);
    expect(emitter["events"]["testEvent"][1].listener).toBe(listenerTwo);
  });

  it("should remove a listener with off", () => {
    const mockListener = vi.fn();
    emitter.on("testEvent", mockListener);
    emitter.off("testEvent", mockListener);

    expect(emitter["events"]["testEvent"]).toHaveLength(0);
  });

  it("should handle off when the event does not exist", () => {
    const mockListener = vi.fn();
    expect(() => emitter.off("nonExistentEvent", mockListener)).not.toThrow();
  });

  it("should emit an event and call listeners with data and args", async () => {
    const mockListener = vi.fn();
    emitter.on("testEvent", mockListener, "arg1", "arg2");

    await emitter.emit("testEvent", "testData");

    expect(mockListener).toHaveBeenCalledWith("testData", "arg1", "arg2");
  });

  it("should not fail when emitting a non-existent event", async () => {
    await expect(
      emitter.emit("nonExistentEvent", "testData")
    ).resolves.toBeUndefined();
  });

  it("should normalize event name and call correct listeners for each variant", async () => {
    const mountListener = vi.fn();
    const otherListener = vi.fn();
    emitter.on("mount", mountListener);
    emitter.on("register", otherListener);

    await emitter.emit("onMount", "mountData");
    await emitter.emit("onRegister", "registerData");

    expect(mountListener).toHaveBeenCalledWith("mountData");
    expect(otherListener).toHaveBeenCalledWith("registerData");
  });
});
