import * as Phaser from 'phaser';
import { Bridge } from './clean/bridge/bridge';
import { CameraController } from './clean/render/CameraController';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { LogicElementBase } from './clean/logic/logic.base';
import { InventoryGraphic } from './clean/render/inventory';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { InventoryLogic } from './clean/logic/inventory';
import { v4 as uuidv4 } from 'uuid';

export class MainScene extends Phaser.Scene {
  private bridge!: Bridge;
  rexUI: UIPlugin;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('Wire', 'public/redstone.webp');
    this.load.image('Grass', 'public/grass.jpg');
  }

  create(): void {
    const worldCam = this.cameras.main;
    const uiCam = this.cameras.add(0, 0, this.scale.width, this.scale.height, false, 'UI');
    uiCam.setScroll(0, 0);

    this.bridge = new Bridge(this);

    const inventory = new InventoryGraphic(this, 0, 0, this.rexUI);
    inventory.setTextureForIndex(0, 'Wire');
    inventory.setTextureForIndex(1, 'Grass');
  
    this.bridge.add('Inventory', 'InventoryBar', new InventoryLogic(0, 0), inventory);
  
    new CameraController(this, worldCam);
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
  },
  plugins: {
      scene: [
        {
          key: 'rexUI',
          plugin: RexUIPlugin,
          mapping: 'rexUI'
        }
      ]
    }
};

const game = new Phaser.Game(config);
