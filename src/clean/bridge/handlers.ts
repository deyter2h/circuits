import { ConnectionEvent } from './connection';
import { BridgeElement } from './bridge';
import { WireLogic } from '../logic/wire.entity';
import { WireGraphic } from '../render/wire.entity';
import { Bridge } from './bridge';
import { EmptyTileLogic } from '../logic/empty.tile';
import { EmptyTileGraphic } from '../render/empty.tile';

export function handleTileClicked(this: Bridge, event: ConnectionEvent, element: BridgeElement): void {
  const x = element.logicElement.x;
  const y = element.logicElement.y;

  const offsets = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

   offsets.forEach((o) => {

    const exists = this.runtime_objects.get('Tiles').elements.find((e) => (e.logicElement.x === o.x + x && e.logicElement.y === o.y + y))

    if (!exists) {
      this.add('Tiles', 'Empty tile', new EmptyTileLogic(o.x + x, o.y + y), new EmptyTileGraphic(this.scene, o.x + x, o.y + y));
    }
  });

}

export function handlePlaceWire(this: Bridge, event: ConnectionEvent, element: BridgeElement): void {
  const x = element.logicElement.x;
  const y = element.logicElement.y;

  if (!this.runtime_objects.get('Wires')?.elements.find((e) => (e.logicElement.x === x && e.logicElement.y === y))) {
    this.add('Wires', 'Wire', new WireLogic(x, y), new WireGraphic(this.scene, x, y, x, y));
  }

  const offsets_low = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  const offsets_high = [
    { x: -1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
  ];

  offsets_low.concat(offsets_high).forEach((o) => {

    const exists = this.runtime_objects.get('Wires')?.elements.find((e) => (e.logicElement.x === o.x + x && e.logicElement.y === o.y + y))
    console.log(exists);
    if (exists) {
      this.add('Wires', 'Wire', new WireLogic(o.x + x, o.y + y), new WireGraphic(this.scene, x, y, o.x + x, o.y + y));
    }
  });
}
