import { ConnectionEvent } from './connection';
import { BridgeElement } from './bridge';
import { Bridge } from './bridge';
import { InventoryGraphic } from '../render/inventory';
import { grassCreatedHandler } from './handlers/grass.created.handler';
import { wireCreatedHandler } from './handlers/wire.created.handler';
import { wireEstablishandler } from './handlers/wire.establish.handler';

export function handleTileClicked(this: Bridge, event: ConnectionEvent, element: BridgeElement): void {
  const inventory = this.runtime_objects.get('Inventory').elements.find((e) => e.className === 'InventoryBar').graphicElement as InventoryGraphic;
  const item = inventory.getSelectedItem();
  if (!item) return; //Open it or idk

  switch (item) {
    case 'Grass': {
      grassCreatedHandler.call(this, event, element);
      break;
    }
    case 'Wire': {
      wireCreatedHandler.call(this, event, element);
      wireEstablishandler.call(this, event, element);
      break;
    }
  }
}

// export function handlePlaceWire(this: Bridge, event: ConnectionEvent, element: BridgeElement): void {
//   const inventory = this.runtime_objects.get('Inventory').elements.find((e) => e.name === 'InventoryBar').graphicElement as InventoryGraphic;
 
//   if (inventory.getSelectedItem() === null) {
//     return;
//   }

//   const x = element.logicElement.x;
//   const y = element.logicElement.y;

//   if (this.runtime_objects.get('Wires')?.elements.find((e) => (e.logicElement.x === x && e.logicElement.y === y))) {
//     return;
//   }

//   const offsets_low = [
//     { x: -1, y: 0 },
//     { x: 1, y: 0 },
//     { x: 0, y: -1 },
//     { x: 0, y: 1 },
//   ];

//   const offsets_high = [
//     { x: -1, y: -1 },
//     { x: 1, y: 1 },
//     { x: -1, y: 1 },
//     { x: 1, y: -1 },
//   ];

//   const targetWire: WireLogic = new WireLogic(x, y);

//   this.add('Wires', 'Wire', targetWire, new WireGraphic(this.scene, x, y, x, y));

//   offsets_low.concat(offsets_high).forEach((o) => {

//     const exists = this.runtime_objects.get('Wires')?.elements.find((e) => (e.logicElement.x === o.x + x && e.logicElement.y === o.y + y))
    
//     if (exists) {
//       const newWire: WireLogic = new WireLogic(o.x + x, o.y + y);
//       this.add('Wires', 'Wire', newWire, new WireGraphic(this.scene, x, y, o.x + x, o.y + y));
//     }
//   });
// }
