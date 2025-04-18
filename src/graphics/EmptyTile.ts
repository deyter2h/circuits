import { cartesianToIsometric } from "../static/helpers";

export function EmptyTile(scene: Phaser.Scene, mapInstance:any, x: number, y: number): Phaser.GameObjects.Graphics {
    const tileWidth = 64;
    const tileHeight = 32;
    const isoPos = cartesianToIsometric(x, y, tileWidth, tileHeight);
    const halfW = tileWidth / 2;

    const graphics = scene.add.graphics({ x: isoPos.x, y: isoPos.y });
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

    graphics.on("pointerover", () => graphics.setAlpha(0.1));
    graphics.on("pointerout", () => graphics.setAlpha(1));
    graphics.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      const heldTime = pointer.upTime - pointer.downTime;
      if (pointer.leftButtonReleased() && heldTime < 500) {
        
      }
    });

    return graphics;
  }