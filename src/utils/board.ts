import { Board, Color, Piece, PieceType, Position } from '../types/piece';

export const createEmptyBoard = (): Board => {
  return Array(8).fill(null).map(() => Array(8).fill(null));
};

export const initializeBoard = (): Board => {
  const board = createEmptyBoard();
  
  // Set up pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black', hasMoved: false };
    board[6][col] = { type: 'pawn', color: 'white', hasMoved: false };
  }

  // Set up other pieces in order
  const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  
  // Black pieces (top row)
  pieceOrder.forEach((type, col) => {
    board[0][col] = { type, color: 'black', hasMoved: false };
  });

  // White pieces (bottom row)
  pieceOrder.forEach((type, col) => {
    board[7][col] = { type, color: 'white', hasMoved: false };
  });

  return board;
};

export const getPieceAt = (board: Board, position: Position): Piece | null => {
  if (!isPositionValid(position)) return null;
  return board[position.row][position.col];
};

export const setPieceAt = (board: Board, position: Position, piece: Piece | null): void => {
  if (isPositionValid(position)) {
    board[position.row][position.col] = piece;
  }
};

export const isPositionValid = (position: Position): boolean => {
  return (
    position.row >= 0 &&
    position.row < 8 &&
    position.col >= 0 &&
    position.col < 8
  );
};

export const positionToString = (pos: Position): string => {
  const colLetter = String.fromCharCode(97 + pos.col); // a-h
  return `${colLetter}${8 - pos.row}`;
};

export const stringToPosition = (str: string): Position | null => {
  if (str.length !== 2) return null;
  
  const col = str.charCodeAt(0) - 97; // a=0, h=7
  const row = 8 - parseInt(str[1], 10);
  
  const position = { row, col };
  return isPositionValid(position) ? position : null;
};
