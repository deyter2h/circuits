export interface State {
    groups: {
      [groupName: string]: EntityData[]; // any group, like "Tiles", "NPCs", "Whatever"
    };
  }
  
  export interface EntityData {
    name: string;
    x: number;
    y: number;
  }
  