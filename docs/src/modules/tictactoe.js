import { Collection } from "@vrembem/core";

// Define our custom collection class
class TicTacToe extends Collection {
  constructor(options) {
    super(options);
  }
}

// Instantiate the collection and provide a collection selector
const ticTacToe = new TicTacToe({
  selector: ".tictactoe__cell"
});

// Mount the collection
window["ttt"] = await ticTacToe.mount();
