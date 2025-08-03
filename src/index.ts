import * as readline from 'readline';
import { ChessGame } from './core/game';
import { printBoard, positionFromInput } from './utils/consoleDisplay';

class ConsoleChess {
  private game: ChessGame;
  private rl: readline.Interface;

  constructor() {
    this.game = new ChessGame();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public start(): void {
    console.log('Welcome to Console Chess!');
    console.log('Enter moves in algebraic notation (e.g., "e2e4" to move from e2 to e4)');
    console.log('Type "exit" to quit\n');
    
    this.printGameState();
    this.promptMove();
  }

  private printGameState(): void {
    const board = this.game.getBoard();
    printBoard(board);
    
    const status = this.game.getGameStatus();
    if (status.isOver) {
      console.log(`Game Over! ${status.winner?.toUpperCase()} wins!`);
      process.exit(0);
    } else {
      console.log(`Current player: ${this.game.getCurrentPlayer().toUpperCase()}`);
    }
  }

  private promptMove(): void {
    this.rl.question('Enter your move: ', (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('Thanks for playing!');
        this.rl.close();
        return;
      }

      if (input.toLowerCase() === 'reset') {
        this.game = new ChessGame();
        console.log('\nGame reset!\n');
        this.printGameState();
        this.promptMove();
        return;
      }

      if (input.length !== 4) {
        console.log('Invalid move format. Please use format like "e2e4"');
        this.promptMove();
        return;
      }

      const fromPos = positionFromInput(input.substring(0, 2));
      const toPos = positionFromInput(input.substring(2, 4));

      if (!fromPos || !toPos) {
        console.log('Invalid positions. Please use format like "e2e4" (a-h, 1-8)');
        this.promptMove();
        return;
      }

      const move = { from: fromPos, to: toPos };
      const moveSuccessful = this.game.makeMove(move);

      if (!moveSuccessful) {
        console.log('Invalid move. Try again.');
      }

      console.log();
      this.printGameState();
      this.promptMove();
    });
  }
}

// Start the game
const game = new ConsoleChess();
game.start();
