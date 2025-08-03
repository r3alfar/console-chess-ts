export type Color = 'white' | 'black';
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  promotion?: PieceType;
}

export interface Piece {
  type: PieceType;
  color: Color;
  hasMoved: boolean;
}

export type Board = (Piece | null)[][];
