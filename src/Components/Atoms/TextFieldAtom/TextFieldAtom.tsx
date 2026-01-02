import * as React from 'react';

interface TextFieldAtomProps {
    label: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    id?: string;
    name?: string;
    type?: string;
    variant?: string;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
}

const TextFieldAtom = React.forwardRef<HTMLInputElement, TextFieldAtomProps>(
    (
        {
            label,
            placeholder = '',
            value,
            onChange,
            id,
            name,
            type = 'text',
            variant,
            fullWidth,
            multiline = false,
            rows,
            ...rest
        },
        ref
    ) => {
        const inputId = id || `textfield-${label.replace(/\s+/g, '-').toLowerCase()}`;

        return (
            <div className={fullWidth ? 'w-full' : ''}>
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
                {multiline ? (
                    <textarea
                        id={inputId}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        rows={rows || 3}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-pink-400 focus:border-pink-400 transition resize-vertical min-h-[80px]"
                        {...rest}
                    />
                ) : (
                    <input
                        ref={ref} // attach ref only to input
                        id={inputId}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-pink-400 focus:border-pink-400 transition"
                        {...rest}
                    />
                )}
            </div>
        );
    }
);

TextFieldAtom.displayName = 'TextFieldAtom';

export default TextFieldAtom;
