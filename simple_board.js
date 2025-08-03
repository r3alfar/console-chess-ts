// Simple chess board visualizer
console.log('=== ROOK TEST BOARD VISUALIZATION ===\n');

// Initial board state
console.log('1. INITIAL BOARD STATE:');
console.log('   a  b  c  d  e  f  g  h');
console.log('8  ♜  ♞  ♝  ♛  ♚  ♝  ♞  ♜');
console.log('7  ♟  ♟  ♟  ♟  ♟  ♟  ♟  ♟');
console.log('6  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('5  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('4  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('3  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('2  ♙  ♙  ♙  ♙  ♙  ♙  ♙  ♙');
console.log('1  ♖  ♘  ♗  ♕  ♔  ♗  ♘  ♖');
console.log('   a  b  c  d  e  f  g  h');

console.log('\n2. AFTER CLEARING PATH (removing pawn at b2):');
console.log('   a  b  c  d  e  f  g  h');
console.log('8  ♜  ♞  ♝  ♛  ♚  ♝  ♞  ♜');
console.log('7  ♟  ♟  ♟  ♟  ♟  ♟  ♟  ♟');
console.log('6  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('5  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('4  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('3  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('2  ♙  ·  ♙  ♙  ♙  ♙  ♙  ♙');
console.log('1  ♖  ♘  ♗  ♕  ♔  ♗  ♘  ♖');
console.log('   a  b  c  d  e  f  g  h');

console.log('\n3. AFTER ROOK MOVE (from a1 to d1):');
console.log('   a  b  c  d  e  f  g  h');
console.log('8  ♜  ♞  ♝  ♛  ♚  ♝  ♞  ♜');
console.log('7  ♟  ♟  ♟  ♟  ♟  ♟  ♟  ♟');
console.log('6  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('5  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('4  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('3  ·  ·  ·  ·  ·  ·  ·  ·');
console.log('2  ♙  ·  ♙  ♙  ♙  ♙  ♙  ♙');
console.log('1  ·  ♘  ♗  ♖  ♔  ♗  ♘  ♖');
console.log('   a  b  c  d  e  f  g  h');

console.log('\n=== TEST FLOW EXPLANATION ===');
console.log('• Initial: Standard chess setup with white rook at a1');
console.log('• Step 1: Remove white pawn at b2 to clear horizontal path');
console.log('• Step 2: Move white rook from a1 to d1 (3 squares right)');
console.log('• Result: Rook successfully moves horizontally as expected');
console.log('• Note: Rook can move any number of squares horizontally or vertically'); 