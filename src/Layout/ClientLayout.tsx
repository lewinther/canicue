import * as React from 'react'
import Header from "./Header/Header";
import { useUserStore } from "Stores/UserStore";
import { Outlet, useNavigate } from 'react-router-dom';
import { HeaderContext } from './Header/HeaderContext';
import ClientNavbarMolecule from './Navbar/ClientNavbarMolecule';

export default function ClientLayout() {

    const userStore = useUserStore();
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('')

    function LogUserOut() {
        userStore.setUser(undefined)
        navigate('/', {replace: true})
    }
    return(
        <HeaderContext.Provider value={{title, setTitle}}>
            <div className="min-h-screen bg-slate-100 flex flex-col">
                <Header title={title} onLogout={LogUserOut} />

                <main className='flex-1 pb-24'>
                    <Outlet />
                </main>

                <ClientNavbarMolecule />
            </div>
        </HeaderContext.Provider>
    )
}