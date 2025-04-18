import { LogicElementBase } from "./logic.base";

export class EmptyTileLogic extends LogicElementBase {
    constructor(public x: number,
        public y: number,) { super(x, y); }
    public updateLogic(): void {

    }
}