// Get all the demo elements on the page.
const demos = document.querySelectorAll("[data-demo-target]");

// Loop through all the demo elements.
demos.forEach((demo) => {
  const output = document.getElementById(demo.getAttribute("data-demo-target"));
  const input = demo.closest(".code-example").querySelector(".code-block");
  if (output && input) {
    if (demo.tagName == "FORM") {
      handleForm(demo, input, output);
    } else {
      handleInput(demo, input, output);
    }
  }
});

function handleForm(demo, input, output) {
  // Store the base output classes.
  const baseClasses = output.className;

  // Update the demo with current form values.
  updateDemo(demo, input, output, baseClasses);

  // Setup event listeners on form elements.
  for (let i = 0; i < demo.elements.length; i++) {
    demo.elements[i].addEventListener("change", () => {
      // Update the demo when form data changes.
      updateDemo(demo, input, output, baseClasses);
    });
  }
}

function getFormClasses(form, classes = "") {
  // Loop through the form elements.
  for (let i = 0; i < form.elements.length; i++) {
    // If the element has a value, store it in the classes var.
    if (form.elements[i].value) {
      classes += ` ${form.elements[i].value}`;
    }
  }
  // Return the trimmed classes string.
  return classes.trim();
}

function updateDemo(demo, input, output, baseClasses) {
  // Get the form classes.
  const classes = getFormClasses(demo);
  // Store the previous class selection but remove the base.
  const prevClasses = output.className.replace(baseClasses, "").trim();
  // Clear output classes.
  output.className = "";
  // Add new classes (as array) with base classes to output.
  output.classList.add(...`${baseClasses} ${classes}`.trim().split(" "));
  // Add new classes to input.
  input.innerHTML = input.innerHTML.replace(`"${prevClasses}"`, `"${classes}"`);
}

function handleInput(demo, input, output) {
  // Set the default selection.
  for (let i = 0; i < demo.options.length; i++) {
    let classes = demo.options[i].value.split(" ");
    if (
      demo.options[i].text != "None" &&
      output.classList.contains(classes.at(-1))
    ) {
      demo.selectedIndex = i;
      break;
    }
  }

  // Add change event listener.
  demo.addEventListener("change", () => {
    let oldValue = null;

    // Loop through all the possible demo options.
    for (let i = 0; i < demo.options.length; i++) {
      // Convert the options value into classes list.
      let classes = demo.options[i].value.split(" ");

      // Remove the last class from the output.
      output.classList.remove(classes.at(-1));

      // Store the old value if it exists in the input html.
      if (input.innerHTML.includes(demo.options[i].value)) {
        oldValue = new RegExp(String.raw`\b(${demo.options[i].value})\b`, "g");
      }
    }

    // Update the output and input with new values.
    output.classList.add(...demo.value.split(" "));
    input.innerHTML = input.innerHTML.replace(oldValue, demo.value);
  });
}
