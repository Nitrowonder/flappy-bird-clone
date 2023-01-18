import Phaser from "phaser";

const config = {
  // WEbGL, web graphics JS Api for rendering 2D and 3D grpahics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin manages physics simulation
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

const velocity = 200;
const pipesToRender = 4;
const flapVelocity = 250;
const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 }

let bird = null;
let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];


// Loading assets, such as images, music, animation, etc
function preload() {
  this.load.image('sky-background', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky-background').setOrigin(0);
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);

  for (let i = 0; i < pipesToRender; i++) {
    pipeHorizontalDistance += 400;

    const upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }


  //bird.body.velocity.x = velocity;
  bird.body.gravity.y = 400;

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

// 60fps
function update(time, delta) {
  // if(bird.x >= config.width - bird.width) {
  //   bird.body.velocity.x = -velocity;
  // }
  // if (bird.x <= 0) {
  //   bird.body.velocity.x = velocity;
  // }

  if (bird.y > config.height || bird.y < 0 - bird.height) {
    restartBirdPosition();
  }
}

function placePipe(uPipe, lPipe) {
  pipeHorizontalDistance += 400;
  let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

  uPipe.x = pipeHorizontalDistance;
  uPipe.y = pipeVerticalPosition;


  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;

  uPipe.body.velocity.x = -200;
  lPipe.body.velocity.x = -200;
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);