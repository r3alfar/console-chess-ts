// Simple chess board visualizer for the rook test
function visualizeBoard(board) {
  console.log('   a  b  c  d  e  f  g  h');
  console.log('  ─────────────────────────');
  
  for (let row = 0; row < 8; row++) {
    let rowStr = `${8 - row} │`;
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece === null) {
        rowStr += ' · ';
      } else {
        const symbol = getPieceSymbol(piece);
        rowStr += ` ${symbol} `;
      }
    }
    rowStr += `│ ${8 - row}`;
    console.log(rowStr);
  }
  
  console.log('  ─────────────────────────');
  console.log('   a  b  c  d  e  f  g  h');
}

function getPieceSymbol(piece) {
  const symbols = {
    'white': {
      'king': '♔',
      'queen': '♕',
      'rook': '♖',
      'bishop': '♗',
      'knight': '♘',
      'pawn': '♙'
    },
    'black': {
      'king': '♚',
      'queen': '♛',
      'rook': '♜',
      'bishop': '♝',
      'knight': '♞',
      'pawn': '♟'
    }
  };
  return symbols[piece.color][piece.type];
}

// Initial board state (standard chess setup)
const initialBoard = [
  // Row 0 (black pieces)
  [
    { type: 'rook', color: 'black', hasMoved: false },
    { type: 'knight', color: 'black', hasMoved: false },
    { type: 'bishop', color: 'black', hasMoved: false },
    { type: 'queen', color: 'black', hasMoved: false },
    { type: 'king', color: 'black', hasMoved: false },
    { type: 'bishop', color: 'black', hasMoved: false },
    { type: 'knight', color: 'black', hasMoved: false },
    { type: 'rook', color: 'black', hasMoved: false }
  ],
  // Row 1 (black pawns)
  Array(8).fill().map(() => ({ type: 'pawn', color: 'black', hasMoved: false })),
  // Rows 2-5 (empty)
  Array(4).fill().map(() => Array(8).fill(null)),
  // Row 6 (white pawns)
  Array(8).fill().map(() => ({ type: 'pawn', color: 'white', hasMoved: false })),
  // Row 7 (white pieces)
  [
    { type: 'rook', color: 'white', hasMoved: false },
    { type: 'knight', color: 'white', hasMoved: false },
    { type: 'bishop', color: 'white', hasMoved: false },
    { type: 'queen', color: 'white', hasMoved: false },
    { type: 'king', color: 'white', hasMoved: false },
    { type: 'bishop', color: 'white', hasMoved: false },
    { type: 'knight', color: 'white', hasMoved: false },
    { type: 'rook', color: 'white', hasMoved: false }
  ]
];

console.log('=== INITIAL BOARD STATE ===');
visualizeBoard(initialBoard);

// After clearing the path (removing pawn at [6][1])
const boardAfterClear = JSON.parse(JSON.stringify(initialBoard));
boardAfterClear[6][1] = null;

console.log('\n=== BOARD AFTER CLEARING PATH ===');
console.log('(Removed white pawn at b2 to clear path for rook)');
visualizeBoard(boardAfterClear);

// After the rook move from a1 to d1
const boardAfterMove = JSON.parse(JSON.stringify(boardAfterClear));
boardAfterMove[7][0] = null; // Remove rook from a1
boardAfterMove[7][3] = { type: 'rook', color: 'white', hasMoved: true }; // Place rook at d1

console.log('\n=== BOARD AFTER ROOK MOVE ===');
console.log('(Rook moved from a1 to d1)');
visualizeBoard(boardAfterMove);

console.log('\n=== TEST FLOW SUMMARY ===');
console.log('1. Initial board: Standard chess setup');
console.log('2. Clear path: Remove white pawn at b2 (position [6][1])');
console.log('3. Move rook: From a1 (position [7][0]) to d1 (position [7][3])');
console.log('4. Result: Rook successfully moves horizontally 3 squares'); 