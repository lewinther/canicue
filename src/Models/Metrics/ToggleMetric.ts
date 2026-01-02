import type { Metric, MetricTypeNames } from "Models/Metric";

export class ToggleMetric implements Metric<boolean> {
    id:string;
    name: string;
    description: string;
    typeName: MetricTypeNames;
    value: boolean;

    constructor(
        id: string = crypto.randomUUID(),
        name: string = '', 
        description: string = '',
        initialValue: boolean = false,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.typeName = 'Toggle';
        this.value = initialValue;
    }

    toggle() { this.value = !this.value }

    isValid(): boolean {
        return this.hasDescription() && this.hasName()
    }

    update(newValue: unknown): void {
        this.value = Boolean(newValue); 
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

