import * as React from 'react';
import TextFieldAtom from '../TextFieldAtom/TextFieldAtom';

interface FormTextAtomProps {
    label: string;
    placeholder?: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    name?: string;
    variant?: string;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    pattern?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

const FormTextAtom = React.forwardRef<HTMLInputElement, FormTextAtomProps>(
    (
        {
            label,
            placeholder,
            value,
            onChange,
            type = 'text',
            name,
            multiline = false,
            rows,
            ...rest
        },
        ref
    ) => (
        <TextFieldAtom
            {...(multiline === false && { ref })} 
            label={label}
            {...(placeholder !== undefined ? { placeholder } : {})}
            value={value}
            onChange={onChange}
            type={type}
            {...(name !== undefined ? { name } : {})}
            variant="outlined"
            fullWidth
            {...(rows !== undefined ? { rows } : {})}
            {...rest}
        />
    )
);

export default FormTextAtom;
