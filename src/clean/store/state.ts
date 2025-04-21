export interface State {
    groups: {
      [groupName: string]: EntityData[]; // any group, like "Tiles", "NPCs", "Whatever"
    };
  }
  
  export interface EntityData {
    className: string;
    uniqueName: string;
    x: number;
    y: number;
  }
  