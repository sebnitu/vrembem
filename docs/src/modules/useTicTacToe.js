import { TicTacToe } from "./TicTacToe";

const ticTacToe = new TicTacToe({
  selector: ".tictactoe__cell",
  selectorReset: ".tictactoe-reset"
});

window["ttt"] = await ticTacToe.mount();
