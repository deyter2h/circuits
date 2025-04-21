import * as Phaser from 'phaser';
import { cartesianToIsometric } from "../../static/helpers";
import { GraphicElementBase } from "./graphic.base";

export class WireGraphic extends GraphicElementBase {
  public graphics: Phaser.GameObjects.Graphics;
  private startTime: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.graphics = scene.add.graphics();

    this.startTime = scene.time.now;

    this.draw();
    this.graphics.setDepth(999);
    this.handleCamera();
  }

  private draw(): void {
    const tileWidth = 64;
    const tileHeight = 32;

    this.graphics.clear();
    const pos = cartesianToIsometric(this.x, this.y, tileWidth, tileHeight);
    pos.y += tileHeight / 2;

    const markerW = 12;
    const markerH = 6;

    this.graphics.fillStyle(0xff0000, 1);
    this.graphics.lineStyle(1, 0xffffff, 0.3);
    this.graphics.beginPath();
    this.graphics.moveTo(pos.x, pos.y - markerH / 2);
    this.graphics.lineTo(pos.x + markerW / 2, pos.y);
    this.graphics.lineTo(pos.x, pos.y + markerH / 2);
    this.graphics.lineTo(pos.x - markerW / 2, pos.y);
    this.graphics.closePath();
    this.graphics.fillPath();
    this.graphics.strokePath();
    return;
  }

  public connectTo(x2: number, y2: number): void {
    //mem leak
    const tileWidth = 64;
    const tileHeight = 32;

    const start = cartesianToIsometric(this.x, this.y, tileWidth, tileHeight);
    const end = cartesianToIsometric(x2, y2, tileWidth, tileHeight);

    start.y += tileHeight / 2;
    end.y += tileHeight / 2;

    this.graphics.lineStyle(1, 0xff0000, 1);
    this.graphics.beginPath();
    this.graphics.moveTo(start.x, start.y);
    this.graphics.lineTo(end.x, end.y);
    this.graphics.strokePath();
  }

  public updateGraphic(): void {
    const time = this.scene.time.now - this.startTime;
    const pulse = 0.75 + 0.25 * Math.sin(time / 200);
    this.graphics.setAlpha(pulse);
  }

  public handleCamera(): void {
    this.scene.cameras.getCamera('UI')?.ignore(this.getGraphics());
  }

  public getGraphics(): Phaser.GameObjects.GameObject {
    return this.graphics;
  }
}
