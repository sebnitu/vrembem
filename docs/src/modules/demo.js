// Get all the demo elements on the page.
const demos = document.querySelectorAll("[data-demo-target]");

// Loop through all the demo elements.
demos.forEach((demo) => {
  const output = document.getElementById(demo.getAttribute("data-demo-target"));
  const input = demo.closest(".code-example").querySelector(".code-block");
  if (output && input) {
    // Set the default selection.
    for (let i = 0; i < demo.options.length; i++) {
      if (output.classList.contains(demo.options[i].value)) {
        demo.selectedIndex = i;
        break;
      }
    }

    // Add change event listener.
    demo.addEventListener("change", () => {
      let oldValue = null;

      // Loop through all the possible demo options.
      for (let i = 0; i < demo.options.length; i++) {
        // Remove the classes from the output.
        output.classList.remove(demo.options[i].value);

        // Store the old value if it exists in the input html.
        if (input.innerHTML.includes(demo.options[i].value)) {
          oldValue = new RegExp(
            String.raw`\b(${demo.options[i].value})\b`, "g"
          );
        }
      };

      // Update the output and input with new values.
      output.classList.add(demo.value);
      input.innerHTML = input.innerHTML.replace(oldValue, demo.value);
    });
  }
});
