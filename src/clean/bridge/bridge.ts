import { LogicElementBase } from "../logic/logic.base";
import { GraphicElementBase } from "../render/graphic.base";
import { State } from "../store/state";
import { ConnectionEvent } from "./connection";
import map_data from '../store/map.json';
import { OBJECT_MAP } from "../store/mapped.tiles";
import { handleTileClicked } from "./handlers";
import { GameEvents } from "../actions/events.enum";
import { v4 as uuidv4 } from 'uuid';
import { genEmpty } from "../store/gen_empty_map";
import { wireEstablishandler } from "./handlers/wire.establish.handler";

export interface BridgeElement {
    className: string;
    uniqueName: string;
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

    constructor(public scene: Phaser.Scene) {
        try {
            this.loadFromState(JSON.parse(localStorage.getItem('Map')));
        }
        catch(e) {
            console.log('Error loading map from localstorage', e);
            this.loadFromState(map_data);
        }
    }

    public destroyObject(group: string, uniqueName: string): void {
        const elements = this.runtime_objects.get(group)?.elements;
        if (!elements) return;

        const objIndex = elements.findIndex((e) => e.uniqueName === uniqueName);

        if (objIndex === -1) return;

        elements[objIndex].graphicElement.getGraphics().destroy(true);

        elements.splice(objIndex, 1);
    }

    private loadFromState(state: State): void {
        for (const group in state.groups) {
            const entities = state.groups[group];
            entities.forEach(entity => {
                this.dispatchState(group, entity.className, entity.x, entity.y);
            });
        }
    }

    private dispatchState(group: string, name: string, x: number, y: number): void {
        const mapping = OBJECT_MAP[name];

        if (!mapping) {
            console.log('No mapping for', name);
            return;
        }

        const logic = new mapping.logic(x, y);
        const graphic = new mapping.graphic(this.scene, x, y);

        this.add(group, name, logic, graphic, 16);
        //temptemptemp
        if (name === 'Wire') wireEstablishandler.call(this, null, { logicElement: logic, graphicElement: graphic });

    }

    private saveMap(): void {
        const state: State = {
            groups: {

            }
        };

        this.runtime_objects.forEach((group, groupKey) => {
            group.elements.forEach((e) => {
                if (!state.groups[groupKey]) state.groups[groupKey] = [];
                state.groups[groupKey].push({
                    uniqueName: e.uniqueName,
                    className: e.className,
                    x: e.logicElement.x,
                    y: e.logicElement.y,
                });
            })
        })

        localStorage.setItem('Map', JSON.stringify(state));
    }

    private dispatchEvent(conEvent: ConnectionEvent, element: BridgeElement): void {
        switch (conEvent.event) {
            case GameEvents.TileClicked: {
                handleTileClicked.call(this, conEvent, element);
                break;
            }
            default:
                console.warn(`[Bridge] Unhandled event: ${conEvent.event}`);
        }

        this.saveMap();

    }

    private dispatchGroup(groupName: string, groupArray: BridgeElement[]): void {
        groupArray.forEach((element) => {
            const logicSays = element.logicElement.get();
            const graphicSays = element.graphicElement.get();

            element.graphicElement.updateGraphic();

            if (logicSays !== null) this.dispatchEvent(logicSays, element);
            if (graphicSays !== null) this.dispatchEvent(graphicSays, element);
        });
    }

    public add(group: string, name: string, logicElement: LogicElementBase, graphicElement: GraphicElementBase, interval: number = 16): void {
        if (!this.runtime_objects.has(group)) {
            this.runtime_objects.set(group, { elements: [], interval, lastUpdate: 0 });
        }

        this.runtime_objects.get(group)!.elements.push({ uniqueName: uuidv4(), className: name, logicElement, graphicElement });
    }

    public update(currentTime: number): void {
        this.runtime_objects.forEach((groupData, groupName) => {
            if (currentTime - groupData.lastUpdate >= groupData.interval) {
                this.dispatchGroup(groupName, groupData.elements);
                groupData.lastUpdate = currentTime;
            }
        });
    }

    public getWorldObjects(): Phaser.GameObjects.GameObject[] {
        const all: Phaser.GameObjects.GameObject[] = [];
        this.runtime_objects.forEach(group => {
            group.elements.forEach(e => {
                const g = e.graphicElement.getGraphics();
                if (g) all.push(g);
            });
        });
        return all;
    }
}