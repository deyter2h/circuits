import { BaseTile } from "../buildings/base.tile";

export interface MapStructure {
    name: string,
    tiles: BaseTile[],
}