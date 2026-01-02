import * as React from 'react';
import FormTextAtom from '../../../Atoms/FormTextField/FormTextAtom';
import type { PlanDetails } from 'Models/PlanDetails';

interface StepOneBasisInformationProps {
    details: PlanDetails | undefined;
    onChange: (
        field: keyof PlanDetails, 
        value: string) => void;
    onClose: () => void
    onSubmit:() => void
}

const StepOneBasisInformation: React.FC<StepOneBasisInformationProps> = ({ 
        details, 
        onChange,
        onClose,
        onSubmit
    }) => (
    <>
        <FormTextAtom
            label="Target behavior *"
            placeholder="Note behavioral issue"
            value={details?.name ?? ''}
            onChange={(e) => onChange('name', e.target.value)}
        />
        <FormTextAtom
            label="Summary of issue *"
            placeholder="Summarize findings from observations and talk with client"
            value={details?.description ?? ''}
            onChange={(e) => onChange('description', e.target.value)}
            multiline={true}
            rows={4}
        />
        <FormTextAtom
            label="Goal with plan"
            placeholder="Agreed upon goal with client"
            value={details?.goal ?? ''}
            onChange={(e) => onChange('goal', e.target.value)}
        />
        <FormTextAtom
            label="Theory related to plan"
            placeholder="Add places to read more about issue"
            value={details?.theory ?? ''}
            onChange={(e) => onChange('theory', e.target.value)}
        />

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
                ${details?.isValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => onSubmit()}
            disabled={!details?.isValid()}
        >
            Next step
        </button>
        </div>
    </div>
    </>
);

export default StepOneBasisInformation;
