import { T, I, S } from "./shapes";
import { Windows } from "./windows";

import { EMPTY, ROW, COL } from "./constants";

class Tetrimino {
  shape: number[][];
  color: string;
  win: Windows;
  x: number = 3;
  y: number = -2;

  gameOver = false;

  constructor(win: Windows, color: string) {
    this.shape = this.getRandomShape();
    this.color = color;
    this.win = win;
  }

  // clockwise
  rotateClock(): void {
    this.undraw();
    const n: number = this.shape.length;
    const newShape = Array.from({ length: n }, () => Array(n).fill(0));

    /*
     * _ _ _ 0
     * _,_,_ 0
     * _,_,_ 0
     * _,_,_ 0
     */

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newShape[j][n - 1 - i] = this.shape[i][j];
      }
    }

    const orgShape = this.shape;
    this.shape = newShape;

    if (this.collision(0, 0)) {
      this.shape = orgShape;
    }

    this.draw();
  }

  rotateCCW(): void {
    this.undraw();
    const n: number = this.shape.length;
    const newShape = Array.from({ length: n }, () => Array(n).fill(0));

    /*
     * _ _ _ 0
     * _,_,_ 0
     * _,_,_ 0
     * _,_,_ 0
     */

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newShape[n - 1 - j][i] = this.shape[i][j];
      }
    }

    const orgShape = this.shape;
    this.shape = newShape;

    if (this.collision(0, 0)) {
      this.shape = orgShape;
    }

    this.draw();
  }

  getRandomShape(): number[][] {
    const shapes = [I, T, S];
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
  }

  fill(color: string) {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[0].length; j++) {
        if (this.shape[i][j]) {
          this.win.drawSquare(this.x + j, this.y + i, color);
        }
      }
    }
  }

  undraw() {
    this.fill(EMPTY);
  }

  draw() {
    this.fill(this.color);
  }

  moveLeft() {
    if (!this.collision(-1, 0)) {
      this.undraw();
      this.x--;
      this.draw();
    }
  }

  moveRight() {
    if (!this.collision(1, 0)) {
      this.undraw();
      this.x++;
      this.draw();
    }
  }

  moveDown() {
    this.undraw();
    this.y++;
    this.draw();
  }

  lock() {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[0].length; col++) {
        if (!this.shape[row][col]) {
          continue;
        }

        if (this.y + col < 0) {
          console.log("gameova");
          this.gameOver = true;
          break;
        }

        this.win.board[this.y + row][this.x + col] = this.color;
      }
    }

    // check if row full
    for (let row = 0; row < ROW; row++) {
      let rowFull = true;
      for (let col = 0; col < COL; col++) {
        rowFull = rowFull && this.win.board[row][col] != EMPTY;
      }

      if (rowFull) {
        for (let y = row; y > 1; y--) {
          for (let c = 0; c < COL; c++) {
            this.win.board[y][c] = this.win.board[y - 1][c];
          }
        }

        for (let c = 0; c < COL; c++) {
          this.win.board[0][c] = EMPTY;
        }
      }
    }

    this.win.drawBoard();
  }

  collision(x: number, y: number): boolean {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[0].length; col++) {
        if (!this.shape[row][col]) {
          continue;
        }

        const newX = this.x + col + x;
        const newY = this.y + row + y;

        if (newX < 0 || newX >= COL || newY >= ROW) {
          return true;
        }

        if (newY < 0) {
          continue;
        }

        if (this.win.board[newY][newX] != EMPTY) {
          return true;
        }
      }
    }

    return false;
  }

  display() {
    console.log(this.shape.map(row => row.join(" ")).join("\n"));
  }
}

export { Tetrimino };
