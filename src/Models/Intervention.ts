import type { AnyMetric } from './Metric';

export interface Intervention {
    id:string;
    name: string;
    description: string;
    metrics: AnyMetric[];
    addMetric: (value: AnyMetric) => void;
    updateMetric: (value: AnyMetric) => void;
    isValid(): boolean;
}

export class InterventionModel implements Intervention {
    id:string;
    name: string;
    description: string;
    metrics: AnyMetric[];
    addMetric( value: AnyMetric ) : void {
        this.metrics.push(value);
    }
    updateMetric( value: AnyMetric ):void {
        this.metrics = UpdateMetricPosition(this.metrics, value);
    };
    isValid(): boolean {
        return this.hasName() && this.hasDescription() && this.hasMetrics()
    }

    constructor(
        id: string = crypto.randomUUID(),
        name: string = '',
        description: string = '',
        metrics: AnyMetric[] = [],
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.metrics = metrics;
    }

    private hasName(): boolean {
        return this.name && 
            this.name.trim() !== ''
            ? true : false
    }
    private hasDescription(): boolean {
        return this.description && 
            this.description.trim() !== ''
            ? true : false
    }
    private hasMetrics(): boolean {
        return this.metrics.length !== 0;
    }


}

function UpdateMetricPosition( metrics:AnyMetric[], value:AnyMetric ) : AnyMetric[] {
    return metrics.map((item) => (item.id === value.id ? value : item))
}

