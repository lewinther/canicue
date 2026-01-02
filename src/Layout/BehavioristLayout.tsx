import * as React from 'react'
import Header from "./Header/Header";
import { useUserStore } from "Stores/UserStore";
import { Outlet, useNavigate } from 'react-router-dom';
import { HeaderContext } from './Header/HeaderContext';
import BehaviorisNavbarWebMolecule from './Navbar/BehavioristNavbarWebMolecule';
import BehavioristNavbarMolecule from './Navbar/BehavioristNavbarMolecule';

export default function BehaviroistLayout() {

    const userStore = useUserStore();
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('')

    function LogUserOut() {
        userStore.setUser(undefined)
        navigate('/', {replace: true})
    }
    return(
        <HeaderContext.Provider value={{title, setTitle}}>
            <div className="hidden md:block bg-slate-100 flex-col min-h-screen">
                <BehaviorisNavbarWebMolecule onLogout={() => LogUserOut()} />
                <main className='flex-1 pb-24'>
                    <Outlet />
                </main>
            </div>

            <div className='md:hidden'>
                    <div className="min-h-screen bg-slate-100 flex flex-col">
                        <Header title={title} onLogout={LogUserOut} />
                        <main className='flex-1 pb-24'>
                            <Outlet />
                        </main>
                        <BehavioristNavbarMolecule />
                    </div>
            </div>
        </HeaderContext.Provider>
    )
}