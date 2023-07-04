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
  isGameOver = false;
  winner: Player | null = null;
  clickSound = new Audio('assets/click-sound.flac');
  winSound = new Audio('assets/win-sound.wav');

  constructor() {
    this.resetGrid(); // Initialize the grid when the component is created
  }

  resetGrid(): void {
    this.grid = [];
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = Array(this.columns).fill(Player.None);
    }
    this.isGameOver = false;
    this.winner = null;
  }

  dropDisc(column: number): void {
    if (this.isGameOver) {
      return;
    }

    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][column] === Player.None) {
        this.grid[row][column] = this.currentPlayer; // Drop the disc in the selected column
        this.clickSound.play(); // Play a click sound when a disc is dropped
        this.checkForWin(row, column); // Check if the current player wins
        this.checkForDraw(); // Check if the game ends in a draw
        this.togglePlayer(); // Toggle the current player for the next turn
        return;
      }
    }
  }

  checkForWin(row: number, column: number): void {
    if (
      this.checkWinDirection(row, column, 1, 0) || // Check for a win in the horizontal direction
      this.checkWinDirection(row, column, 0, 1) || // Check for a win in the vertical direction
      this.checkWinDirection(row, column, 1, 1) || // Check for a win in the diagonal (top-left to bottom-right) direction
      this.checkWinDirection(row, column, 1, -1)   // Check for a win in the diagonal (top-right to bottom-left) direction
    ) {
      this.isGameOver = true;
      this.winner = this.currentPlayer; // Set the winner
      this.winSound.play(); // Play a win sound
    }
  }

  checkWinDirection(row: number, column: number, rowIncrement: number, colIncrement: number): boolean {
    const player = this.grid[row][column];
    let count = 0;
    let r = row;
    let c = column;

    // Check for consecutive discs in the specified direction
    while (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.grid[r][c] === player) {
      count++;
      r += rowIncrement;
      c += colIncrement;
    }

    r = row - rowIncrement;
    c = column - colIncrement;

    // Check for consecutive discs in the opposite direction
    while (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.grid[r][c] === player) {
      count++;
      r -= rowIncrement;
      c -= colIncrement;
    }

    return count >= 4; // Return true if there are at least four consecutive discs
  }

  checkForDraw(): void {
    const isGridFull = this.grid.every(row => row.every(cell => cell !== Player.None));
    if (isGridFull) {
      this.isGameOver = true;
      this.winner = null;
    }
  }

  togglePlayer(): void {
    this.currentPlayer =
      this.currentPlayer === Player.Red ? Player.Yellow : Player.Red; // Switch the current player between Red and Yellow
  }

  getPlayerColorName(player: Player): string {
    return player === Player.Red ? 'Red' : 'Yellow'; // Return the color name of the player
  }
}
