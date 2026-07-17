const checkboxes = document.querySelectorAll(
  "input[type='checkbox'][aria-checked='mixed']"
);
checkboxes.forEach((checkbox) => (checkbox.indeterminate = true));
