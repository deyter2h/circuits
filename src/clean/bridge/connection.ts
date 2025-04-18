import { GameEvents } from "../actions/events.enum";

export interface ConnectionEvent {
    event: GameEvents;
    data: any;
  }
  
  export class Connection {
    private event: ConnectionEvent | null = null;
  
    protected say(event: GameEvents, data?: any): void {
      this.event = { event, data };
    }
  
    public get(): ConnectionEvent | null {
      if (!this.event || !this.event.event) return null;
  
      const ret = this.event;
      this.event = null;
      return ret;
    }
  }
  