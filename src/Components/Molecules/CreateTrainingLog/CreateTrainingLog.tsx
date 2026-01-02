import type { Intervention } from 'Models/Intervention';
import * as React from 'react'
import type { AnyMetric } from 'Models/Metric';
import CounterMetricType from 'Components/Organisms/MetricTypes/CounterMetricType';
import type { CounterMetric } from 'Models/Metrics/CounterMetric';
import StarsMetricType from 'Components/Organisms/MetricTypes/StarsMetricType';
import type { StarsMetric } from 'Models/Metrics/StarsMetric';
import type { TimeMetric } from 'Models/Metrics/TimeMetric';
import TimeMetricType from 'Components/Organisms/MetricTypes/TimeMetricType';
import type { ToggleMetric } from 'Models/Metrics/ToggleMetric';
import ToggleMetricType from 'Components/Organisms/MetricTypes/ToggleMetricType';
import CloseIcon from 'Components/Assets/CloseIcon';
import { useUserStore } from 'Stores/UserStore';
import { TrainingLog, type MetricLog } from 'Models/TrainingLog';
import type { BehaviouralModificationPlan } from 'Models/BehavioralModificationPlan';

interface TrainingLogProps {
    trainingLog: TrainingLog | undefined;
    interventions: Intervention [] | undefined;
    plan: BehaviouralModificationPlan | undefined;
    onClose: () => void;
}

const CreateTrainingLog: React.FC<TrainingLogProps> = ({
    trainingLog: log,
    interventions,
    plan,
    onClose
}) => {
    const userStore = useUserStore();
    const [metricLogs, setMetricLogs] = React.useState<{ [metricId: string]: any }>({});
    const normalizedInterventions = Array.isArray(interventions)
        ? interventions
        : [interventions];

    const behavioristId = plan?.behavioristId;
    const clientId = userStore.user?.id;
    const dogId = plan?.dogId;
    const planId = plan?.id;

    const handleMetricChange = (metricId: string, value: any) => {
        setMetricLogs(prev => ({
            ...prev,
            [metricId]: value
        }));
    };
    
    function closeFlow() {
        onClose()
    }

    function pullAllMetrics() {
        let metricList: AnyMetric[] = []
        if(!normalizedInterventions.length) return metricList;
        normalizedInterventions.forEach((intervention) => {
            if(intervention?.metrics) {
                metricList.push(...intervention.metrics);
            }
        });
        return metricList
    }

    function objectEntries<T>(obj: { [key: string]: T }): [string, T][] {
        return Object.keys(obj).map(key => [key, obj[key]] as [string, T]);
    }
    
    function saveTrainingLog() {
        if(!userStore.user) return;

        const allMetrics = pullAllMetrics();
        const metricLogArray: MetricLog[] = objectEntries(metricLogs).map(
            ([metricId, value]) => {
                const metric = allMetrics.find(m => m.id === metricId);
                if (!metric) throw new Error(`Metric not found: ${metricId}`);
                return {
                    metric,
                    value
                };
            }
        );

        const newTrainingLog = new TrainingLog(
            log?.clientId || clientId,
            log?.dogId || dogId,
            log?.behavioristId || behavioristId,
            log?.planId || planId,
            log?.id,
            log?.createdAt,
            metricLogArray, 
        );
        
        console.log("You have successfully created a log");
        console.log('Log saved ' , newTrainingLog);
        
        setMetricLogs([])
        closeFlow()
    }

    const renderCounterMetric = (metric: CounterMetric): React.JSX.Element => {
        return(
            <>
                <CounterMetricType 
                    metric={metric} 
                    value={metricLogs[metric.id]}
                    showTypeName={false} 
                    onChange={(value) => handleMetricChange(metric.id, value)}
                />
            </>
        )
    }
    const renderStarsMetric = (metric: StarsMetric): React.JSX.Element => {
        return(
            <>
                <StarsMetricType 
                    metric={metric} 
                    value={metricLogs[metric.id]}
                    showTypeName={false} 
                    onChange={(value) => handleMetricChange(metric.id, value)}
                />
            </>
        )
    }
    const renderTimeMetric = (metric: TimeMetric): React.JSX.Element => {
        return(
            <>
                <TimeMetricType 
                    metric={metric} 
                    showTypeName={false} 
                    onChange={(value) => handleMetricChange(metric.id, value)}
                />
            </>
        )
    }
    const renderToggleMetric = (metric: ToggleMetric): React.JSX.Element => {
        return(
            <>
                <ToggleMetricType 
                    metric={metric} 
                    value={metricLogs[metric.id]}
                    showTypeName={false} 
                    onChange={(value) => handleMetricChange(metric.id, value)}
                />
            </>
        )
    }

    const renderMetric = (metric: AnyMetric): React.JSX.Element => {
        switch(metric.typeName)
        {
            case 'Counter':
                return renderCounterMetric(metric as CounterMetric);
            case 'Toggle':
                return renderToggleMetric(metric as ToggleMetric)
            case 'Stars':
                return renderStarsMetric(metric as StarsMetric)
            case 'Time':
                return renderTimeMetric(metric as TimeMetric)
        }
    }

    const renderAllMetrics = (): React.JSX.Element => {
        const metrics = pullAllMetrics()

        return(
            <>
                {metrics?.map((metric, index) => (
                        <div 
                            key={index}
                            className=''
                        >
                            {renderMetric(metric)}
                        </div>
                ))
                }
            </>
        )
    }

    return(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-scroll">
                <div className="relative w-full max-w-lg bg-[#FFF6F2] rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto scrollbar-hidden">
                    <div className='pb-4'>
                        <h2 className="text-center -mt-2 text-lg font-semibold">Log training</h2>
                        <button
                            className="absolute top-4 right-4 flex items-center justify-center "
                            onClick={closeFlow}
                            aria-label="Close"
                            style={{ zIndex: 10 }}
                        >
                            <CloseIcon color="#f472b6" size={30} />
                        </button>
                    </div>
                    <div className='flex flex-col gap-2'>
                    {renderAllMetrics()}
                    </div>
                    <div className="flex flex-row gap-4 mt-4">
                        <button
                            className={`
                                flex-1 
                                py-2 
                                rounded-full 
                                border 
                                border-gray-300 
                                bg-white 
                                text-gray-700 
                                font-semibold 
                                hover:bg-gray-100`}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <div className="relative flex-1">
                            <button
                                className={`
                                    w-full 
                                    py-2 
                                    rounded-full 
                                    bg-pink-400 
                                    text-white 
                                    font-bold 
                                    hover:bg-pink-500 
                                    transition-colors 
                                    `}
                                onClick={() => saveTrainingLog()}
                            >
                                Log training
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CreateTrainingLog;