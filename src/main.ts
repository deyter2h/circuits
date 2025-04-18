import * as Phaser from 'phaser';
import { Bridge } from './clean/bridge/bridge';
import { CameraController } from './clean/render/CameraController';

export class MainScene extends Phaser.Scene {
  private bridge!: Bridge;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
  }

  create(): void {
    this.bridge = new Bridge(this);
    new CameraController(this, this.cameras.main);
  }

  update(time: number, delta: number): void {
    this.bridge.update(time);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#333333',
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(config);