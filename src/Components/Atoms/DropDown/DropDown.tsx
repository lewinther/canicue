
import * as React from 'react';

interface DropDownProps {
    label: string;
    placeholder: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
}


const DropDown: React.FC<DropDownProps> = ({
    label,
    placeholder,
    options,
    value,
    onChange,
}) => {
    const [open, setOpen] = React.useState(false);
    const [highlighted, setHighlighted] = React.useState<number | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);

    React.useEffect(() => {
        if (!open) setHighlighted(null);
    }, [open]);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
                listRef.current && !listRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const selectedLabel = options.find(opt => opt.value === value)?.label || '';

    return (
        <div className="w-full relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <button
                type="button"
                ref={buttonRef}
                className="block w-full max-w-full rounded-md border border-gray-300 py-1.5 px-2 text-sm bg-white text-left focus:ring-pink-400 focus:border-pink-400 transition dropdown-fit-modal"
                onClick={() => setOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {selectedLabel || <span className="text-gray-400">{placeholder}</span>}
                <span className="float-right text-gray-400">▼</span>
            </button>
            {open && (
                <ul
                    ref={listRef}
                    tabIndex={-1}
                    className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md bg-white shadow-lg border border-gray-200 py-1 text-sm dropdown-fit-modal"
                    role="listbox"
                >
                    <li
                        className={`px-3 py-2 cursor-pointer text-gray-400 ${!value ? 'bg-pink-50' : ''}`}
                        onClick={() => { onChange(''); setOpen(false); }}
                        role="option"
                        aria-selected={!value}
                    >
                        {placeholder}
                    </li>
                    {options.map((opt, idx) => (
                        <li
                            key={opt.value}
                            className={`px-3 py-2 cursor-pointer ${value === opt.value ? 'bg-pink-100 text-pink-700 font-semibold' : ''} ${highlighted === idx ? 'bg-pink-50' : ''}`}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            onMouseEnter={() => setHighlighted(idx)}
                            role="option"
                            aria-selected={value === opt.value}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDown;