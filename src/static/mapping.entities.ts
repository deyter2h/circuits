import { RockEntity } from "../buildings/implementations/entities/rock.entity";
import { TreeEntity } from "../buildings/implementations/entities/tree.entity";
import { WireEntity } from "../buildings/implementations/entities/wire.entity";

export const MAPPING_ENTITIES = [
    {
        name: 'Rock',
        class: RockEntity,
        texture: 'public/rock.jpg',
    },
    {
        name: 'Tree',
        class: TreeEntity,
        texture: 'public/tree.jpg',
    },
    {
        name: 'Wire',
        class: WireEntity,
        texture: 'public/redstone.webp',
    },
]