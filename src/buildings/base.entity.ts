
export abstract class BaseEntity {
    public abstract name: string;
    protected abstract act(): void;

    public baseAct(): void { this.act(); }
}