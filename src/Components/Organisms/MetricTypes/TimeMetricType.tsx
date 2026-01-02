import * as React from 'react';
import type { TimeMetric } from 'Models/Metrics/TimeMetric';

interface TimeMetricTypeProps {
    metric: TimeMetric;
    showTypeName: boolean;
    value?: number;
    onChange?: (newValue: number) => void
}

const TimeMetricType: React.FC<TimeMetricTypeProps> = ({
    metric,
    showTypeName,
    value, 
    onChange, 
}) => {

    const [hours, setHours] = React.useState<string>(value !== undefined ? String(Math.floor(value / 3600000)) : '');
    const [minutes, setMinutes] = React.useState<string>(value !== undefined ? String(Math.floor((value % 3600000) / 60000)) : '');

    React.useEffect(() => {
        if (value !== undefined) {
            setHours(String(Math.floor(value / 3600000)));
            setMinutes(String(Math.floor((value % 3600000) / 60000)));
        } else {
            setHours('');
            setMinutes('');
        }
    }, [value]);

    const updateTime = (h: number, m: number) => {
        const newValue = h * 3600000 + m * 60000;
        onChange?.(newValue)
    };

    const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
        const h = e.target.value;
        setHours(h);
        updateTime(Number(h), Number(minutes));
    };

    const handleMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const m = e.target.value;
        setMinutes(m);
        updateTime(Number(hours), Number(m));
    };

    const displayTypeName = (): React.JSX.Element => (
        <>
            <div aria-label='Time metric'>
                <p className='text-sm text-gray-700'>
                    {metric?.typeName}
                </p>
            </div>
        </>
    )

    const displayTimer = () : React.JSX.Element => (
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
                <div 
                    className='
                        col-span-3 
                        row-span-1
                        place-items-center 
                        content-center
                    '>
                    <div 
                        className='
                            grid
                            grid-cols-5
                            items-baseline
                            border
                            border-1
                            border-orange-300
                            text-orange-300 
                            rounded-lg 
                            bg-amber-50
                            pb-2
                            overflow-hidden
                        '>
                            <input 
                                id='Hours'
                                className='
                                    col-span-2 
                                    bg-amber-50 
                                    text-lg
                                    font-bold
                                    text-right 
                                '
                                type="number" 
                                value={hours} 
                                onChange={handleHours} 
                                min={0} 
                                max={8} 
                                placeholder='HH'
                            />
                            <p className='col-span-1 justify-self-center text-2xl font-extrabold'>:</p>
                            <input 
                                id='Minutes'
                                className='
                                    col-span-2
                                    bg-amber-50
                                    text-lg
                                    font-bold
                                '
                                type="number" 
                                value={minutes} 
                                onChange={handleMinutes}
                                min={0} 
                                max={59} 
                                placeholder='MM'
                            />
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {showTypeName && displayTypeName()}
            {!showTypeName && displayTimer()}
        </>
    )
}

export default TimeMetricType;