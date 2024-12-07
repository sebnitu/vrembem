const els = document.querySelectorAll("[data-vp-width]");

if (els.length) {
  update(els);
  window.addEventListener("resize", function () {
    update(els);
  });
}

function update(els) {
  const vpw = window.innerWidth;
  els.forEach((el) => {
    el.innerText = `${vpw}px`;
  });
}
