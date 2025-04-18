import { cartesianToIsometric } from "../../static/helpers";
import { GraphicElementBase } from "./graphic.base";

export class WireGraphic extends GraphicElementBase {
  public graphics: Phaser.GameObjects.Graphics;

  constructor(
    protected scene: Phaser.Scene,
    protected x: number,
    protected y: number,
    protected x_end: number,
    protected y_end: number
  ) {
    super();

    const tileWidth = 64;
    const tileHeight = 32;
    const thickness = 6;

    const startIso = cartesianToIsometric(x, y, tileWidth, tileHeight);
    startIso.y += tileHeight / 2;

    const endIso = cartesianToIsometric(x_end, y_end, tileWidth, tileHeight);
    endIso.y += tileHeight / 2;

    this.graphics = scene.add.graphics();

    // Если начальная и конечная точка совпадают — рисуем "маркер"
    if (x === x_end && y === y_end) {
      const markerW = 16;
      const markerH = 8;
      const halfW = markerW / 2;
      const halfH = markerH / 2;

      this.graphics.setPosition(startIso.x, startIso.y);
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.lineStyle(1, 0xffffff, 0.4);

      this.graphics.beginPath();
      this.graphics.moveTo(0, -halfH);
      this.graphics.lineTo(halfW, 0);
      this.graphics.lineTo(0, halfH);
      this.graphics.lineTo(-halfW, 0);
      this.graphics.closePath();
      this.graphics.fillPath();
      this.graphics.strokePath();
    } else {
      // Рисуем толстую линию между двумя точками
      const dxTile = x_end - x;
      const dyTile = y_end - y;

      // Вектор, перпендикулярный линии (в тайловых координатах)
      const perpX = -dyTile;
      const perpY = dxTile;

      const perpIso = cartesianToIsometric(perpX, perpY, tileWidth, tileHeight);
      const perpNorm = new Phaser.Math.Vector2(perpIso.x, perpIso.y)
        .normalize()
        .scale(thickness / 2);

      const p1 = { x: startIso.x + perpNorm.x, y: startIso.y + perpNorm.y };
      const p2 = { x: endIso.x + perpNorm.x, y: endIso.y + perpNorm.y };
      const p3 = { x: endIso.x - perpNorm.x, y: endIso.y - perpNorm.y };
      const p4 = { x: startIso.x - perpNorm.x, y: startIso.y - perpNorm.y };

      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.lineStyle(1, 0xffffff, 0.4);

      this.graphics.beginPath();
      this.graphics.moveTo(p1.x, p1.y);
      this.graphics.lineTo(p2.x, p2.y);
      this.graphics.lineTo(p3.x, p3.y);
      this.graphics.lineTo(p4.x, p4.y);
      this.graphics.closePath();
      this.graphics.fillPath();
      this.graphics.strokePath();
    }

    this.graphics.setDepth(999);
  }

  getGraphics(): Phaser.GameObjects.GameObject {
    return this.graphics;
  }

  updateGraphic(): void {}
}
