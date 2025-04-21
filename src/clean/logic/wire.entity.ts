import { LogicElementBase } from "./logic.base";

type CoordKey = string;

function makeKey(x: number, y: number): CoordKey {
  return `${x}:${y}`;
}

type WireCluster = {
  nodes: Set<CoordKey>;
  power: number;
};

export class WireManager {
  private wires = new Map<CoordKey, WireLogic>();
  private clusters: WireCluster[] = [];

  private offsets = [
    { x: -1, y: 0 }, { x: 1, y: 0 },
    { x: 0, y: -1 }, { x: 0, y: 1 },
    { x: -1, y: -1 }, { x: 1, y: 1 },
    { x: -1, y: 1 }, { x: 1, y: -1 },
  ];

  public add(wire: WireLogic) {
    const key = makeKey(wire.x, wire.y);
    this.wires.set(key, wire);

    const neighborKeys = this.offsets.map(off => makeKey(wire.x + off.x, wire.y + off.y));
    const affectedClusters: number[] = [];

    neighborKeys.forEach(nk => {
      const idx = this.clusters.findIndex(cluster => cluster.nodes.has(nk));
      if (idx !== -1 && !affectedClusters.includes(idx)) {
        affectedClusters.push(idx);
      }
    });

    if (affectedClusters.length === 0) {
      this.clusters.push({ nodes: new Set([key]), power: 0 });
    } else if (affectedClusters.length === 1) {
      this.clusters[affectedClusters[0]].nodes.add(key);
    } else {
      const mergedNodes = new Set<CoordKey>();
      let maxPower = 0;
      mergedNodes.add(key);
      affectedClusters.forEach(i => {
        this.clusters[i].nodes.forEach(k => mergedNodes.add(k));
        maxPower = Math.max(maxPower, this.clusters[i].power);
      });
      this.clusters = this.clusters.filter((_, i) => !affectedClusters.includes(i));
      this.clusters.push({ nodes: mergedNodes, power: maxPower });
    }
  }

  public update() {
    for (const cluster of this.clusters) {
      cluster.nodes.forEach(key => {
        const wire = this.wires.get(key);
        if (wire) {
          wire.setPower(cluster.power);
        }
      });
    }
  }

  public getClusterAt(x: number, y: number): WireCluster | null {
    const key = makeKey(x, y);
    return this.clusters.find(cluster => cluster.nodes.has(key)) || null;
  }

  public setPowerAt(x: number, y: number, power: number) {
    const cluster = this.getClusterAt(x, y);
    if (cluster) cluster.power = power;
  }
}

const wireman = new WireManager();

export class WireLogic extends LogicElementBase {
    public power = 0;
  
    constructor(public x: number, public y: number) {
      super(x, y);
      wireman.add(this);
    }
  
    public updateLogic(): void {
      wireman.update();
    }

    public getCluster(): ([number, number])[] | null {
      const cluster = wireman.getClusterAt(this.x, this.y);
      if (!cluster) return null;

      const arr = [...cluster.nodes];

      const out = [];

      for (const a of arr) {
        const [x, y] = a.split(':');
        out.push([Number(x), Number(y)]);
      }
      return out;
    }
  
    public setPower(power: number) {
      this.power = power;
    }
  }