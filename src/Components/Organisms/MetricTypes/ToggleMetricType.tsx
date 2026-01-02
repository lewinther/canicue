import * as React from 'react';
import type { ToggleMetric } from 'Models/Metrics/ToggleMetric';
import ToggleFieldAtom from 'Components/Atoms/ToggleField/ToggleFieldAtom';

interface ToggleMetricTypeProps {
    metric: ToggleMetric;
    showTypeName: boolean;
    value?: boolean;
    onChange?: (newValue : boolean ) => void;
}

const ToggleMetricType: React.FC<ToggleMetricTypeProps> = ({
    metric,
    showTypeName,
    value,
    onChange,
}) => {

    const toggleOptions = [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        }    
    ]

    const selectedLabel = value?.valueOf === undefined ? 'Off' : toggleOptions.find(option => option.value === value)?.label;
    if (!selectedLabel) return;

    const handleChange = (label: string) => {
        const option = toggleOptions.find(option => option.label === label)
        if(!option) return;
        onChange?.(option.value)
    }

    const displayTypeName = (): React.JSX.Element => (
        <>
            <div aria-label='Toggle metric'>
                <p className='text-sm text-gray-700'>
                    {metric?.typeName}
                </p>
            </div>
        </>
    )

    const displayToggle = (): React.JSX.Element => (
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
                <div 
                    className="
                        col-span-2
                ">
                    <h3 
                        className="
                            font-semibold 
                            mb-1 
                            pt-2 
                            pl-3 
                            text-sm
                    ">
                        {metric.name}
                    </h3>
                    <p 
                        className='
                            text-xs 
                            text-gray-700 
                            pl-3 
                            pb-2 
                            leading-relaxed
                    '>
                        {metric.description}
                    </p>
                </div>
                <div className='col-span-3 flex items-center justify-end min-h-fit pr-8 text-xl'>
                    <ToggleFieldAtom
                        options={toggleOptions.map(opt => opt.label)}
                        value={selectedLabel}
                        onChange={handleChange}
                        className="h-10" 
                        selectedColor={'bg-pink-500 hover:bg-pink-600 text-white font-bold'} 
                        unSelectedColor={'bg-white bg-orange-50 border border-orange-100 text-orange-300 hover:bg-orange-100 font-semibold'}                
                    />
                </div>
            </div>
        </>
    )

    return(
        <>
            {showTypeName && displayTypeName()}
            {!showTypeName && displayToggle()}
        </>
    )
}

export default ToggleMetricType;