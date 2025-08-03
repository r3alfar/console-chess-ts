console.log('ROOK TEST BOARD VISUALIZATION');
console.log('=============================\n');

console.log('1. INITIAL BOARD STATE:');
console.log('   a  b  c  d  e  f  g  h');
console.log('8  R  N  B  Q  K  B  N  R');
console.log('7  P  P  P  P  P  P  P  P');
console.log('6  .  .  .  .  .  .  .  .');
console.log('5  .  .  .  .  .  .  .  .');
console.log('4  .  .  .  .  .  .  .  .');
console.log('3  .  .  .  .  .  .  .  .');
console.log('2  p  p  p  p  p  p  p  p');
console.log('1  r  n  b  q  k  b  n  r');
console.log('   a  b  c  d  e  f  g  h');

console.log('\n2. AFTER CLEARING PATH (removing pawn at b2):');
console.log('   a  b  c  d  e  f  g  h');
console.log('8  R  N  B  Q  K  B  N  R');
console.log('7  P  P  P  P  P  P  P  P');
console.log('6  .  .  .  .  .  .  .  .');
console.log('5  .  .  .  .  .  .  .  .');
console.log('4  .  .  .  .  .  .  .  .');
console.log('3  .  .  .  .  .  .  .  .');
console.log('2  p  .  p  p  p  p  p  p');
console.log('1  r  n  b  q  k  b  n  r');
console.log('   a  b  c  d  e  f  g  h');

console.log('\n3. AFTER ROOK MOVE (from a1 to d1):');
console.log('   a  b  c  d  e  f  g  h');
console.log('8  R  N  B  Q  K  B  N  R');
console.log('7  P  P  P  P  P  P  P  P');
console.log('6  .  .  .  .  .  .  .  .');
console.log('5  .  .  .  .  .  .  .  .');
console.log('4  .  .  .  .  .  .  .  .');
console.log('3  .  .  .  .  .  .  .  .');
console.log('2  p  .  p  p  p  p  p  p');
console.log('1  .  n  b  r  k  b  n  r');
console.log('   a  b  c  d  e  f  g  h');

console.log('\nLEGEND:');
console.log('Uppercase = Black pieces, Lowercase = White pieces');
console.log('R/r = Rook, N/n = Knight, B/b = Bishop');
console.log('Q/q = Queen, K/k = King, P/p = Pawn');
console.log('. = Empty square');

console.log('\nTEST FLOW:');
console.log('1. Start with standard chess setup');
console.log('2. Remove white pawn at b2 to clear horizontal path');
console.log('3. Move white rook from a1 to d1 (3 squares right)');
console.log('4. Verify rook can move horizontally as per chess rules'); 