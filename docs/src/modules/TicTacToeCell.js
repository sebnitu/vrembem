import { CollectionEntry } from "@vrembem/core";

export class TicTacToeCell extends CollectionEntry {
  #state = "";

  constructor(...args) {
    super(...args);
    this.cellRef = this.el.getAttribute("data-cell");
  }

  get state() {
    return this.#state;
  }

  set state(value) {
    this.#state = value;
    this.el.innerText = value;
    this.parent.boardState[this.cellRef] = value;
  }

  toggle() {
    if (this.state === "" && !this.parent.winner) {
      this.state = this.parent.currentPlayer;
      this.parent.emit("afterTurn", this);
    }
  }

  reset() {
    this.el.classList.remove("is-winner");
    this.state = "";
  }

  onRegisterEntry() {
    this.el.addEventListener("click", this.toggle.bind(this));
    this.parent.on("reset", this.reset.bind(this));
  }
}
