import type { AnyMetric} from "./Metric";

export interface iTrainingLog {
    clientId: string;
    dogId: string;
    behavioristId: string;
    planId: string;
    id: string;
    createdAt: number;
    metricLogs: MetricLog[]
}

export class TrainingLog implements iTrainingLog {
    clientId: string;
    dogId: string;
    behavioristId: string;
    planId: string;
    id: string;
    createdAt: number;
    metricLogs: MetricLog[]

    constructor(
        clientId: string = '',
        dogId: string = '',
        behavioristId: string = '',
        planId: string = '',
        id: string = crypto.randomUUID(),
        createdAt: number = Math.floor(Date.now() / 1000),
        metricLogs: MetricLog[] = [],
    ) {
        this.clientId = clientId;
        this.dogId = dogId;
        this.behavioristId = behavioristId;
        this.planId = planId;
        this.id = id;
        this.createdAt = createdAt;
        this.metricLogs = metricLogs;
    }
}

export interface MetricLog {
    metric: AnyMetric;
    value: number | boolean | string;
}