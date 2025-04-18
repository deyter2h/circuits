import { Connection } from "../bridge/connection";

export abstract class LogicElementBase extends Connection {
  public abstract x: number;
  public abstract y: number;
  constructor(x: number, y: number) { super(); }
  abstract updateLogic(): void;
}
