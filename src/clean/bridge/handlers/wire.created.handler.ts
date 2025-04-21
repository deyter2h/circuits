import { WireLogic } from "../../logic/wire.entity";
import { WireGraphic } from "../../render/wire.entity";
import { Bridge, BridgeElement } from "../bridge";
import { ConnectionEvent } from "../connection";

export function wireCreatedHandler(this: Bridge, event: ConnectionEvent, element: BridgeElement): void {
    const x = element.graphicElement.x;
    const y = element.graphicElement.y;

    const newLogic = new WireLogic(x, y);
    const newGraphic = new WireGraphic(this.scene, x, y);

    this.add('Wires', 'Wire', newLogic, newGraphic);
}