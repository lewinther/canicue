import * as React from 'react';
import { type AnyMetric } from 'Models/Metric';

export interface MetricListProps {
    metrics: AnyMetric[],
    onSelectMetric: ( value: AnyMetric ) => void;
}

const MetricList: React.FC<MetricListProps> = ({
    metrics,
    onSelectMetric
}) => {

    function selectMetric( value: AnyMetric ) {
        onSelectMetric(value);
    }

    if(metrics.length < 1) return (<></>);

    return (
        <>
            <div aria-label="Saved metrics" className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Metrics</label>
                {metrics.map((metric, index) => (
                    <div key={index} className="mb-2 border rounded-lg bg-gray-50">
                        <button
                            className="w-full text-left px-4 py-2 focus:outline-none"
                                onClick={() => selectMetric(metric)}>
                            <span className="font-medium text-gray-700">{metric.name || 'Untitled metric'}</span>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MetricList;
