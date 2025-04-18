import * as Phaser from "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { CMap } from "./map/map";
import { MAPPING_TILES } from "./static/mapping.tiles";
import { Inventory } from "./inventory/inventory.main";
import { InventoryUi } from "./graphics/InventoryUi";
import { CameraController } from "./graphics/CameraController";
import { MAPPING_ENTITIES } from "./static/mapping.entities";
import { MapGeneration } from "./graphics/MapGeneration";
import { Wire } from "./graphics/Wire";
import { findNear } from "./static/helpers";

const mapInstance = new CMap();

class MainScene extends Phaser.Scene {
  rexUI: RexUIPlugin;
  private uiCam;
  private inventoryUi!: InventoryUi;
  private cameraController!: CameraController;

  constructor() {
    super({ key: "MainScene" });
  }

  preload(): void {
    MAPPING_TILES.forEach(mapping => {
      this.load.image(mapping.name, mapping.texture);
    });

    MAPPING_ENTITIES.forEach(mapping => {
      this.load.image(mapping.name, mapping.texture);
    });
    this.load.image('null', 'public/null.jpg');
  }

  private placeFromInventory(x: number, y: number) {
    const type = this.inventoryUi.getSelectedName();
    switch (type) {
      case 'Wire': {
        const founds = findNear(mapInstance, x, y);
        Wire(this, founds, x, y);
        break;
      }
    }
  }

  create(): void {
    this.game.canvas.oncontextmenu = (e) => e.preventDefault();
    this.uiCam = this.cameras.add(0, 0, this.scale.width, this.scale.height);
    this.uiCam.setScroll(0, 0);

    this.inventoryUi = new InventoryUi(this, this.rexUI, () => {});
    this.inventoryUi.setTextureForIndex(0, 'Wire');
    this.inventoryUi.addToScene();

    const graphics = MapGeneration(this.uiCam, this, mapInstance);
  
    this.uiCam.ignore(graphics);

    const mainCam = this.cameras.main;

    const uiObjects = this.inventoryUi.getUIObjects();
    mainCam.ignore(uiObjects);

    this.cameraController = new CameraController(this, mainCam);
  }

  update(): void {
    mapInstance.getTiles().forEach((tile) => {
      tile.entites.forEach((entity) => {
        entity.baseAct();
      });
    });
   }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  scene: MainScene,
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      }
    ]
  },
  fps: {
    target: 30,
    forceSetTimeOut: true
  }
};

new Phaser.Game(config);
