import { Board, Position } from '../types/piece';

export const printBoard = (board: Board): void => {
  console.log('\n  a b c d e f g h');
  console.log('  - - - - - - - -');
  
  for (let row = 0; row < 8; row++) {
    let rowStr = `${8 - row}|`;
    
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      let pieceChar = '.';
      
      if (piece) {
        const pieceMap: Record<string, string> = {
          'pawn': 'p', 'rook': 'r', 'knight': 'n',
          'bishop': 'b', 'queen': 'q', 'king': 'k'
        };
        pieceChar = piece.color === 'white' 
          ? pieceMap[piece.type].toUpperCase() 
          : pieceMap[piece.type];
      }
      
      rowStr += `${pieceChar} `;
    }
    
    console.log(`${rowStr}|${8 - row}`);
  }
  
  console.log('  - - - - - - - -');
  console.log('  a b c d e f g h\n');
};

export const positionFromInput = (input: string): Position | null => {
  if (input.length !== 2) return null;
  
  const col = input.charCodeAt(0) - 97; // a=0, h=7
  const row = 8 - parseInt(input[1], 10);
  
  if (isNaN(row) || row < 0 || row > 7 || col < 0 || col > 7) {
    return null;
  }
  
  return { row, col };
};
