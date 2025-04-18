import { Connection } from '../bridge/connection';
import * as Phaser from 'phaser';

export abstract class GraphicElementBase extends Connection {
  protected abstract scene: Phaser.Scene;
  protected abstract x: number;
  protected abstract y: number;

  abstract updateGraphic(): void;
  abstract getGraphics(): Phaser.GameObjects.GameObject;
}
