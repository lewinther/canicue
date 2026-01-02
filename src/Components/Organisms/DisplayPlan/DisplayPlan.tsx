import * as React from 'react';
import type { BehaviouralModificationPlan } from 'Models/BehavioralModificationPlan';
import DisplayInterventions from './DisplayInterventions';


interface DisplayPlanProps {
    plan: BehaviouralModificationPlan
    showTitle?: boolean
}

const DisplayPlan: React.FC<DisplayPlanProps> = ({
    plan,
    showTitle
}) => {

    const renderNameAndDescription = (): React.JSX.Element => (
        <>
            <div className="border-2 border-orange-300 rounded-2xl bg-white shadow-sm">
                { showTitle &&
                <h2 className="text-xl font-bold pl-3 pt-2 mb-2">
                    {plan.details.name}
                </h2>
                }
                <p className="text-sm text-gray-700 pl-3 pb-2 leading-relaxed">
                    {plan.details.description}
                </p>
            </div>
        </>
    ) 
    
    const renderGoalsAndTheory = (): React.JSX.Element | null => {

        const hasGoal = Boolean(plan.details.goal)
        const hasTheory = Boolean(plan.details.theory)

        if (!hasGoal && !hasTheory ) return null;

        const gridCols = hasGoal && hasTheory ? "grid-cols-2" : "grid-cols-1"

        return(
            <>
                <div className={`grid ${gridCols} gap-3`}>
                    {/* Goals */}
                    {plan.details.goal &&
                        <div className="
                            border-2 
                            border-orange-300 
                            rounded-xl 
                            bg-white 
                            shadow-sm 
                            overflow-x-hidden
                        ">
                            <h3 className="
                                font-semibold 
                                mb-1 
                                pt-2 
                                pl-3 
                                text-m
                            ">
                                Goals
                            </h3>
                            <p className='
                                text-sm 
                                text-gray-700 
                                pl-3 
                                pb-2 
                                leading-relaxed
                            '>
                                {plan.details.goal}
                            </p>
                        </div>
                    }
                    {/* Theory */}
                    { plan.details.theory &&
                        <div className="
                            border-2 
                            border-orange-300 
                            rounded-xl 
                            bg-white 
                            shadow-sm 
                            overflow-x-hidden
                        ">
                            <h3 className="
                                font-semibold 
                                mb-1 
                                pt-2 
                                pl-3 
                                text-m
                            ">
                                Theory
                            </h3>
                            <p className='
                                text-sm 
                                text-gray-700 
                                pl-3 
                                pb-2 
                                leading-relaxed
                            '>
                                {plan.details.theory}
                            </p>
                        </div>
                    }
                </div>
            </>
        )
    }

    const borderColor = 'border-orange-300'
    const bgColor = 'bg-white'

    return (
        <>
            <div className="space-y-3 pl-pr-2 max-w-3xl mx-auto text-[#0d1b2a]">
                {renderNameAndDescription()}
                {renderGoalsAndTheory()}
                {<DisplayInterventions title='Interventions' plan={plan} borderColor={borderColor} bgColor={bgColor}/>}
            </div>
        </>
    )
}

export default DisplayPlan;