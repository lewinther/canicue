import * as React from 'react';
import type { Intervention } from 'Models/Intervention';
import { useState } from 'react';

export interface InterventionAccordionProps {
    intervention: Intervention
}

const InterventionAccordion: React.FC<InterventionAccordionProps> = ({
    intervention,
}) => {

    const [ open, setOpen ] = useState(false)

    return (
        <>
            <div className="border rounded-xl bg-white mx-3 my-1 shadow-sm transition-all">

                {/** Closed accordion */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex justify-between items-center px-4 py-1 text-left"
                >
                    <span className="font-medium text-sm text-gray-400">
                    {intervention.name}, {intervention.metrics.length} metric
                    {intervention.metrics.length !== 1 && "s"}
                    </span>
                    {open ? <span className="ml-2 text-gray-400">▲</span> : <span className="ml-2 text-gray-400">▼</span>}
                </button>

                {/** Opened accordion */}
                {open && (
                    <div className="px-4 pb-2 text-sm text-gray-500 space-y-1 fadeInBlock">
                        <p>
                            <strong>Description:</strong> {intervention.description}
                        </p>
                        <div>
                            <strong>Metrics:</strong>
                            <ul className="list-disc ml-5 space-y-1">
                                {intervention.metrics.map((metric) => (
                                    <li key={metric.id}>
                                    {metric.name}
                                    <span className="text-gray-500"> ({metric.typeName})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <style>
                {`
                    .fadeInBlock {
                        animation: fadeIn 0.2s ease-out
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-2px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
        </>
    )
}

export default InterventionAccordion