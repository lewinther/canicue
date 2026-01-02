import type { Metric, MetricTypeNames } from "Models/Metric";

export class CounterMetric implements Metric<number> {
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
        this.typeName = 'Counter';
        this.value = initialValue;
    }

    increment( amount: number = 1 ) { this.value += amount }
    decrement( amount: number = 1 ) { this.value -= amount }

    isValid(): boolean {
        return this.value >= 0 && this.hasDescription() && this.hasName()
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

