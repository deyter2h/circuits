import { GrassTileLogic } from "../../logic/grass.tile";
import { GrassTileGraphic } from "../../render/grass.tile";
import { Bridge, BridgeElement } from "../bridge";
import { ConnectionEvent } from "../connection";

export function grassCreatedHandler(this: Bridge, event: ConnectionEvent, element: BridgeElement): void {
    const x = element.graphicElement.x;
    const y = element.graphicElement.y;
  
    const newGraphic = new GrassTileGraphic(this.scene, x, y);
    const newLogic = new GrassTileLogic(x, y);
  
    // Анимация
    const obj = newGraphic.getGraphics();
    obj.setAlpha(0).setScale(0.5);
  
    this.scene.tweens.add({
      targets: obj,
      alpha: 1,
      scale: 1,
      ease: 'Sine.easeOut',
      duration: 300,
    });
  
    this.destroyObject('Tiles', element.uniqueName);

    this.add('Tiles', 'Grass', newLogic, newGraphic);

    console.log(this.runtime_objects.get('Tiles').elements.length);
}