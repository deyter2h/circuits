import { WireLogic } from "../../logic/wire.entity";
import { WireGraphic } from "../../render/wire.entity";
import { Bridge, BridgeElement } from "../bridge";
import { ConnectionEvent } from "../connection";

export function wireEstablishandler(this: Bridge, event: ConnectionEvent, element: BridgeElement): void {
   const wire = this.runtime_objects.get('Wires').elements.find((e) => (e.logicElement.x === element.logicElement.x && e.logicElement.y === element.logicElement.y));

   const wireLogic: WireLogic = wire.logicElement as WireLogic;
   const wireGraphic: WireGraphic = wire.graphicElement as WireGraphic;

   const cluster = wireLogic.getCluster();
   
   const neighbors = [
      { x: 1, y: 0 }, { x: -1, y: 0 },
      { x: 0, y: 1 }, { x: 0, y: -1 },
      { x: -1, y: -1 }, { x: 1, y: 1 },
      { x: -1, y: 1 }, { x: 1, y: -1 },
      
    ];
    
    for (const off of neighbors) {
      const nx = wireLogic.x + off.x;
      const ny = wireLogic.y + off.y;
      const nKey = `${nx}:${ny}`;
      if (cluster.some(([x, y]) => x === nx && y === ny)) {
        wireGraphic.connectTo(nx, ny);
      }
    }
}