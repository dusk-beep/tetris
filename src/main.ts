import { Windows } from "./windows";
import { Tetrimino } from "./tetrimos";

function main(): number {
  const win = new Windows();
  win.drawBoard();

  let tetris = new Tetrimino(win, "white");

  function randomColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }
  const colors: string[] = [
    "dodgerblue",
    "red",
    "yellow",
    "pink",
    "violet",
    "brown",
    "lime"
  ];

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
        tetris = new Tetrimino(win, randomColor());
      }
    }

    if (!tetris.gameOver) {
      requestAnimationFrame(gameLoop);
    }
  }
  gameLoop();

  return 0;
}

main();
