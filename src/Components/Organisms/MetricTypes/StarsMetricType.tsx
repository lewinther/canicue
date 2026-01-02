import * as React from 'react';
import type { StarsMetric } from 'Models/Metrics/StarsMetric';

interface StarsMetricTypeProps {
    metric: StarsMetric;
    showTypeName: boolean;
    value?: number;
    onChange?: (newValue: number) => void;
}

const StarsMetricType: React.FC<StarsMetricTypeProps> = ({
    metric,
    showTypeName,
    value = 0,
    onChange,
}) => {

    const displayTypeName = (): React.JSX.Element => (
        <>
            <div aria-label='Stars metric'>
                <p className='text-sm text-gray-700'>
                    {metric?.typeName}
                </p>
            </div>
        </>
    )

    const displayStars = (): React.JSX.Element => (
        <>
            <div className='
                border                
                border-1 
                border-orange-300 
                rounded-xl 
                bg-white 
                shadow-sm 
                grid
                grid-cols-5
                grid-flow-row
            '>
                <div className="
                    col-span-2
                ">
                    <h3 className="
                        font-semibold 
                        mb-1 
                        pt-2 
                        pl-3 
                        text-sm
                    ">
                        {metric.name}
                    </h3>
                    <p className='
                        text-xs 
                        text-gray-700 
                        pl-3 
                        pb-2 
                        leading-relaxed
                    '>
                        {metric.description}
                    </p>
                </div>
                <div className='row-span-3 col-span-3 place-items-center content-center'>
                    <div className='grid grid-cols-5 gap-1'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => {
                                    onChange?.(star)
                                }}
                                className={`text-3xl ${star <= value ? "text-orange-500" : "text-amber-200"}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )

    return(
        <>
            {showTypeName && displayTypeName()}
            {!showTypeName && displayStars()}
        </>
    )
}

export default StarsMetricType;