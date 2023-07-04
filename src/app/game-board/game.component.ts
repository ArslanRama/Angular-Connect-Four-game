import { Component } from '@angular/core';

enum Player {
  None = 0,
  Red = 1,
  Yellow = 2,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  readonly rows = 6;
  readonly columns = 7;
  currentPlayer: Player = Player.Red;
  grid: Player[][] = [];

  constructor() {
    this.resetGrid();
  }

  resetGrid(): void {
    this.grid = [];
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = Array(this.columns).fill(Player.None);
    }
  }

  dropDisc(column: number): void {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][column] === Player.None) {
        this.grid[row][column] = this.currentPlayer;
        this.checkForWin(row, column);
        this.togglePlayer();
        return;
      }
    }
  }

  checkForWin(row: number, column: number): void {
    if (
      this.checkWinDirection(row, column, 1, 0) || // Horizontal
      this.checkWinDirection(row, column, 0, 1) || // Vertical
      this.checkWinDirection(row, column, 1, 1) || // Diagonal (top-left to bottom-right)
      this.checkWinDirection(row, column, 1, -1)   // Diagonal (top-right to bottom-left)
    ) {
      const winner = this.currentPlayer === Player.Red ? 'Red' : 'Yellow';
      alert(`Player ${winner} wins!`);
      this.resetGrid();
    }
  }

  checkWinDirection(row: number, column: number, rowIncrement: number, colIncrement: number): boolean {
    const player = this.grid[row][column];
    let count = 0;
    let r = row;
    let c = column;

    while (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.grid[r][c] === player) {
      count++;
      r += rowIncrement;
      c += colIncrement;
    }

    r = row - rowIncrement;
    c = column - colIncrement;

    while (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.grid[r][c] === player) {
      count++;
      r -= rowIncrement;
      c -= colIncrement;
    }

    return count >= 4;
  }

  togglePlayer(): void {
    this.currentPlayer =
      this.currentPlayer === Player.Red ? Player.Yellow : Player.Red;
  }
}
