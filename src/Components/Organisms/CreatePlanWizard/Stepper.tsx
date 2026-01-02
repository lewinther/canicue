import * as React from 'react';

interface StepperProps {
    currentStep: number;
    totalSteps: number;
}


const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => (
    <div className="flex flex-row items-center justify-center mb-6 mt-2">
        {Array.from({length: totalSteps}, (_, index) => (
            <div key={index} className="flex flex-row items-center">
                <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 ${
                        index < currentStep
                            ? 'border-pink-400 border-4 bg-white text-pink-400' // completed steps
                            : index === currentStep
                                ? 'border-pink-400  bg-pink-400 text-white' // current step
                                : 'border-gray-300 bg-gray-100 text-gray-400' // future steps
                    } text-xl font-bold transition-colors`}
                >
                    {index + 1}
                </div>
                {index < totalSteps - 1 && (
                    <div
                        className={
                            index < currentStep
                                ? 'w-12 h-1 mt-1 mb-1 bg-pink-400 rounded-full' // completed or active line
                                : 'w-12 h-0 mt-1 mb-1 border-t-2 border-dashed border-gray-300 rounded-full' // future line
                        }
                    />
                )}
            </div>
        ))}
    </div>
);

export default Stepper;