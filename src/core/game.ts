import { Board, Color, Move, Piece, PieceType, Position } from '../types/piece';
import { getPieceAt, isPositionValid, setPieceAt } from '../utils/board';

export class ChessGame {
  private board: Board;
  private currentPlayer: Color;
  private moveHistory: Move[];
  private isGameOver: boolean;
  private winner: Color | null;

  constructor() {
    this.board = [];
    this.currentPlayer = 'white';
    this.moveHistory = [];
    this.isGameOver = false;
    this.winner = null;
    this.resetGame();
  }

  public resetGame(): void {
    this.board = [];
    for (let i = 0; i < 8; i++) {
      this.board[i] = new Array(8).fill(null);
    }
    this.initializeBoard();
    this.currentPlayer = 'white';
    this.moveHistory = [];
    this.isGameOver = false;
    this.winner = null;
  }

  private initializeBoard(): void {
    // Set up pawns
    for (let col = 0; col < 8; col++) {
      this.board[1][col] = { type: 'pawn', color: 'black', hasMoved: false };
      this.board[6][col] = { type: 'pawn', color: 'white', hasMoved: false };
    }

    // Set up other pieces in order
    const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    
    // Black pieces (top row)
    pieceOrder.forEach((type, col) => {
      this.board[0][col] = { type, color: 'black', hasMoved: false };
    });

    // White pieces (bottom row)
    pieceOrder.forEach((type, col) => {
      this.board[7][col] = { type, color: 'white', hasMoved: false };
    });
  }

  public makeMove(move: Move): boolean {
    if (this.isGameOver) return false;

    const { from, to } = move;
    const piece = getPieceAt(this.board, from);
    
    if (!piece || piece.color !== this.currentPlayer) return false;
    if (!this.isValidMove(piece, from, to)) return false;

    // Make the move
    const capturedPiece = getPieceAt(this.board, to);
    setPieceAt(this.board, to, { ...piece, hasMoved: true });
    setPieceAt(this.board, from, null);

    // Handle special moves (castling, en passant, promotion)
    // TODO: Implement special move logic

    // Check for game over conditions
    this.checkGameOver();

    // Switch player only if move was successful
    if (!this.isGameOver) {
      this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }
    this.moveHistory.push(move);
    
    return true;
  }

  private isValidMove(piece: Piece, from: Position, to: Position): boolean {
    if (!isPositionValid(from) || !isPositionValid(to)) return false;
    if (from.row === to.row && from.col === to.col) return false; // Can't move to the same position

    const targetPiece = getPieceAt(this.board, to);
    if (targetPiece && targetPiece.color === piece.color) return false; // Can't capture your own piece

    // Basic move validation (simplified - would need full implementation for each piece type)
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    switch (piece.type) {
      case 'pawn':
        return this.isValidPawnMove(piece, from, to);
      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && !this.isPathBlocked(from, to);
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
      case 'bishop':
        return rowDiff === colDiff && !this.isPathBlocked(from, to);
      case 'queen':
        return (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) && !this.isPathBlocked(from, to);
      case 'king':
        return rowDiff <= 1 && colDiff <= 1;
      default:
        return false;
    }
  }

  private isValidPawnMove(piece: Piece, from: Position, to: Position): boolean {
    const direction = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;
    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);

    // Moving forward
    if (colDiff === 0) {
      // One square forward
      if (rowDiff === direction) {
        return getPieceAt(this.board, to) === null;
      }
      // Two squares from starting position
      if (rowDiff === 2 * direction && from.row === startRow) {
        const middlePos = { row: from.row + direction, col: from.col };
        return (
          getPieceAt(this.board, middlePos) === null &&
          getPieceAt(this.board, to) === null
        );
      }
      return false;
    }
    
    // Capturing diagonally
    if (colDiff === 1 && rowDiff === direction) {
      const targetPiece = getPieceAt(this.board, to);
      return targetPiece !== null && targetPiece.color !== piece.color;
    }

    return false;
  }

  private isPathBlocked(from: Position, to: Position): boolean {
    const rowStep = Math.sign(to.row - from.row);
    const colStep = Math.sign(to.col - from.col);
    let current = { ...from };
    
    // Move towards the target position
    while (current.row !== to.row || current.col !== to.col) {
      current.row += rowStep;
      current.col += colStep;
      
      // If we've reached the target, no need to check for blocking
      if (current.row === to.row && current.col === to.col) break;
      
      // If there's a piece in the way, the path is blocked
      if (getPieceAt(this.board, current) !== null) return true;
    }
    
    return false;
  }

  private checkGameOver(): void {
    // Check for king capture
    let whiteKingFound = false;
    let blackKingFound = false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece?.type === 'king') {
          if (piece.color === 'white') whiteKingFound = true;
          else blackKingFound = true;
        }
      }
    }

    if (!whiteKingFound) {
      this.isGameOver = true;
      this.winner = 'black';
    } else if (!blackKingFound) {
      this.isGameOver = true;
      this.winner = 'white';
    }
  }

  public getBoard(): Board {
    return JSON.parse(JSON.stringify(this.board)); // Return a deep copy
  }

  public setBoard(board: Board): void {
    this.board = JSON.parse(JSON.stringify(board)); // Deep copy the board
  }

  public getCurrentPlayer(): Color {
    return this.currentPlayer;
  }

  public getGameStatus(): { isOver: boolean; winner: Color | null } {
    return {
      isOver: this.isGameOver,
      winner: this.winner
    };
  }
}
