import { BaseTile } from "../buildings/base.tile";
import { DirtTile } from "../buildings/implementations/tiles/dirt.tile";
import { EmptyTile } from "../buildings/implementations/tiles/empty.tile";
import { GrassTile } from "../buildings/implementations/tiles/grass.tile";
import { StoneTile } from "../buildings/implementations/tiles/stone.tile";

export const MAPPING_TILES = [
    {
        name: 'Empty',
        class: EmptyTile,
        texture: 'public/black.jpg',
    },
    {
        name: 'Dirt',
        class: DirtTile,
        texture: 'public/dirt.jpg',
    },
    {
        name: 'Stone',
        class: StoneTile,
        texture: 'public/stone.jpg',
    },
    {
        name: 'Grass',
        class: GrassTile,
        texture: 'public/grass.jpg',
    },
    
]