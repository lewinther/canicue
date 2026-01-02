import type { Metric, MetricTypeNames } from "Models/Metric";

export class StarsMetric implements Metric<number> {
    id:string;
    name: string;
    description: string;
    typeName: MetricTypeNames;
    value: number;

    constructor(
        id: string = crypto.randomUUID(),
        name: string = '', 
        description: string = '',
        initialValue: number = 0,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.typeName = 'Stars';
        this.value = initialValue;
    }

    setStars(stars:number) {
        this.value = Math.min(Math.max(stars, 0), 5)
    }

    isValid(): boolean {
        return this.value >= 1 && this.hasDescription() && this.hasName()
    }

    update(newValue: unknown): void {
        this.value = Number(newValue);
    }

    private hasName(): boolean {
        return this.name 
            && this.name.trim() !== '' 
            ? true : false;
    }
    private hasDescription(): boolean{
        return this.description
            && this.description.trim() !== ''
            ? true : false;
    }
}

