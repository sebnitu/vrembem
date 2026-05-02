import { Collection, localStore } from "vrembem";

const defaults = {
  selector: "vb-tabs",
  storeKey: "VB:Tabs"
};

export class TabsCollection extends Collection {
  constructor(options) {
    super({ ...options, ...defaults });
    this.profile = localStore(this.config.storeKey);
  }

  onCreateEntry(entry) {
    entry.syncKey = entry.el.getAttribute("data-sync-key");
    entry.tabs = entry.el.querySelectorAll("[role='tab']");
  }

  onRegisterEntry(entry) {
    // Select the initial tab
    initialTab(entry);

    // Setup event listeners for tabs
    entry.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        selectTab(tab, entry);
      });

      const __handlerKeydown = handlerKeydown.bind(null, entry);

      tab.addEventListener("focus", () => {
        document.addEventListener("keydown", __handlerKeydown);
      });

      tab.addEventListener("blur", () => {
        document.removeEventListener("keydown", __handlerKeydown);
      });
    });
  }
}

function selectTab(active, entry, recursive = true) {
  // Run selectTab on all synced tabs
  if (entry.syncKey && recursive) {
    // Store the syncKey in local storage
    entry.parent.profile.set(entry.syncKey, getTabLabel(active));
    // Get all the entries with the same syncKey
    const syncedEntries = entry.parent.collection.filter(
      (item) => item.syncKey === entry.syncKey && item.id !== entry.id
    );
    syncedEntries.forEach((entry) => {
      selectTab(active, entry, false);
    });
  }

  // Select the active tab panel
  entry.tabs.forEach((tab) => {
    const tabpanel = document.querySelector(
      `#${tab.getAttribute("aria-controls")}`
    );
    if (getTabLabel(active) === getTabLabel(tab)) {
      tab.setAttribute("aria-selected", "true");
      tab.removeAttribute("tabindex");
      tabpanel.classList.add("is-active");
    } else {
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
      tabpanel.classList.remove("is-active");
    }
  });
}

function selectNextTab(entry) {
  let nextTab = document.activeElement.nextElementSibling;
  nextTab = nextTab ? nextTab : entry.tabs[0];
  selectTab(nextTab, entry);
  nextTab.focus();
}

function selectPrevTab(entry) {
  let prevTab = document.activeElement.previousElementSibling;
  prevTab = prevTab ? prevTab : entry.tabs[entry.tabs.length - 1];
  selectTab(prevTab, entry);
  prevTab.focus();
}

function handlerKeydown(entry, event) {
  switch (event.key) {
    case "Down":
    case "ArrowDown":
    case "Right":
    case "ArrowRight":
      event.preventDefault();
      selectNextTab(entry);
      break;
    case "Up":
    case "ArrowUp":
    case "Left":
    case "ArrowLeft":
      event.preventDefault();
      selectPrevTab(entry);
      break;
    default:
      return;
  }
}

function getTabLabel(tab) {
  return typeof tab !== "string" ? tab.textContent?.trim() : tab;
}

function initialTab(entry) {
  const storedValue = entry.syncKey
    ? entry.parent.profile.get(entry.syncKey)
    : null;
  selectTab(storedValue ?? entry.tabs[0], entry, false);
}
