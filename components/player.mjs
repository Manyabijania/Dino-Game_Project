import { GAME_HEIGHT, GRAVITY } from "./config.mjs";
export default class Player {
  constructor() {
    this.x = 10;
    this.h = 94;
    this.w = 88;
    this.y = GAME_HEIGHT - 124;
    this.img = new Image();
    //this.img.src = "../dino-images/standing_still.png";
    this.runImages = [new Image(), new Image()];
    this.runImages[0].src = "/dino-images/dino_run1.png";
    this.runImages[1].src = "/dino-images/dino_run2.png";
    this.index = 0;
    // Start with the first image
    this.img = this.runImages[this.index];
  }
  draw(context) {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.runningAnimation();
  }
  runningAnimation() {
    if (this.index >= 2) {
      this.index = 0;
    }
    this.img = this.runImages[this.index];
    this.index++;
  }
  jumpDino() {
    var FLOOR = GAME_HEIGHT - 124;
    if (this.y >= FLOOR - 1) {
      this.y = this.y - 190;
    }
  }
  fallDino() {
    var FLOOR = GAME_HEIGHT - 124;
    if (this.y < FLOOR) {
      this.y = this.y + GRAVITY;
    }
  }
}
