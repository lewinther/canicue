import * as React from 'react';
import type { BehaviouralModificationPlan } from 'Models/BehavioralModificationPlan';
import InterventionAccordion from './InterventionAccordion';




interface DisplayInterventionsProps {
    plan: BehaviouralModificationPlan;
    borderColor: string;
    bgColor: string;
    title: string;
}

const DisplayInterventions: React.FC<DisplayInterventionsProps> = ({
    plan,
    borderColor,
    bgColor,
    title
}) => {
    return (
        <>
            <div className={`border-2 rounded-2xl shadow-sm ${borderColor} ${bgColor}`}>
                <h3 className="text-m font-semibold pl-3 pt-2 mb-2">{title}</h3>

                <div className="space-y-3  mb-2">
                    {plan.interventions.map((intervention) => (
                        <InterventionAccordion 
                            key={intervention.id} 
                            intervention={intervention} 
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default DisplayInterventions;