import * as React from 'react';
import LoginFormMolecule, { type LoginCredentials } from '../Molecules/LoginForm/LoginFormMolecule';
import Logo from 'Components/Assets/Logo';
import { login } from 'Api/users';
import type { AnyUser } from 'Models/User';


interface LogInPageProps {
	onLogin: ( value: AnyUser | undefined ) => void;
}

const LogInPage: React.FC<LogInPageProps> = ({ onLogin }) => {

	function onSubmit( value: LoginCredentials | undefined ) {
		if(!value) return;
		var userEmail = login(value.email);
		onLogin(userEmail);
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-300 to-pink-300">
			<div className="w-full max-w-xs sm:max-w-md p-6 sm:p-10  flex flex-col items-center ">
				{/* Logo */}
				<div className="flex flex-col items-center justify-center mb-6 mt-2">
					<Logo color='#ec4899' size={150}/>
					<h1 className='text-3xl font-bold text-pink-500'>Canicue</h1>
				</div>
				
				{/* Tabs */}
				{/* <div className="flex w-full mb-6">
					<button className="flex-1 py-2 rounded-l-full bg-white text-gray-900 font-semibold shadow">Login</button>
					<button className="flex-1 py-2 rounded-r-full bg-white/60 text-gray-500 font-semibold">Sign up</button>
				</div> */}

				{/* Form Card */}
				<div className="w-full bg-white/80 rounded-2xl p-6 flex flex-col items-center">
                <LoginFormMolecule onSubmit={onSubmit} />
				</div>
			</div>
		</div>
	);
};

export default LogInPage;
