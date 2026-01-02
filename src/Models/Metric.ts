import type { CounterMetric } from "./Metrics/CounterMetric";
import type { StarsMetric } from "./Metrics/StarsMetric";
import type { TimeMetric } from "./Metrics/TimeMetric";
import type { ToggleMetric } from "./Metrics/ToggleMetric";

export interface Metric <T> {
    id:string;
    name: string;
    description: string;
    typeName: MetricTypeNames;
    value: T;
    isValid(): boolean;
    update(newValue: T): void;
}

export type AnyMetric = CounterMetric | ToggleMetric | StarsMetric | TimeMetric;
export type MetricTypeNames = "Counter" | "Toggle" | "Stars" | "Time";