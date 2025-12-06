import { Collection, CollectionEntry } from "@vrembem/core";

// Define a custom collection entry class
class TicTacToeCell extends CollectionEntry {
  constructor(...args) {
    super(...args);
  }
}

// Define our custom collection class
class TicTacToe extends Collection {
  constructor(options) {
    super(options);
    this.entryClass = TicTacToeCell;
  }
}

// Instantiate the collection and provide a collection selector
const ticTacToe = new TicTacToe({
  selector: ".tictactoe__cell"
});

// Mount the collection
window["ttt"] = await ticTacToe.mount();
