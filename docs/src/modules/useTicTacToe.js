import { TicTacToe } from "./TicTacToe";

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
