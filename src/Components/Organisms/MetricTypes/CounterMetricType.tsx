import * as React from 'react';
import type { CounterMetric } from 'Models/Metrics/CounterMetric';
import ToolTipAtom from 'Components/Atoms/ToolTip/ToolTipAtom';
import MinusIcon from 'Components/Assets/MinusIcon';
import PlusIcon from 'Components/Assets/PlusIcon';

interface CounterMetricTypeProps {
    metric: CounterMetric;
    showTypeName: boolean;
    value?: number;
    onChange?: (newValue : number ) => void;
}

const CounterMetricType: React.FC<CounterMetricTypeProps> = ({ 
        metric, 
        showTypeName,
        value = 0,
        onChange,
}) => {
    const [showError, setShowError] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleIncrement = () => {
        onChange?.(value + 1)
    };

    const handleDecrement = () => {
        if (value <= 0) {
            setShowError(true)   
            return;
        }
        onChange?.(value-1)
    }
    

    const displayTypeName = (): React.JSX.Element => (
        <>
            <div aria-label='Counter metric'>
                <p className='text-sm text-gray-700'>
                    {metric?.typeName}
                </p>
            </div>
        </>
    )

    const displayCounter = (): React.JSX.Element => (
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
                    <div className='grid grid-cols-6 gap-1'>
                        <button 
                            ref={buttonRef}
                            type='button'
                            className='
                            bg-orange-300 
                            place-items-center 
                            col-span-2
                            w-10
                            rounded-l-md
                            '
                            onClick={() => handleDecrement()}
                        >
                            <MinusIcon color='white' size={25} />
                        </button>
                        {showError && (
                            <ToolTipAtom 
                                show={showError} 
                                message={'Value cannot be below zero'} 
                                onClose={() => setShowError(false)} 
                                targetRef={buttonRef}                   
                            />
                        )}
                        <div className='
                        border 
                        border-orange-300 
                        rounded-m 
                        bg-white 
                        col-span-2 
                        text-center
                        '>
                            <p className='text-orange-300 text-2xl/10 font-bold'>
                                {value}
                            </p>
                        </div>
                        <button 
                            type='button'
                            className='
                            bg-orange-300 
                            place-items-center 
                            col-span-2
                            rounded-r-md
                            '
                            onClick={() => handleIncrement()}
                        >
                            <PlusIcon color='white' size={25}/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {showTypeName && displayTypeName()}
            {!showTypeName && displayCounter()}
        </>
    );
}

export default CounterMetricType;