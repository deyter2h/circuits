import { LogicElementBase } from "../logic/logic.base";
import { GraphicElementBase } from "../render/graphic.base";
import { State } from "../store/state";
import { ConnectionEvent } from "./connection";
import map_data from '../store/map.json';
import { TILE_MAP } from "../store/mapped.tiles";
import { handleTileClicked, handlePlaceWire } from "./handlers";
import { GameEvents } from "../actions/events.enum";

export interface BridgeElement {
    logicElement: LogicElementBase;
    graphicElement: GraphicElementBase;
}

type BridgeGroup = {
    elements: BridgeElement[];
    interval: number; // в мс
    lastUpdate: number;
};

export class Bridge {
    public runtime_objects: Map<string, BridgeGroup> = new Map();

    public saved_objects: State = map_data;

    constructor(public scene: Phaser.Scene) { this.loadFromState(); }

    private loadFromState(): void {
        for (const group in this.saved_objects.groups) {
            const entities = this.saved_objects.groups[group];
            entities.forEach(entity => {
                this.dispatchState(group, entity.name, entity.x, entity.y);
            });
        }
    }

    private dispatchState(group: string, name: string, x: number, y: number): void {
        const mapping = TILE_MAP[name];
        if (!mapping) return;
        
        const logic = new mapping.logic(x, y);
        const graphic = new mapping.graphic(this.scene, x, y);

        this.add(group, name, logic, graphic, 16);
    }

    private dispatchEvent(conEvent: ConnectionEvent, element: BridgeElement): void {
        switch (conEvent.event) {
          case GameEvents.TileClicked:
            return handleTileClicked.call(this, conEvent, element);
          case GameEvents.WirePlaced:
            return handlePlaceWire.call(this, conEvent, element);
          default:
            console.warn(`[Bridge] Unhandled event: ${conEvent.event}`);
        }
      }

    private dispatchGroup(groupName: string, groupArray: BridgeElement[]): void {
        groupArray.forEach((element) => {
            const logicSays = element.logicElement.get();
            const graphicSays = element.graphicElement.get();

            if (logicSays !== null) this.dispatchEvent(logicSays, element);
            if (graphicSays !== null) this.dispatchEvent(graphicSays, element);
        });
    }

    public add(group: string, name: string, logicElement: LogicElementBase, graphicElement: GraphicElementBase, interval: number = 16): void {
        if (!this.runtime_objects.has(group)) {
            this.runtime_objects.set(group, { elements: [], interval, lastUpdate: 0 });
        }

        this.runtime_objects.get(group)!.elements.push({ logicElement, graphicElement });
        
        if (!this.saved_objects.groups[group]) {
            this.saved_objects.groups[group] = [];
          }
          
        this.saved_objects.groups[group].push({ name, x: logicElement.x, y: logicElement.y });
    }

    public update(currentTime: number): void {
        this.runtime_objects.forEach((groupData, groupName) => {
            if (currentTime - groupData.lastUpdate >= groupData.interval) {
                this.dispatchGroup(groupName, groupData.elements);
                groupData.lastUpdate = currentTime;
            }
        });
    }
}