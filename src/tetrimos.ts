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
  rotate(): void {
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

    this.shape = newShape;
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

  moveDown() {
    this.undraw();
    this.y++;
    console.log(`Moving down to y: ${this.y}`);
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
