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
      tetris.rotateCCW();
    } else if (button.id === "clock") {
      tetris.rotateClock();
    } else if (button.id === "down") {
      if (!tetris.collision(0, 1)) {
        tetris.moveDown();
      }
    }
  }

  const downBtn = document.getElementById("down");

  let holdInterval: any;

  downBtn!.addEventListener("touchstart", () => {
    // Start moving the piece down as long as the button is held
    holdInterval = setInterval(() => {
      if (!tetris.collision(0, 1)) {
        tetris.moveDown();
      }
    }, 100); // Move down every 100ms while the button is held
  });

  downBtn!.addEventListener("touchend", () => {
    clearInterval(holdInterval);
  });

  downBtn!.addEventListener("touchcancel", () => {
    clearInterval(holdInterval);
  });

  function randomColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  const colors: string[] = [
    "#00FFFF", // I - Cyan
    "#FFFF00", // O - Yellow
    "#800080", // T - Purple
    "#00FF00", // S - Green
    "#FF0000", // Z - Red
    "#0000FF", // J - Blue
    "#FFA500" // L - Orange
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
