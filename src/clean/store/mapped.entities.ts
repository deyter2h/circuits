import { WireLogic } from "../logic/wire.entity";
import { WireGraphic } from "../render/wire.entity";


export const ENTITY_MAP: Record<string, { logic: any, graphic: any }> = {
    Wire: {
      logic: WireLogic,
      graphic: WireGraphic,
    },
  };