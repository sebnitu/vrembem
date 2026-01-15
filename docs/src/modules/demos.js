import { TicTacToe } from "./TicTacToe";
import { Collection, propStore } from "@vrembem/core";

// TicTacToe example
// ---
const ticTacToe1 = new TicTacToe({
  selector: "#ttt-1 .tictactoe__cell",
  selectorReset: "#ttt-1 .tictactoe-reset"
});

const ticTacToe2 = new TicTacToe({
  selector: "#ttt-2 .tictactoe__cell",
  selectorReset: "#ttt-2 .tictactoe-reset"
});

window["ttt1"] = await ticTacToe1.mount();
window["ttt2"] = await ticTacToe2.mount();

// propStore example
// ---
const inputs = new Collection({
  selector: ".input-store",
  plugins: [
    propStore({
      prop: "value",
      onChange({ entry }, newValue) {
        entry.el.value = newValue;
      }
    })
  ]
});

await inputs.mount();

inputs.collection.forEach((entry) => {
  entry.el.addEventListener("input", (event) => {
    entry.value = event.target.value;
  });
});
