// TODO: This needs to be refactored.
export async function applyInlineState(entry) {
  // console.log("applyInlineState()", entry.id);
  if (entry.store === "opened") {
    await entry.open(false, false);
  } else if (entry.store === "closed") {
    await entry.close(false, false);
  } else if (entry.store === "indeterminate") {
    if (entry.state != "indeterminate") {
      entry.setState("indeterminate");
    }
  } else {
    if (entry.state != entry.inlineState) {
      entry.setState(entry.inlineState);
    }
    if (entry.inlineState === "opened") {
      await entry.open(false, false);
    } else if (entry.inlineState === "closed") {
      await entry.close(false, false);
    }
  }
}
