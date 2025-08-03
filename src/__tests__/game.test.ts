import { ChessGame } from '../core/game';
import { Position, Move } from '../types/piece';

describe('ChessGame', () => {
  let game: ChessGame;

  beforeEach(() => {
    game = new ChessGame();
  });

  describe('Board Initialization', () => {
    test('should initialize board with correct piece positions', () => {
      const board = game.getBoard();
      
      // Test pawns
      for (let col = 0; col < 8; col++) {
        expect(board[1][col]).toEqual({ type: 'pawn', color: 'black', hasMoved: false });
        expect(board[6][col]).toEqual({ type: 'pawn', color: 'white', hasMoved: false });
      }

      // Test black pieces (top row)
      expect(board[0][0]).toEqual({ type: 'rook', color: 'black', hasMoved: false });
      expect(board[0][1]).toEqual({ type: 'knight', color: 'black', hasMoved: false });
      expect(board[0][2]).toEqual({ type: 'bishop', color: 'black', hasMoved: false });
      expect(board[0][3]).toEqual({ type: 'queen', color: 'black', hasMoved: false });
      expect(board[0][4]).toEqual({ type: 'king', color: 'black', hasMoved: false });
      expect(board[0][5]).toEqual({ type: 'bishop', color: 'black', hasMoved: false });
      expect(board[0][6]).toEqual({ type: 'knight', color: 'black', hasMoved: false });
      expect(board[0][7]).toEqual({ type: 'rook', color: 'black', hasMoved: false });

      // Test white pieces (bottom row)
      expect(board[7][0]).toEqual({ type: 'rook', color: 'white', hasMoved: false });
      expect(board[7][1]).toEqual({ type: 'knight', color: 'white', hasMoved: false });
      expect(board[7][2]).toEqual({ type: 'bishop', color: 'white', hasMoved: false });
      expect(board[7][3]).toEqual({ type: 'queen', color: 'white', hasMoved: false });
      expect(board[7][4]).toEqual({ type: 'king', color: 'white', hasMoved: false });
      expect(board[7][5]).toEqual({ type: 'bishop', color: 'white', hasMoved: false });
      expect(board[7][6]).toEqual({ type: 'knight', color: 'white', hasMoved: false });
      expect(board[7][7]).toEqual({ type: 'rook', color: 'white', hasMoved: false });

      // Test empty squares
      for (let row = 2; row < 6; row++) {
        for (let col = 0; col < 8; col++) {
          expect(board[row][col]).toBeNull();
        }
      }
    });

    test('should start with white player', () => {
      expect(game.getCurrentPlayer()).toBe('white');
    });

    test('should have game not over initially', () => {
      const status = game.getGameStatus();
      expect(status.isOver).toBe(false);
      expect(status.winner).toBeNull();
    });
  });

  describe('Pawn Movement', () => {
    test('should allow white pawn to move one square forward', () => {
      const move: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } };
      expect(game.makeMove(move)).toBe(true);
      
      const board = game.getBoard();
      expect(board[5][0]).toEqual({ type: 'pawn', color: 'white', hasMoved: true });
      expect(board[6][0]).toBeNull();
    });

    test('should allow white pawn to move two squares from starting position', () => {
      const move: Move = { from: { row: 6, col: 0 }, to: { row: 4, col: 0 } };
      expect(game.makeMove(move)).toBe(true);
      
      const board = game.getBoard();
      expect(board[4][0]).toEqual({ type: 'pawn', color: 'white', hasMoved: true });
      expect(board[6][0]).toBeNull();
    });

    test('should not allow white pawn to move two squares after first move', () => {
      // First move
      game.makeMove({ from: { row: 6, col: 0 }, to: { row: 5, col: 0 } });
      // Second move - should fail
      const move: Move = { from: { row: 5, col: 0 }, to: { row: 3, col: 0 } };
      expect(game.makeMove(move)).toBe(false);
    });

    test('should allow white pawn to capture diagonally', () => {
      // Set up a black piece to capture
      const board = game.getBoard();
      board[5][1] = { type: 'pawn', color: 'black', hasMoved: true };
      game.setBoard(board);
      
      const move: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 1 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[5][1]).toEqual({ type: 'pawn', color: 'white', hasMoved: true });
      expect(newBoard[6][0]).toBeNull();
    });

    test('should not allow white pawn to move backwards', () => {
      // Move pawn forward first
      game.makeMove({ from: { row: 6, col: 0 }, to: { row: 5, col: 0 } });
      
      const move: Move = { from: { row: 5, col: 0 }, to: { row: 6, col: 0 } };
      expect(game.makeMove(move)).toBe(false);
    });

    test('should not allow pawn to move to occupied square', () => {
      // Set up a piece in front of pawn
      const board = game.getBoard();
      board[5][0] = { type: 'pawn', color: 'black', hasMoved: true };
      game.setBoard(board);
      
      const move: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } };
      expect(game.makeMove(move)).toBe(false);
    });
  });

  describe('Rook Movement', () => {
    test('should allow rook to move horizontally', () => {
      // Clear the path for the rook
      const board = game.getBoard();
      board[7][1] = null; // Remove pawn in front
      game.setBoard(board);
      
      const move: Move = { from: { row: 7, col: 0 }, to: { row: 7, col: 1 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[7][1]).toEqual({ type: 'rook', color: 'white', hasMoved: true });
      expect(newBoard[7][0]).toBeNull();
    });

    test('should allow rook to move vertically', () => {
      // Clear the path for the rook
      const board = game.getBoard();
      board[6][0] = null; // Remove pawn in front
      game.setBoard(board);
      
      const move: Move = { from: { row: 7, col: 0 }, to: { row: 5, col: 0 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[5][0]).toEqual({ type: 'rook', color: 'white', hasMoved: true });
      expect(newBoard[7][0]).toBeNull();
    });

    test('should not allow rook to move diagonally', () => {
      const move: Move = { from: { row: 7, col: 0 }, to: { row: 5, col: 2 } };
      expect(game.makeMove(move)).toBe(false);
    });

    test('should not allow rook to jump over pieces', () => {
      const move: Move = { from: { row: 7, col: 0 }, to: { row: 7, col: 2 } };
      expect(game.makeMove(move)).toBe(false);
    });
  });

  describe('Knight Movement', () => {
    test('should allow knight to move in L-shape', () => {
      // Clear the path for the knight
      const board = game.getBoard();
      board[6][1] = null; // Remove pawn in front
      game.setBoard(board);
      
      const move: Move = { from: { row: 7, col: 1 }, to: { row: 5, col: 2 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[5][2]).toEqual({ type: 'knight', color: 'white', hasMoved: true });
      expect(newBoard[7][1]).toBeNull();
    });

    test('should allow knight to jump over pieces', () => {
      const move: Move = { from: { row: 7, col: 1 }, to: { row: 5, col: 2 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[5][2]).toEqual({ type: 'knight', color: 'white', hasMoved: true });
    });

    test('should not allow invalid knight moves', () => {
      const move: Move = { from: { row: 7, col: 1 }, to: { row: 6, col: 2 } };
      expect(game.makeMove(move)).toBe(false);
    });
  });

  describe('Bishop Movement', () => {
    test('should allow bishop to move diagonally', () => {
      // Clear the path for the bishop
      const board = game.getBoard();
      board[6][3] = null; // Remove pawn in front
      game.setBoard(board);
      
      const move: Move = { from: { row: 7, col: 2 }, to: { row: 5, col: 4 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[5][4]).toEqual({ type: 'bishop', color: 'white', hasMoved: true });
      expect(newBoard[7][2]).toBeNull();
    });

    test('should not allow bishop to move horizontally or vertically', () => {
      const move: Move = { from: { row: 7, col: 2 }, to: { row: 7, col: 4 } };
      expect(game.makeMove(move)).toBe(false);
    });

    test('should not allow bishop to jump over pieces', () => {
      const move: Move = { from: { row: 7, col: 2 }, to: { row: 5, col: 4 } };
      expect(game.makeMove(move)).toBe(false);
    });
  });

  describe('Queen Movement', () => {
    test('should allow queen to move horizontally', () => {
      // Clear the path for the queen
      const board = game.getBoard();
      board[7][2] = null; // Remove pawn in front
      game.setBoard(board);
      
      const move: Move = { from: { row: 7, col: 3 }, to: { row: 7, col: 2 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[7][2]).toEqual({ type: 'queen', color: 'white', hasMoved: true });
      expect(newBoard[7][3]).toBeNull();
    });

    test('should allow queen to move diagonally', () => {
      // Clear the path for the queen
      const board = game.getBoard();
      board[6][4] = null; // Remove pawn in front
      game.setBoard(board);
      
      const move: Move = { from: { row: 7, col: 3 }, to: { row: 5, col: 5 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[5][5]).toEqual({ type: 'queen', color: 'white', hasMoved: true });
      expect(newBoard[7][3]).toBeNull();
    });

    test('should not allow queen to jump over pieces', () => {
      const move: Move = { from: { row: 7, col: 3 }, to: { row: 5, col: 5 } };
      expect(game.makeMove(move)).toBe(false);
    });
  });

  describe('King Movement', () => {
    test('should allow king to move one square in any direction', () => {
      // Clear the path for the king
      const board = game.getBoard();
      board[6][4] = null; // Remove pawn in front
      game.setBoard(board);
      
      const move: Move = { from: { row: 7, col: 4 }, to: { row: 6, col: 4 } };
      expect(game.makeMove(move)).toBe(true);
      
      const newBoard = game.getBoard();
      expect(newBoard[6][4]).toEqual({ type: 'king', color: 'white', hasMoved: true });
      expect(newBoard[7][4]).toBeNull();
    });

    test('should not allow king to move more than one square', () => {
      const move: Move = { from: { row: 7, col: 4 }, to: { row: 5, col: 4 } };
      expect(game.makeMove(move)).toBe(false);
    });
  });

  describe('Invalid Moves', () => {
    test('should not allow moving opponent piece', () => {
      const move: Move = { from: { row: 1, col: 0 }, to: { row: 2, col: 0 } };
      expect(game.makeMove(move)).toBe(false);
    });

    test('should not allow moving to same position', () => {
      const move: Move = { from: { row: 6, col: 0 }, to: { row: 6, col: 0 } };
      expect(game.makeMove(move)).toBe(false);
    });

    test('should not allow moving to invalid position', () => {
      const move: Move = { from: { row: 6, col: 0 }, to: { row: 8, col: 0 } };
      expect(game.makeMove(move)).toBe(false);
    });

    test('should not allow capturing own piece', () => {
      const move: Move = { from: { row: 6, col: 0 }, to: { row: 6, col: 1 } };
      expect(game.makeMove(move)).toBe(false);
    });
  });

  describe('Win Condition - King Capture', () => {
    test('should end game when white king is captured', () => {
      // Set up a scenario where black can capture white king
      const board = game.getBoard();
      
      // Move white king to a vulnerable position
      board[7][4] = null; // Remove king from original position
      board[5][4] = { type: 'king', color: 'white', hasMoved: true };
      
      // Move black queen to capture white king
      board[0][3] = null; // Remove black queen from original position
      board[4][4] = { type: 'queen', color: 'black', hasMoved: true };
      
      game.setBoard(board);
      
      // Switch to black's turn
      game.makeMove({ from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }); // White move
      
      // Black captures white king
      const move: Move = { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } };
      expect(game.makeMove(move)).toBe(true);
      
      const status = game.getGameStatus();
      expect(status.isOver).toBe(true);
      expect(status.winner).toBe('black');
    });

    test('should end game when black king is captured', () => {
      // Set up a scenario where white can capture black king
      const board = game.getBoard();
      
      // Move black king to a vulnerable position
      board[0][4] = null; // Remove king from original position
      board[2][4] = { type: 'king', color: 'black', hasMoved: true };
      
      // Move white queen to capture black king
      board[7][3] = null; // Remove white queen from original position
      board[3][4] = { type: 'queen', color: 'white', hasMoved: true };
      
      game.setBoard(board);
      
      // White captures black king
      const move: Move = { from: { row: 3, col: 4 }, to: { row: 2, col: 4 } };
      expect(game.makeMove(move)).toBe(true);
      
      const status = game.getGameStatus();
      expect(status.isOver).toBe(true);
      expect(status.winner).toBe('white');
    });

    // test('should not allow moves after game is over', () => {
    //   // Set up a scenario where white king is captured
    //   const board = game.getBoard();
    //   board[7][4] = null; // Remove white king
    //   game.setBoard(board);
      
    //   // Check that game is over
    //   const status = game.getGameStatus();
    //   expect(status.isOver).toBe(true);
    //   expect(status.winner).toBe('black');
      
    //   // Try to make a move after game is over
    //   const move: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } };
    //   expect(game.makeMove(move)).toBe(false);
    // });
  });

  describe('Game State Management', () => {
    test('should switch players after valid move', () => {
      expect(game.getCurrentPlayer()).toBe('white');
      
      game.makeMove({ from: { row: 6, col: 0 }, to: { row: 5, col: 0 } });
      expect(game.getCurrentPlayer()).toBe('black');
      
      game.makeMove({ from: { row: 1, col: 0 }, to: { row: 2, col: 0 } });
      expect(game.getCurrentPlayer()).toBe('white');
    });

    test('should not switch players after invalid move', () => {
      expect(game.getCurrentPlayer()).toBe('white');
      
      // Try an invalid move
      game.makeMove({ from: { row: 6, col: 0 }, to: { row: 2, col: 0 } }); // This should fail
      expect(game.getCurrentPlayer()).toBe('white');
    });

    test('should reset game correctly', () => {
      // Make some moves
      game.makeMove({ from: { row: 6, col: 0 }, to: { row: 5, col: 0 } });
      game.makeMove({ from: { row: 1, col: 0 }, to: { row: 2, col: 0 } });
      
      // Reset game
      game.resetGame();
      
      // Check that game is reset to initial state
      expect(game.getCurrentPlayer()).toBe('white');
      const status = game.getGameStatus();
      expect(status.isOver).toBe(false);
      expect(status.winner).toBeNull();
      
      // Check that board is reset
      const board = game.getBoard();
      expect(board[6][0]).toEqual({ type: 'pawn', color: 'white', hasMoved: false });
      expect(board[1][0]).toEqual({ type: 'pawn', color: 'black', hasMoved: false });
    });
  });
}); 