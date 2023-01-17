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
      gravity: {
        y: 200
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

let bird = null;
let totalDelta = null;

function create() {
 this.add.image(0, 0, 'sky-background').setOrigin(0);
 bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0);
}

// 60fps
function update(time, delta) {
  totalDelta += delta;

  if (totalDelta < 1000) {
    return;
  }
  console.log(bird.body.velocity.y);
  totalDelta = 0;

}

new Phaser.Game(config);