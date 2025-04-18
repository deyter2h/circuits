import { BaseEntity } from "../../base.entity";

export class WireEntity extends BaseEntity {
    private voltage: number = 5;
    private connections: Set<WireEntity> = new Set();
    private outlet: boolean = false;

    public name = 'Wire';

    constructor() {
        super();
    }
  
    public connect(other: WireEntity): void {
      if (other === this || this.connections.has(other)) return;
      this.connections.add(other);
      other.connections.add(this); // двустороннее соединение
    }
  
    public setVoltage(amount: number): void {
      this.voltage = amount;
    }
  
    public setOutlet(isOutlet: boolean): void {
      this.outlet = isOutlet;
    }
  
    public isOutlet(): boolean {
      return this.outlet;
    }
  
    public act(): void {
      const network = this.getConnectedNetwork(new Set());
      const totalVoltage = [...network].reduce((sum, wire) => sum + wire.voltage, 0);
      const hasOutlet = [...network].some(w => w.isOutlet());
  
      if (hasOutlet) {
        // Обнуляем у всех, кроме outlet
        network.forEach(wire => {
          if (!wire.isOutlet()) wire.voltage = 0;
        });
        const outletWire = [...network].find(w => w.isOutlet());
        if (outletWire) outletWire.voltage += totalVoltage;
      } else {
        // Распределяем энергию поровну
        const equalVoltage = totalVoltage / network.size;
        network.forEach(wire => wire.voltage = equalVoltage);
      }

      console.log(this.voltage);
    }
  
    private getConnectedNetwork(visited: Set<WireEntity>): Set<WireEntity> {
      visited.add(this);
      for (const wire of this.connections) {
        if (!visited.has(wire)) wire.getConnectedNetwork(visited);
      }
      return visited;
    }
  }