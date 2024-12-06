function selectTab(active, tabs) {
  tabs.forEach((tab) => {
    const tabpanel = document.querySelector(
      `#${tab.getAttribute("aria-controls")}`
    );
    if (active === tab) {
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

function selectNextTab(tabs) {
  let nextTab = document.activeElement.nextElementSibling;
  nextTab = nextTab ? nextTab : tabs[0];
  selectTab(nextTab, tabs);
  nextTab.focus();
}

function selectPrevTab(tabs) {
  let prevTab = document.activeElement.previousElementSibling;
  prevTab = prevTab ? prevTab : tabs[tabs.length - 1];
  selectTab(prevTab, tabs);
  prevTab.focus();
}

function handlerKeydown(tabs, event) {
  switch (event.key) {
    case "Down":
    case "ArrowDown":
    case "Right":
    case "ArrowRight":
      event.preventDefault();
      selectNextTab(tabs);
      break;
    case "Up":
    case "ArrowUp":
    case "Left":
    case "ArrowLeft":
      event.preventDefault();
      selectPrevTab(tabs);
      break;
    default:
      return;
  }
}

const tabs = {
  mount() {
    // Get all the tablists.
    const tablists = document.querySelectorAll('[role="tablist"]');
    tablists.forEach((tablist) => {
      const tabs = tablist.querySelectorAll('[role="tab"]');

      // Select the first tab.
      selectTab(tabs[0], tabs);

      // Setup event listeners for tabs.
      tabs.forEach((tab) => {
        const __handlerKeydown = handlerKeydown.bind(null, tabs);

        tab.addEventListener("click", () => {
          selectTab(tab, tabs);
        });

        tab.addEventListener("focus", () => {
          document.addEventListener("keydown", __handlerKeydown);
        });

        tab.addEventListener("blur", () => {
          document.removeEventListener("keydown", __handlerKeydown);
        });
      });
    });
  }
};

export { tabs };
