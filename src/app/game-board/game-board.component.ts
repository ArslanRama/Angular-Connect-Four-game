import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  gameBoard: number[][] = [];
  currentPlayer: number = 1;

  constructor() {
    this.initializeGameBoard();
  }

  initializeGameBoard() {
    // Create an empty game board
    for (let i = 0; i < 6; i++) {
      this.gameBoard[i] = [];
      for (let j = 0; j < 7; j++) {
        this.gameBoard[i][j] = 0;
      }
    }
  }

  placeGamePiece(column: number) {
    // Check if the column is valid and place the game piece
    for (let i = 5; i >= 0; i--) {
      if (this.gameBoard[i][column] === 0) {
        this.gameBoard[i][column] = this.currentPlayer;
        this.checkWinCondition(i, column);
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        break;
      }
    }
  }

  checkWinCondition(row: number, column: number) {
    // Implement your win condition logic here
    // Check for four consecutive game pieces horizontally, vertically, or diagonally
  }

  getPieceClass(value: number) {
    // Return the CSS class for the game piece based on the player
    return value === 1 ? 'piece-red' : value === 2 ? 'piece-yellow' : '';
  }
}
