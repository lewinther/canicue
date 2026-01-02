import * as React from "react";

interface ToggleFieldAtomProps<T extends React.ReactNode> {
    options: T[];
    value: T; 
    selectedColor: string;
    unSelectedColor:string;
    onChange?: (value: T) => void;
    className?: string;
}

const ToggleFieldAtom = <T extends React.ReactNode>({
    options,
    value,
    selectedColor,
    unSelectedColor,
    onChange,
    className,
}: ToggleFieldAtomProps<T>) => {
    if(!options[0] || options.length === 0) return null;

    return (
        <div
            className={`cols-row flex flex-row rounded-full overflow-hidden ${className}`}
        >
        {options.map((option, index) => {
            const isSelected = option === value;
            return (
                <button
                    key={index}
                    type="button"
                    onClick={() => onChange?.(option)}
                    className={`px-4 py-1 text-center align-middle transition-colors duration-200  
                        ${
                            isSelected
                                ? selectedColor
                                : unSelectedColor
                        }
                    `}
                >
                    {option}
                </button>
            );
        })}
        </div>
    );
}

export default ToggleFieldAtom