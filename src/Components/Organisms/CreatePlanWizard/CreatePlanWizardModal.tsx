import * as React from 'react';
import { useState } from 'react';
import CloseIcon from '../../Assets/CloseIcon';

//Step components
import Stepper from './Stepper';
import StepOneBasisInformation from './Step1/StepOneBasisInformation';
import StepTwoInterventions from './Step2/StepTwoInterventions';
import StepThreeDisplayPlan from './Step3/StepThreeDisplayPlan';

//import store and models
import {useBehaviouralModificationPlanStore} from 'Stores/BehaviouralModificationPlanStore';
import { type PlanDetails, PlanDetailsModel }  from 'Models/PlanDetails';
import type { Intervention } from 'Models/Intervention';
import { useUserStore } from 'Stores/UserStore';
import { getDogFromId } from 'Api/dogs';

interface CreatePlanWizardModalProps {
    clientId: string | undefined;
    dogId: string | undefined;
    onClose: () => void;
}

const CreatePlanWizardModal: React.FC<CreatePlanWizardModalProps> = ({ 
    clientId,
    dogId,
    onClose,
}) => {
    const planStore = useBehaviouralModificationPlanStore();
    const userStore = useUserStore()

    if(!planStore.initialized) {
        planStore.resetPlan();
    }

    function closeFlow() {
        planStore.resetPlan();
        onClose();
    }

    const handleDetailsOnChange = (
        field: keyof PlanDetails, 
        value: string) => 
    {        
        if(!planStore.plan) return; 

        const updatedDetails = {
            ...planStore.plan?.details,
            [field]: value
        } as PlanDetails;

        planStore.setDetails(
            new PlanDetailsModel(
                updatedDetails.name, 
                updatedDetails.description, 
                updatedDetails.goal, 
                updatedDetails.theory));
    };

    function addIntervention(value:Intervention) {
        planStore.addIntervention(value)
    }

    function updateIntervention(value:Intervention) {
        planStore.updateIntervention(value);
    }

    function onStep1Sumbit() : void {        
        if(!planStore.plan?.details || !planStore.plan?.details.isValid()) return;
        setCurrentStep(currentStep+1);
    }

    function onGoBackStep(): void {
        setCurrentStep(currentStep-1);
    }

    function onStep2Sumbit() : void {
        if(!planStore.plan || !planStore.plan.isValid()) return;
        
        setCurrentStep(currentStep+1)
    }

    function onSubmitPlan() : void {
        if(!userStore.user || !clientId || !dogId) return;
        planStore.setBehavioristId(userStore.user?.id)
        planStore.setClientId(clientId)
        planStore.setDogId(dogId)
        console.log("You have successfully created a plan");
        console.log("Created plan: ", planStore.plan);
        closeFlow();
    }

    const renderStep1 = (): React.JSX.Element => (
        <>
            <div>
                <StepOneBasisInformation
                    details={planStore.plan?.details}
                    onChange={handleDetailsOnChange}
                    onClose={closeFlow}
                    onSubmit={onStep1Sumbit}
                />
            </div>
        </>
    )

    const renderStep2 = (): React.JSX.Element => (
        <>
            <div>
                <StepTwoInterventions
                    interventions={planStore.plan?.interventions ?? []}
                    onGoBack={onGoBackStep}
                    onSubmit={onStep2Sumbit}
                    addIntervention={addIntervention}
                    updateIntervention={updateIntervention}
                />
            </div>
        </>
    )

    const renderStep3 = (): React.JSX.Element => {
        if (!planStore.plan) return <></>;
        
        return (
            <>
                <div>
                    <StepThreeDisplayPlan 
                        plan={planStore.plan} 
                        onGoBack={onGoBackStep} 
                        onSubmit={onSubmitPlan}                    
                    />
                </div>
            </>
        );
    }

    const renderSteps = (): React.JSX.Element => {
        switch(currentStep)
        {
            case 0:
                return renderStep1();
            case 1:
                return renderStep2();
            case 2:
                return renderStep3()
            default: return <></>;
        }
    }

    const [currentStep, setCurrentStep] = useState(0);

    if(!planStore.initialized) return;

    if(dogId === undefined) return;
    const dog = getDogFromId(dogId)

    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-scroll">
            <div className="relative w-full max-w-lg bg-[#FFF6F2] rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto hide-scrollbar">
                {/* Title */}
                <h2 className="text-center -mt-2 text-lg font-semibold">Create plan for {dog?.name}</h2>
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 flex items-center justify-center "
                    onClick={closeFlow}
                    aria-label="Close"
                    style={{ zIndex: 10 }}
                >
                    <CloseIcon color="#f472b6" size={30} />
                </button>

                {/* Step Content */}
                <div>
                    {/* Stepper */}
                    <div className="mt-2 mb-6">
                    <Stepper currentStep={currentStep} totalSteps={3} />
                    </div>
                    {/* Steps */}
                    {renderSteps()}
                </div>
            </div>
        </div>

        <style>
            {
                `.hide-scrollbar {
                    -ms-overflow-style: none;  /* IE/Edge */
                    scrollbar-width: none;     /* Firefox */
                    }

                .hide-scrollbar::-webkit-scrollbar {
                    display: none;             /* Chrome/Safari/WebKit */
                }
            `}
        </style>
        </>
    );
};

export default CreatePlanWizardModal;