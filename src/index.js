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
      gravity: {
        y: 400
      }
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

// Loading assets, such as images, music, animation, etc
function preload() {
  this.load.image('sky-background', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}
const velocity = 200;
const flapVelocity = 250;

let bird = null;

function create() {
  this.add.image(0, 0, 'sky-background').setOrigin(0);
  bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0);
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
  bird.body.velocity.x = velocity;
}

// 60fps
function update(time, delta) {
  if(bird.x >= config.width - bird.width) {
    bird.body.velocity.x = -velocity;
  }
  if (bird.x <= 0) {
    bird.body.velocity.x = velocity;
  }
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);