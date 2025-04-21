import { v4 as uuidv4 } from 'uuid';

export function genEmpty() {
    const obj = {
        groups: {
          Tiles: []
        },
      };
      
      
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            obj.groups.Tiles.push({
                x,
                y,
                className: 'EmptyTile',
                uniqueName: uuidv4(),
            });
        }
      }

      return obj
}