import type { Metric, MetricTypeNames } from "Models/Metric";

export class TimeMetric implements Metric<number> {
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
        this.typeName = 'Time';
        this.value = initialValue;
    }

    setValueFromHMS(hours: number, minutes: number, seconds: number){
        this.value = 
            hours * 3600000 +
            minutes * 60000 +
            seconds * 1000;
    }

    getHMSfromValue() {
        const hours = Math.floor(this.value / 3600000);
        const minutes = Math.floor((this.value % 3600000) / 60000);
        const seconds = Math.floor((this.value % 60000) / 1000);
        return { hours, minutes, seconds };
    }

    isValid(): boolean {
        return this.value > 0 && this.hasDescription() && this.hasName()
    }

    update(newValue: unknown ): void {
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

