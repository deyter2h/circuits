import * as Phaser from 'phaser';
import { cartesianToIsometric } from '../../static/helpers';
import { GraphicElementBase } from './graphic.base';
import { GameEvents } from '../actions/events.enum';

export class EmptyTileGraphic extends GraphicElementBase {
  public graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.graphics = this.createGraphic();
    this.handleCamera();
  }

  private createGraphic(): Phaser.GameObjects.Graphics {
    const tileWidth = 64;
    const tileHeight = 32;
    const isoPos = cartesianToIsometric(this.x, this.y, tileWidth, tileHeight);
    const halfW = tileWidth / 2;

    const graphics = this.scene.add.graphics({ x: isoPos.x, y: isoPos.y });
    graphics
      .fillStyle(0x000000, 1)
      .lineStyle(1, 0xffffff, 0.3)
      .beginPath()
      .moveTo(0, 0)
      .lineTo(halfW, tileHeight / 2)
      .lineTo(0, tileHeight)
      .lineTo(-halfW, tileHeight / 2)
      .closePath()
      .fillPath()
      .strokePath()
      .setInteractive(new Phaser.Geom.Polygon([
        { x: 0, y: 0 },
        { x: halfW, y: tileHeight / 2 },
        { x: 0, y: tileHeight },
        { x: -halfW, y: tileHeight / 2 },
      ]), Phaser.Geom.Polygon.Contains);

    graphics.on('pointerover', () => {graphics.setAlpha(0.7);} );
    graphics.on('pointerout', () => graphics.setAlpha(1));
    graphics.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (pointer.leftButtonDown()) {
          this.say(GameEvents.TileClicked);
        }
      });

    return graphics;
  }

  handleCamera(): void {
    this.scene.cameras.getCamera('UI').ignore(this.getGraphics());
  }

  public updateGraphic(): void {
      
  }

  public getGraphics(): Phaser.GameObjects.Graphics {
    return this.graphics;
  }
}
