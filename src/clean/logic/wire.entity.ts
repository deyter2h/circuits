import { LogicElementBase } from "./logic.base";

export class WireLogic extends LogicElementBase {
    private connections: WireLogic[] = [];

    constructor(public x: number,
        public y: number,) { super(x, y); }

    public updateLogic(): void {
        
    }

    public addConnection(wire: WireLogic): void {
        if (this === wire) return;

        this.connections.push(wire);
    }

    public getConnections(): WireLogic[] {
        return this.connections;
    }
}