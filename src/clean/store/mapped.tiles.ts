import { EmptyTileGraphic } from "../render/empty.tile"
import { EmptyTileLogic } from "../logic/empty.tile"
import { WireLogic } from "../logic/wire.entity";
import { WireGraphic } from "../render/wire.entity";
import { GrassTileLogic } from "../logic/grass.tile";
import { GrassTileGraphic } from "../render/grass.tile";

export const OBJECT_MAP: Record<string, { logic: any, graphic: any }> = {
  EmptyTile: {
    logic: EmptyTileLogic,
    graphic: EmptyTileGraphic,
  },
  Wire: {
    logic: WireLogic,
    graphic: WireGraphic,
  },
  Grass: {
    logic: GrassTileLogic,
    graphic: GrassTileGraphic,
  }
};