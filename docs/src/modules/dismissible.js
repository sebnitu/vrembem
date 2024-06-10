document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-dismiss]");
  if (el) {
    const selector = el.getAttribute("data-dismiss");
    const result = el.closest(selector);
    if (result) result.classList.add("display-none");
  }
}, false);
