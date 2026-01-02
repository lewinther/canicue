import type { BehaviouralModificationPlan } from 'Models/BehavioralModificationPlan';
import * as React from 'react';

import DisplayPlan from 'Components/Organisms/DisplayPlan/DisplayPlan';

interface StepThreeDisplayPlanProps {
    plan: BehaviouralModificationPlan,
    onGoBack: () => void;
    onSubmit: () => void;
}

const StepThreeDisplayPlan: React.FC<StepThreeDisplayPlanProps> = ({
    plan,
    onGoBack,
    onSubmit,
}) => {

    return(
        <>
            <div className="space-y-3 pl-pr-2 max-w-3xl mx-auto text-[#0d1b2a]">
                {<DisplayPlan plan={plan} showTitle={true}/>}
            </div>

                {/** Buttons */}
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
                            transition-colors `}
                        onClick={() => onSubmit()}>
                        Save plan
                    </button>
                </div>
            </div>
        </>
    )   
}

export default StepThreeDisplayPlan;