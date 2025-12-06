import { Collection, CollectionEntry } from "@vrembem/core";

// Define a custom collection entry class
class TicTacToeCell extends CollectionEntry {
  #state = "";

  constructor(...args) {
    super(...args);
  }

  get state() {
    return this.#state;
  }

  set state(value) {
    this.#state = value;
    this.el.innerText = value;
  }

  toggle() {
    if (this.state === "") {
      this.state = this.parent.currentPlayer;
      this.parent.switchPlayer();
    }
  }

  onRegisterEntry() {
    this.el.addEventListener("click", this.toggle.bind(this));
  }
}

// Define our custom collection class
class TicTacToe extends Collection {
  constructor(options) {
    super(options);
    this.entryClass = TicTacToeCell;
    this.currentPlayer = "X";
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }
}

// Instantiate the collection and provide a collection selector
const ticTacToe = new TicTacToe({
  selector: ".tictactoe__cell"
});

// Mount the collection
window["ttt"] = await ticTacToe.mount();
