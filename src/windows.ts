import { ROW, COL, EMPTY, SQWIDTH } from "./constants";

class Windows {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;

  board: string[][];

  constructor() {
    this.canvas = document.querySelector(".cnv");
    if (!this.canvas) {
      throw Error("canvas not found");
    }
    this.ctx = this.canvas!.getContext("2d");
    if (!this.ctx) {
      throw new Error("Failed to get canvas context");
    }
    this.width = this.canvas!.width = 200; // COL * SQWIDTH
    this.height = this.canvas!.height = 400; // ROW * SQWIDTH
    this.board = new Array(ROW)
      .fill(null)
      .map(() => new Array(COL).fill(EMPTY));
  }

  drawSquare(x: number, y: number, color: string) {
    this.ctx!.fillStyle = color;
    this.ctx!.fillRect(x * SQWIDTH, y * SQWIDTH, SQWIDTH, SQWIDTH);

    this.ctx!.strokeStyle = "#111111b";
    this.ctx!.strokeRect(x * SQWIDTH, y * SQWIDTH, SQWIDTH, SQWIDTH);
  }

  drawBoard(): void {
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        // x index then y index
        // row then column
        this.drawSquare(j, i, this.board[i][j]);
      }
    }
  }
}

export { Windows };
