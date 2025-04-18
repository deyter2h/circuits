import { EmptyTileGraphic } from "../render/empty.tile"
import { EmptyTileLogic } from "../logic/empty.tile"

export const TILE_MAP: Record<string, { logic: any, graphic: any }> = {
    EmptyTile: {
      logic: EmptyTileLogic,
      graphic: EmptyTileGraphic,
    },
  };