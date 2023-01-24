import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import PlayScene from "./scenes/PlayScene";
import ScoreScene from "./scenes/ScoreScene";
import PauseScene from "./scenes/PauseScene";

const WIDTH = 400;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH/ 10, y: HEIGHT / 2};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const scenes = [PreloadScene, MenuScene, PlayScene, ScoreScene, PauseScene];
const createScene = scene => new scene(SHARED_CONFIG);
const initScenes = () => scenes.map(createScene);

const config = {
  // WEbGL, web graphics JS Api for rendering 2D and 3D grpahics
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    // Arcade physics plugin manages physics simulation
    default: 'arcade',
    arcade: {
      //debug: true,
    }
  },
  scene: initScenes(),
}

new Phaser.Game(config);