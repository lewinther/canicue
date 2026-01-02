import * as React from 'react';
import { InterventionModel, type Intervention } from 'Models/Intervention';
import type { AnyMetric } from 'Models/Metric';
import MetricForm from './MetricsForm';
import MetricList from './MetricList';
import FormTextAtom from "Components/Atoms/FormTextField/FormTextAtom";

export interface InterventionFormProps {
    intervention: Intervention | undefined;
    onSubmit: (value:Intervention) => void;
    onCloseForm: () => void;
}

const InterventionForm: React.FC<InterventionFormProps> = ({
    intervention,
    onSubmit,
    onCloseForm
}) => {
    const [metricFormActive, setMetricFormActive] = React.useState<boolean>(false);
    const [name, setInterventionName] = React.useState<string>(intervention?.name ?? '');
    const [description, setinterventionDescription] = React.useState<string>(intervention?.description ?? '');
    const [metrics, setMetrics] = React.useState<AnyMetric[]>(intervention?.metrics ?? []);
    const [selectedMetric, setSelectedMetric] = React.useState<AnyMetric | undefined>();
    function isValid() :boolean {
        return (name && description) ? true : false;
    }

    function submit() {
        if(intervention)
            onSubmit(new InterventionModel(intervention.id, name, description, metrics))
        else 
            onSubmit(new InterventionModel(crypto.randomUUID(), name, description, metrics))
        setInterventionName('');
        setinterventionDescription('');
    }

    function closeForm() {
        setInterventionName('');
        setinterventionDescription('');
        onCloseForm();
    }

    function saveMetric( value: AnyMetric ) {
        if(selectedMetric)
            setMetrics(metrics.map((item) => (item.id === selectedMetric.id ? value : item)));
        else
            setMetrics([...metrics, value]);
        setMetricFormActive(false);
        setSelectedMetric(undefined);
    }
    function closeMetricForm() {
        setMetricFormActive(false);
        setSelectedMetric(undefined);
    }

    function selectMetric( value: AnyMetric ) {
        setSelectedMetric(value);
        setMetricFormActive(true);
    }

    return (
        <>
            {metricFormActive && (
                <MetricForm
                    metric={selectedMetric}
                    onSubmit={saveMetric}
                    onCloseForm={closeMetricForm}>
                </MetricForm>
            )}
            {!metricFormActive && (
                <>
                    <div aria-label='Intervention form'>
                        <FormTextAtom
                            label="Intervention *"
                            placeholder="Name of primary intervention"
                            value={name}
                            onChange={e => setInterventionName(e.target.value)}
                        />
                        <FormTextAtom
                            label="Description of intervention *"
                            placeholder="Describe how the client is expected to approach the intervention"
                            value={description}
                            multiline={true}
                            onChange={e => setinterventionDescription(e.target.value)}
                        />
                        <MetricList
                            metrics={metrics}
                            onSelectMetric={selectMetric}>
                        </MetricList>
                        <button
                            type="button"
                            className="w-40 py-1 px-3 place-self-center object-center rounded-full bg-purple-300 text-white font-semibold hover:bg-purple-400 text-xs"
                            onClick={() => setMetricFormActive(true)}>
                            Add metric
                        </button>
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
                                Save intervention
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default InterventionForm;