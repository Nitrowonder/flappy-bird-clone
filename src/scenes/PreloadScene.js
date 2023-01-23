import Phaser from "phaser";


class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    // Loading assets, such as images, music, animation, etc
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pauseButton', 'assets/pause.png');
    }

    create() {
        this.scene.start('MenuScene');
    }

    createBackground() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }
}

export default PreloadScene;