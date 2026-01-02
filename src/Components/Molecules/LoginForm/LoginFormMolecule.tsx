import * as React from 'react'; 
import { useState } from 'react';
import FormTextAtom from '../../Atoms/FormTextField/FormTextAtom';

export interface LoginCredentials {
    email: string,
    password: string
}

interface LoginFormMoleculeProps {
    onSubmit: (value:LoginCredentials) => void;
}

const LoginFormMolecule: React.FC<LoginFormMoleculeProps> = ({ onSubmit: onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({email, password} as LoginCredentials);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <FormTextAtom
                label="Email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <FormTextAtom
                label="Password"
                placeholder="********"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full mt-2 py-2 rounded-full bg-pink-400 text-white font-bold text-lg hover:bg-pink-500 transition-colors">Log in</button>
        </form>
    );
};

export default LoginFormMolecule;