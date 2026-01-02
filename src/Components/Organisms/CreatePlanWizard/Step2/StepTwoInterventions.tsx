import * as React from 'react';
import type { Intervention } from 'Models/Intervention';
import InterventionForm from './Intervention/InterventionForm';
import InterventionList from './Intervention/InterventionList';

export interface StepTwoInterventionsProps {
    interventions: Intervention[];
    addIntervention: (value:Intervention) => void;
    updateIntervention: (value:Intervention) => void;
    onGoBack: () => void;
    onSubmit: () => void;
}

const Interventions: React.FC<StepTwoInterventionsProps> = ({ 
    interventions,
    addIntervention,
    updateIntervention,
    onGoBack,
    onSubmit,
}) => {
    const [selectedIntervention, setSelectedIntervention] = React.useState<Intervention | undefined>(undefined);
    const [formActive, setFormActive] = React.useState<boolean>(false);
    if(interventions.length < 1 && !formActive) setFormActive(true);

    function SaveIntervention(value:Intervention) {
        if(selectedIntervention)
            updateIntervention(value);
        else
            addIntervention(value);
        setSelectedIntervention(undefined);
        setFormActive(false);
    }

    function selectIntervention(value:Intervention) {
        setSelectedIntervention(value);
        setFormActive(true);
    }

    function onCloseForm() {
        console.log('closing form');
        setSelectedIntervention(undefined);
        setFormActive(false);
    }

    return (
        <>
            {formActive && (
                <InterventionForm
                    intervention={selectedIntervention}
                    onSubmit={SaveIntervention}
                    onCloseForm={onCloseForm}>
                </InterventionForm>
            )}
            {!formActive && (
                <>
                    <InterventionList
                        interventions={interventions}
                        onSelectIntervention={selectIntervention}>
                    </InterventionList>
                    <button
                        type="button"
                        className="w-40 py-1 px-3 place-self-center object-center rounded-full bg-purple-300 text-white font-semibold hover:bg-purple-400 text-xs"
                        onClick={() => setFormActive(true)}
                    >
                        Add intervention
                    </button>

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
                        onClick={onGoBack}>
                        Go back
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
                                ${interventions.length > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={() => onSubmit()}
                            disabled={interventions.length < 1}>
                            Next step
                        </button>
                    </div>
                </div>
                </>
            )}
        </>
    );
};

export default Interventions;