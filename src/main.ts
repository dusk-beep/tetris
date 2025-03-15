import { Windows } from "./windows";
import { Tetrimino } from "./tetrimos";

function main(): number {
  const win = new Windows();
  win.drawBoard();

  const buttons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll("button");

  buttons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", handleClick);
  });

  function handleClick(event: Event): void {
    const button = event.target as HTMLButtonElement;

    if (button.id === "left") {
      tetris.moveLeft(); // Call moveLeft method
    } else if (button.id === "right") {
      tetris.moveRight(); // Call moveRight method
    } else if (button.id === "counter") {
      tetris.rotateCCW(); // Call moveDown method (You might already be doing this in the game loop)
    } else if (button.id === "clock") {
      tetris.rotateClock(); // Call rotate method if you have one
    }
  }

  function randomColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  const colors: string[] = [
    "#04a5e5",
    "#f9e2af",
    "#eed49f",
    "#a6da95",
    "#e64553",
    "#f38ba8",
    "#f5e0dc"
  ];

  let tetris = new Tetrimino(win, randomColor());

  let start = Date.now();
  function gameLoop() {
    let delta = Date.now() - start;

    if (delta > 500) {
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
