import { Collection } from "@vrembem/core";
import { TicTacToeCell } from "./TicTacToeCell";

export class TicTacToe extends Collection {
  constructor(options) {
    super(options);
    this.entryClass = TicTacToeCell;
    this.currentPlayer = "X";
    this.winner = false;
    this.boardState = {};
    this.winConditions = [
      ["A1", "B1", "C1"], // Row 1
      ["A2", "B2", "C2"], // Row 2
      ["A3", "B3", "C3"], // Row 3
      ["A1", "A2", "A3"], // Col A
      ["B1", "B2", "B3"], // Col B
      ["C1", "C2", "C3"], // Col C
      ["A1", "B2", "C3"], // Diagonal
      ["C1", "B2", "A3"] // Diagonal
    ];
  }

  checkWinConditions() {
    for (const cells of this.winConditions) {
      const [a, b, c] = cells;
      if (
        this.boardState[a] &&
        this.boardState[a] === this.boardState[b] &&
        this.boardState[b] === this.boardState[c]
      ) {
        this.setWinningCells(cells);
        this.winner = this.currentPlayer;
      }
    }
  }

  setWinningCells(cells) {
    cells.forEach((cell) => {
      this.get(cell, "cellRef").el.classList.add("is-winner");
    });
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  async reset() {
    await this.emit("reset");
    this.currentPlayer = "X";
    this.winner = false;
  }

  beforeMount() {
    const resetBtn = document.querySelector(this.settings.selectorReset);
    resetBtn?.addEventListener("click", this.reset.bind(this));
  }

  afterMount() {
    this.collection.forEach((entry) => {
      this.boardState[entry.cellRef] = entry.state;
    });

    this.on("afterTurn", () => {
      this.checkWinConditions();
      this.switchPlayer();
    });
  }
}
