import { CMap } from "../map/map";
import MapData from '../map/data.json';
import { EmptyTile } from "./EmptyTile";
import { Wire } from "./Wire";
import { findNear } from "../static/helpers";

export function MapGeneration(uiCam: Phaser.Cameras.Scene2D.Camera, scene: Phaser.Scene, mapInstance: CMap): Phaser.GameObjects.Graphics[] {
    const localdata = localStorage.getItem('map');
    const graphics = [];

    if (localdata) {
      mapInstance.setObject(JSON.parse(localdata));
      
    }
    else {
      mapInstance.setObject(MapData);
      localStorage.setItem('map', JSON.stringify(mapInstance.getObject()));
      
    }
    const tiles = mapInstance.getObject().tiles;

    tiles.forEach((tile) => {
      switch (tile.name) {
        case 'Empty': {
          graphics.push(EmptyTile(scene, mapInstance, tile.x, tile.y));
          break;
          
        }
      }
      tile.entities.forEach((entity) => {
        switch (entity.name) {
          case 'Wire': {
            const surr = findNear(mapInstance, tile.x, tile.y);
            graphics.push(Wire(scene, surr, tile.x, tile.y));
            break;
          }
        }
      });
    });

    return graphics;
}