import { MAPPING_TILES } from "../static/mapping.tiles";
import { MAPPING_ENTITIES } from "../static/mapping.entities";
import { INVENTORY_SIZE } from "../static/constants";

export class Inventory {
    private cells: (string | null)[] = new Array<string>(INVENTORY_SIZE).fill(null);
    private selectedCell: number | null = null;

    public add(name: string): void {
        const emptySlotIndex = this.cells.findIndex(t => t === null);
        if (emptySlotIndex !== -1) {
            this.cells[emptySlotIndex] = name;
        }
    }

    public setSelected(index: number): void {
        this.selectedCell = index;
    }

    public getSelected(index: number): string | null {
        return this.cells[this.selectedCell];
    }

    constructor() { }
}