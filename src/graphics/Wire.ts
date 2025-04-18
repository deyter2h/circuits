import { CMap } from "../map/map";
import { cartesianToIsometric } from "../static/helpers";
import { findNear } from "../static/helpers";

export function Wire(scene: Phaser.Scene, founds: ([number, number])[], x: number, y: number): Phaser.GameObjects.Graphics[] {
    const graphics = [];

    founds.forEach((f) => {
      graphics.push(wireDraw(scene, x, y, f[0], f[1]));
    });

    if (!founds.length) graphics.push(wireDraw(scene, x, y, x, y));

    return graphics;
}


function wireDraw(scene: Phaser.Scene, startX: number, startY: number, endX: number, endY: number): Phaser.GameObjects.Graphics {
    const tileWidth = 64;
    const tileHeight = 32;
    const thickness = 6;
  
    const startIso = cartesianToIsometric(startX, startY, tileWidth, tileHeight);
    startIso.y += tileHeight / 2;
    
    // Same start and end — draw red marker diamond
    if (startX === endX && startY === endY) {
      const markerWidth = 16;
      const markerHeight = 8;
      const halfW = markerWidth / 2;
      const halfH = markerHeight / 2;
      
      const graphics = scene.add.graphics({ x: startIso.x, y: startIso.y });
      graphics.fillStyle(0xff0000, 1);
      graphics.lineStyle(1, 0xffffff, 0.4);
      graphics.beginPath();
      graphics.moveTo(0, -halfH);      // top
      graphics.lineTo(halfW, 0);       // right
      graphics.lineTo(0, halfH);       // bottom
      graphics.lineTo(-halfW, 0);      // left
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
     
      graphics.setDepth(999);

      return graphics;
    }

    // Else: draw line between start and end tiles
    const endIso = cartesianToIsometric(endX, endY, tileWidth, tileHeight);
    endIso.y += tileHeight / 2;

    const dxTile = endX - startX;
    const dyTile = endY - startY;

    const perpX = -dyTile;
    const perpY = dxTile;

    const perpIso = cartesianToIsometric(perpX, perpY, tileWidth, tileHeight);
    const perpNorm = new Phaser.Math.Vector2(perpIso.x, perpIso.y).normalize().scale(thickness / 2);

    const p1 = { x: startIso.x + perpNorm.x, y: startIso.y + perpNorm.y };
    const p2 = { x: endIso.x + perpNorm.x, y: endIso.y + perpNorm.y };
    const p3 = { x: endIso.x - perpNorm.x, y: endIso.y - perpNorm.y };
    const p4 = { x: startIso.x - perpNorm.x, y: startIso.y - perpNorm.y };

    const graphics = scene.add.graphics();
    graphics.fillStyle(0xff0000, 1);
    graphics.lineStyle(1, 0xffffff, 0.4);

    graphics.beginPath();
    graphics.moveTo(p1.x, p1.y);
    graphics.lineTo(p2.x, p2.y);
    graphics.lineTo(p3.x, p3.y);
    graphics.lineTo(p4.x, p4.y);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    graphics.setDepth(999);
    
    return graphics;
  }