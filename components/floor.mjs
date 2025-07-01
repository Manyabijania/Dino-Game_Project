import { GAME_HEIGHT, GAME_WIDTH, FRAME_RATE, SPEED } from "./config.mjs";

export default class Floor {
  constructor() {
    this.x = 0;
    this.h = 24;
    this.w = 2400;
    this.y = GAME_HEIGHT - 60;
    this.img = new Image();
    this.img.src = "../dino-images/ground.png";
    this.speed = SPEED;
  }
  draw(context) {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
    context.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
    //second draw is needed so that no space comes in between and the images are joined.
    if (this.x < -this.w) { 
      // restarting the x from 0 and movement continues infinitly
      this.x = 0;
    }
    this.move();
  }
  move() {
    this.x = this.x - this.speed; //moving the x coord to move the floor
  }
}
