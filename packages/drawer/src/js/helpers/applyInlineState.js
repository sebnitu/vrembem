export async function applyInlineState(entry) {
  if (entry.store === "opened") {
    await entry.open(false, false);
  } else if (entry.store === "closed") {
    await entry.close(false, false);
  } else if (entry.store === "indeterminate") {
    if (entry.state != "indeterminate") {
      entry.state = "indeterminate";
    }
  } else {
    if (entry.state != entry.inlineState) {
      entry.state = entry.inlineState;
    }
    if (entry.inlineState === "opened") {
      await entry.open(false, false);
    } else if (entry.inlineState === "closed") {
      await entry.close(false, false);
    }
  }
}
