import { CollectionEntry } from "@vrembem/core";

export class ReferenceTableEntry extends CollectionEntry {
  constructor(...args) {
    super(...args);
    this.table = this.el.querySelector("table");
    this.filterInput = this.el.querySelector(".reference-table__filter");
    this.filterClearBtn = this.el.querySelector(".input-clear");
    this.notice = this.el.querySelector(".notice");
  }

  get filterValue() {
    return this.filterInput.value.toUpperCase().trim();
  }

  onRegisterEntry() {
    if (this.config.get("filter")) {
      this.filterInput.addEventListener("input", this.filterTable.bind(this));
      this.filterClearBtn.addEventListener(
        "click",
        this.clearFilter.bind(this)
      );
    }
    if (this.config.get("expandable")) {
      console.log("Setup expandable functionality...");
    }
  }

  filterTable() {
    // Setup the variables
    const rows = this.table.querySelectorAll("tr");
    let visible = 0;

    // Loop through table rows and hide those that don't match the search query
    for (let i = 0; i < rows.length; i++) {
      let td = rows[i].querySelector("td code");
      if (td) {
        let txtValue = td.innerText;
        if (txtValue.toUpperCase().trim().indexOf(this.filterValue) > -1) {
          rows[i].classList.remove("display-none");
          visible++;
        } else {
          if (!rows[i].classList.contains("is-active")) {
            rows[i].classList.add("display-none");
          } else {
            visible++;
          }
        }
      }
    }

    // Toggle the clear input button
    if (this.filterValue) {
      // Scroll to the top of the reference table
      this.scrollToTable();
      this.filterClearBtn.classList.remove("display-none");
    } else {
      this.filterClearBtn.classList.add("display-none");
    }

    // Toggle the notice if no items are displayed
    if (visible) {
      this.notice.classList.add("display-none");
    } else {
      this.notice.classList.remove("display-none");
    }
  }

  clearFilter() {
    const id = this.filterClearBtn.dataset.clear;
    const input = document.getElementById(id);
    if (input) {
      input.value = "";
      input.dispatchEvent(new Event("input"));
      input.focus();
    }
  }

  scrollToTable() {
    const rect = this.el.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const navibar = document.querySelector(".navibar");
    const offset = navibar ? navibar.offsetHeight : 0;
    window.scrollTo({
      top: rect.top + scrollTop - offset,
      behavior: "instant"
    });
  }
}
