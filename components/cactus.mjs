import { SPEED } from "./config.mjs";

export default class Cactus {
  constructor(x, y, w, h, imgsrc) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = new Image();
    this.img.src = imgsrc;
  }
  draw(context) {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.move();
  }
  move() {
    this.x = this.x - SPEED;
  }
  isOutofScreen() {
    return this.x < 0; //true/false
  }
}
