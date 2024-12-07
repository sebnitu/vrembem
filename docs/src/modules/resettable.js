const saves = [];
const btns = document.querySelectorAll("[data-reset]");

// Build the saves array
btns.forEach((btn) => {
  const value = btn.getAttribute("data-reset");
  const result = document.getElementById(`${value}`);
  if (result) {
    const html = result.innerHTML;
    saves.push({
      id: result.id,
      data: html
    });
  }
});

// Add event listener for reset button clicks
document.addEventListener(
  "click",
  (event) => {
    const el = event.target.closest("[data-reset]");
    if (el) {
      const save = saves.find(
        (item) => item.id === el.getAttribute("data-reset")
      );
      const result = document.querySelector(`#${save.id}`);
      if (result) {
        el.disabled = true;
        el.classList.add("is-loading");
        result.innerHTML = save.data;
        result.classList.add("updated");
        setTimeout(() => {
          result.classList.remove("updated");
          el.disabled = false;
          el.classList.remove("is-loading");
        }, 600);
      }
    }
  },
  false
);
