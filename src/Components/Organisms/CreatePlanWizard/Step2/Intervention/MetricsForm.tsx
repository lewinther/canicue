import * as React from 'react';
import { type AnyMetric, type MetricTypeNames } from 'Models/Metric';
import FormTextAtom from "Components/Atoms/FormTextField/FormTextAtom";

import StarsMetricType from 'Components/Organisms/MetricTypes/StarsMetricType';
import CounterMetricType from 'Components/Organisms/MetricTypes/CounterMetricType';
import TimeMetricType from 'Components/Organisms/MetricTypes/TimeMetricType';
import ToggleMetricType from 'Components/Organisms/MetricTypes/ToggleMetricType';
import { CounterMetric } from 'Models/Metrics/CounterMetric';
import { ToggleMetric } from 'Models/Metrics/ToggleMetric';
import { StarsMetric } from 'Models/Metrics/StarsMetric';
import { TimeMetric } from 'Models/Metrics/TimeMetric';

export interface MetricFormProps {
    metric: AnyMetric | undefined;
    onSubmit: ( value: AnyMetric ) => void;
    onCloseForm: () => void;
}

const MetricForm: React.FC<MetricFormProps> = ({
    metric,
    onSubmit,
    onCloseForm
}) => {
    const [name, setMetricName] = React.useState<string>(metric?.name ?? '');
    const [description, setMetricDescription] = React.useState<string>(metric?.description ?? '');
    const [type, setType] = React.useState< AnyMetric | undefined>( undefined );
    const [showMetricTypes, setShowMetricTypes] = React.useState<boolean> (false);

    function isValid() :boolean {
        return (name && description && type) ? true : false;
    }

    
    function createNewMetricFromTypeName(typeName: MetricTypeNames): AnyMetric {
        switch(typeName) {
            case "Counter": return new CounterMetric();
            case "Toggle": return new ToggleMetric();
            case "Stars": return new StarsMetric();
            case "Time": return new TimeMetric();
            default:
                throw new Error("Unknown metric type in createNewMetricFromTypeName(): " + typeName)
        }
    }

    function submit() {
        if (!type) return;

        if (metric) {
            metric.name = name;
            metric.description = description;
            metric.update(type.value);
            return onSubmit(metric);
        }

        const newMetric = createNewMetricFromTypeName(type.typeName);

        newMetric.id = crypto.randomUUID();
        newMetric.name = name;
        newMetric.description = description;
        newMetric.update(type.value);

        onSubmit(newMetric)

        setMetricName('');
        setMetricDescription('');
        setType(undefined);
    }

    function closeForm() {
        setMetricName('');
        setMetricDescription('');
        setType(undefined);
        onCloseForm();
    }

    function onSelectMetricType(type: AnyMetric) {
        setType(type);
        setShowMetricTypes(false)
    }

    const metricTypes = {
        Counter: () => new CounterMetric(),
        Toggle: () => new ToggleMetric(),
        Stars: () => new StarsMetric(),
        Time: () => new TimeMetric(),
    }


    const metricComponentsMap: Record<MetricTypeNames, React.FC<any>> = {
        Counter: CounterMetricType,
        Toggle: ToggleMetricType,
        Stars: StarsMetricType,
        Time: TimeMetricType
    };

    const metricTypeNamesList = Object.keys(metricTypes) as MetricTypeNames[]

    const displayMetricTypesList = () : React.JSX.Element => (
        <>
            <div className="grid grid-cols-1 gap-1 mt-2">
                {metricTypeNamesList.map(typeName => {
                    const create = metricTypes[typeName]
                    const metricInstance = create()
                    const MetricComponent = metricComponentsMap[typeName];
                    if (!metricInstance) return;

                    return (
                        <div
                            key={typeName}
                            onClick={() => onSelectMetricType(metricInstance)}
                            className={`
                                cursor-pointer pl-3 pb-1 rounded-lg border transition
                                ${type?.typeName === typeName ? 'border-pink-400 bg-pink-50' : 'border-amber-50 bg-white'}
                            `}    
                        >
                            <MetricComponent metric={metricInstance} showTypeName={true} />
                        </div>
                    )
                })}
            </div>
        </>
    )

    const expandMetricTypes = () : React.JSX.Element => (
        <>
            <div className="mt-4">
                <button
                    className="w-full text-left px-4 py-2 rounded-md border border-orange-300 bg-white"
                    onClick={() => setShowMetricTypes(prev => !prev)}
                >
                    {type ? type.typeName : "Select metric type"}  
                    <span className="float-right text-orange-300">
                        {showMetricTypes ? "▲" : "▼"}
                    </span>
                </button>

                {showMetricTypes && (
                    <div className="m 2 rounded-md border border-orange-300 bg-white">
                        {displayMetricTypesList()}
                    </div>
                )}
            </div>
        </>
    )

    return (
        <>
            <div aria-label='Metrics form'>
                <FormTextAtom
                    label="Metric"
                    placeholder="Name of metric"
                    value={name}
                    onChange={e => setMetricName(e.target.value)}
                />
                <FormTextAtom
                    label="Description"
                    placeholder="Describe what the client should notice"
                    value={description}
                    onChange={event => setMetricDescription(event.target.value)}
                />
                {expandMetricTypes()}
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
                    onClick={closeForm}>
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
                            ${isValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => submit()}
                        disabled={!isValid()}>
                        Save metric
                    </button>
                </div>
            </div>
        </>
    );
};

export default MetricForm;