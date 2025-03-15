import { Windows } from "./windows";
import { Tetrimino } from "./tetrimos";

function main(): number {
  const win = new Windows();
  win.drawBoard();

  let tetris = new Tetrimino(win, "white");

  let gameOver = false;
  let start = Date.now();
  function gameLoop() {
    let delta = Date.now() - start;

    if (delta > 100) {
      // check if we can move down collison
      // y changes by 1
      if (!tetris.collision(0, 1)) {
        tetris.moveDown();
        start = Date.now();
      } else {
        // else create a new Tetrimino
        tetris.lock();
        tetris = new Tetrimino(win, "black");
      }
    }

    if (!gameOver) {
      requestAnimationFrame(gameLoop);
    }
  }
  gameLoop();

  return 0;
}

main();
