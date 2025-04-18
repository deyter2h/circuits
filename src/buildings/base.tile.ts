import { MAX_TILE_ENTITIES } from "../static/constants";
import { BaseEntity } from "./base.entity";

export abstract class BaseTile {
    public readonly x: number;
    public readonly y: number;

    public abstract name: string;
    
    //Stack
    public readonly entites = new Array<BaseEntity | null>();
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public assignEntity(entity: BaseEntity | null): void {
        this.entites.push(entity);
    }

    public highLight(): void {}

    public break(): void {}
}