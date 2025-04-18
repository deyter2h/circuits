export function cartesianToIsometric(x: number, y: number, tileWidth: number, tileHeight: number): Phaser.Math.Vector2 {
  return new Phaser.Math.Vector2(
    (x - y) * (tileWidth / 2),
    (x + y) * (tileHeight / 2)
  );
}

export function findNear(mapInstance:any, x: number, y: number): ([number, number])[] {
  const directions = [
    [0, -1],  // N
    [1, -1],  // NE
    [1, 0],   // E
    [1, 1],   // SE
    [0, 1],   // S
    [-1, 1],  // SW
    [-1, 0],  // W
    [-1, -1], // NW
  ];
  let founds = [];
  
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    // Check if neighboring tile exists in the map
    const neighborTile = mapInstance.getTile(nx, ny);
    
    if (!neighborTile) continue;

    if (neighborTile?.entites[0]?.id === 2) {
      founds.push([nx, ny]);
    }
  }

  return founds;
}