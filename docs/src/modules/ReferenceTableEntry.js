import { CollectionEntry } from "@vrembem/core";

export class ReferenceTableEntry extends CollectionEntry {
  constructor(...args) {
    super(...args);
    this.table = this.el.querySelector("table");
    this.filterInput = this.el.querySelector(".reference-table__filter");
    this.filterClearBtn = this.el.querySelector(".input-clear");
    this.notice = this.el.querySelector(".notice");
    this.keys = [];
    this.rows = this.table.querySelectorAll("tr");
    this.rows.forEach((el) => {
      this.keys.push({
        id: el.id,
        el: el
      });
    });
    this.clearHashBtns = this.el.querySelectorAll(".table-anchor-clear");
    this.clearHashBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.parent.clearHash();
      });
    });
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
      window.addEventListener("hashclear", () => {
        this.filterTable.call(this);
      });
    }
    if (this.config.get("expandable")) {
      console.log("Setup expandable functionality...");
    }
  }

  filterTable() {
    // Setup the variables
    let visible = 0;

    // Loop through table rows and hide those that don't match the search query
    for (let i = 0; i < this.rows.length; i++) {
      let td = this.rows[i].querySelector("td code");
      if (td) {
        let txtValue = td.innerText;
        if (txtValue.toUpperCase().trim().indexOf(this.filterValue) > -1) {
          this.rows[i].classList.remove("display-none");
          visible++;
        } else {
          if (!this.rows[i].classList.contains("is-active")) {
            this.rows[i].classList.add("display-none");
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

  checkActiveHash() {
    const result = this.keys.find((el) => {
      return `#${el.id}` === window.location.hash;
    });

    this.keys.forEach((item) => {
      item.el.classList.remove("is-active");
    });

    if (result) {
      result.el.classList.add("is-active");
      result.el.classList.remove("display-none");
    }
  }
}
