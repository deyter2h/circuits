import { BaseTile } from "../buildings/base.tile";
import { MAPPING_ENTITIES } from "../static/mapping.entities";

import { MAPPING_TILES } from "../static/mapping.tiles";

export class CMap {
    private readonly loadedTiles: Map<string, BaseTile> = new Map();
    private name: string = "No name";
     
    public setObject(mapObject: any): void {
        this.name = mapObject.name;

        mapObject.tiles.forEach((tile: any) => {
            const tileIndex = MAPPING_TILES.findIndex((e) => e.name === tile.name);
            const tileInstance = new MAPPING_TILES[tileIndex].class(tile.x, tile.y);

            tile.entities.forEach((entity: any, index: number) => {
                const entityIndex = MAPPING_ENTITIES.findIndex((e) => e.name === entity.name);
                const entityInstance = new MAPPING_ENTITIES[entityIndex].class();
                tileInstance.assignEntity(entityInstance);
            })
                
            this.loadedTiles.set(`${tile.x}:${tile.y}`, tileInstance);
        });
    }

    public getObject(): any {
        const obj = {
            name: this.name,
            tiles: [],
        };
        
        this.loadedTiles.forEach((tile) => {
            const entities = [];

            tile.entites.forEach((e) => {
                entities.push({ name: e.name });
            });
            obj.tiles.push({
                x: tile.x,
                y: tile.y,
                name: tile.name,
                entities,
            });
        });
        return obj;
    }

    public placeTile(index: number, x: number, y: number): BaseTile {
        const tile = new MAPPING_TILES[index].class(x, y);
        this.loadedTiles.set(`${x}:${y}`, tile);
        return tile;
    }

    public removeTile(x: number, y: number) {}

    public getTile(x: number, y: number) {
        return this.loadedTiles.get(`${x}:${y}`);
    }

    public getTiles() {
        return this.loadedTiles;
    }
}
