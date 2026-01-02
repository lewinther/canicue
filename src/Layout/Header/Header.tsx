import Logo from 'Components/Assets/Logo';
import LogOutIcon from 'Components/Assets/LogOutIcon';
import * as React from 'react';
import { useUserStore } from 'Stores/UserStore';


interface HeaderProps {
    title: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
    title,
    onLogout
}) => {
    const userStore = useUserStore()
    
    const handleLogout = () => {
		onLogout();
	};

    return (
        <>
            <header className="
                w-full 
                p-3 
                bg-white 
                shadow-md 
				grid
				grid-flow-col
				grid-row-3
				grid-cols-4
				gap-x-4
            ">
                <div className='row-span-3 col-span-1'>
                    <Logo size={50} color='#94a3b8'/>
                </div>
                <p className="col-span-2 text-xl font-bold text-slate-500 text-center">{title}</p>
                <p className="row-span-2 col-span-2 text-gray-500 text-sm text-center">{userStore.user?.name}</p>
                <div className='row-span-3 content-center grid grid-cols-1'>
                    <button className='col-end-3' onClick={handleLogout}>
                        <LogOutIcon size={30} color='#94a3b8'/>
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header