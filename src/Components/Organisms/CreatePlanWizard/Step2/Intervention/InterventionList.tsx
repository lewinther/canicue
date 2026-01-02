import * as React from 'react';
import { type Intervention } from 'Models/Intervention';

export interface InterventionListProps {
    interventions: Intervention[];
    onSelectIntervention: (value:Intervention) => void;
}

const InterventionList: React.FC<InterventionListProps> = ({
    interventions,
    onSelectIntervention
}) => {

    function selectIntervention(value:Intervention) {
        onSelectIntervention(value);
    }

    if(interventions.length < 1) return (<></>);

    return (
        <>
            <div aria-label="Saved interventions" className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Interventions</label>
                {interventions.map((intervention, index) => (
                    <div key={index} className="mb-2 border rounded-lg bg-gray-50">
                        <button
                            className="w-full text-left px-4 py-2 focus:outline-none"
                                onClick={() => selectIntervention(intervention)}>
                            <span className="font-medium text-gray-700">{intervention.name || 'Untitled intervention'}</span>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default InterventionList;