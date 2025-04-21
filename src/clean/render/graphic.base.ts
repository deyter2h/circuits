import { Connection } from '../bridge/connection';
import * as Phaser from 'phaser';

export abstract class GraphicElementBase extends Connection {
  constructor(public scene: Phaser.Scene, public x: number, public y: number) { super(); }
  abstract updateGraphic(): void;
  abstract getGraphics(): Phaser.GameObjects.GameObject;
  abstract handleCamera(): void;
}
