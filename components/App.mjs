//first we draw canvas
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  FRAME_RATE,
  SPEED,
  MIN_TIME,
  MAX_TIME,
} from "./config.mjs";
import Player from "./player.mjs";
import Floor from "./floor.mjs";
import Cactus from "./cactus.mjs";

let can;
let context;
let player; //global variable
let floor;
let restartImg = new Image();
restartImg.src = "./dino-images/symbolrestart.png";
let restartX,
  restartY,
  restartW = 40,
  restartH = 40;

window.addEventListener("load", GameStart);

function GameStart() {
  //calls every function
  PrepareCanvas();
  loadSprites();
  GameLoop();
  BindingEvents();
}

function BindingEvents() {
  window.addEventListener("keydown", Jump);
}

function Jump(event) {
  if (event.code === "Space") {
    player.jumpDino();
  }
}

function PrepareCanvas() {
  can = document.getElementById("canva");
  can.width = GAME_WIDTH;
  can.height = GAME_HEIGHT;
  context = can.getContext("2d");

  can.addEventListener("click", function (event) {
    const rect = can.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
      mouseX >= restartX &&
      mouseX <= restartX + restartW &&
      mouseY >= restartY &&
      mouseY <= restartY + restartH
    ) {
      // Reload the game
      RestartGame();
    }
  });
}

function loadSprites() {
  player = new Player();
  floor = new Floor();
  LoadCactus();
}

let CacArr = [];
function LoadCactus() {
  const cactusArr = [
    "../dino-images/cactus_1.png",
    "../dino-images/cactus_2.png",
    "../dino-images/cactus_3.png",
  ];
  var gap = 1;
  for (var cac of cactusArr) {
    const Cacti = new Cactus(GAME_WIDTH * gap, GAME_HEIGHT - 130, 48, 100, cac);
    gap++;
    CacArr.push(Cacti);
  }
}

function RandomTime() {
  //chooses random time between given range
  return Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1)) + MIN_TIME;
}

let delay = 0;
let canSpawn = true;
function RandomCactus() {
  //chooses different cactus
  if (delay > 80 && canSpawn == true) {
    //to give space between cacti
    delay = 0;
    canSpawn = false;
    setTimeout(function () {
      LoadCactus();
      canSpawn = true;
    }, RandomTime());
  }
  delay++;
}

function PrintCactus(context) {
  for (var cactus of CacArr) {
    cactus.draw(context);
  }
}
function RemoveUsedCactus() {
  CacArr = CacArr.filter((c) => !c.isOutofScreen());
  //remove older cactus from array and put again for coming on screen
}
function GameLoop() {
  ClearScreen(); //clear screen at frame rate in a loop and then load player
  if (Collision()) {
    context.font = "30px 'Press Start 2P'";
    context.fillStyle = "grey";
    context.fillText("Game Over", GAME_WIDTH / 3, GAME_HEIGHT / 3);
    //restart
    restartW = 40;
    restartH = 40;
    restartX = GAME_WIDTH / 2 - 50;
    restartY = GAME_HEIGHT / 2 - 30;
    context.drawImage(restartImg, restartX, restartY, restartW, restartH);

    player.draw(context);
    floor.draw(context);
    PrintCactus(context);
    RandomCactus();
    RemoveUsedCactus();
    ScoreBoard();
  } else {
    player.draw(context);
    floor.draw(context);
    PrintCactus(context);
    RandomCactus();
    RemoveUsedCactus();
    ScoreBoard();
    player.fallDino();
    setTimeout(function () {
      //callback function
      requestAnimationFrame(GameLoop); //loop will go on at framerate
    }, FRAME_RATE);
  }
}

let score = 0;
function ScoreBoard() {
  score++;
  if (!localStorage.maxscore) {
    localStorage.maxscore = score;
  }
  if (localStorage.maxscore < score) {
    localStorage.maxscore = score;
  }
  context.font = "15px 'Press Start 2P'";
  context.fillStyle = "grey";
  context.fillText(score.toString().padStart(5, 0), GAME_WIDTH - 100, 40);
  context.fillText(
    localStorage.maxscore.toString().padStart(5, 0),
    GAME_WIDTH - 200,
    40
  );
}

function ClearScreen() {
  context.fillStyle = "white";
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function Iscollide(Cacti) {
  //colliding conditions
  return (
    player.x < Cacti.x + Cacti.w &&
    Cacti.x < player.x + player.w &&
    player.y < Cacti.y + Cacti.h &&
    Cacti.y < player.y + player.h
  );
}

function Collision() {
  for (var Cacti of CacArr) {
    if (Iscollide(Cacti)) {
      return true;
    }
  }
  return false;
}

function RestartGame() {
  // Reset all state
  score = 0;
  delay = 0;
  canSpawn = true;
  CacArr = [];
  // Recreate player and floor and restart game
  player = new Player();
  floor = new Floor();
  LoadCactus();
  requestAnimationFrame(GameLoop);
}
