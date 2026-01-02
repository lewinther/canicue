import Logo from 'Components/Assets/Logo';
import LogOutIcon from 'Components/Assets/LogOutIcon';
import CreateClientModal from 'Components/Molecules/CreateClient/CreateClient';
import SimpleClientList from 'Components/Molecules/SimpleLists/SimpleClientList';
import SimpleDogsList from 'Components/Molecules/SimpleLists/SimpleDogsList';
import CreatePlanWizardModal from 'Components/Organisms/CreatePlanWizard/CreatePlanWizardModal';
import type { NavItem } from 'Models/Navigation';
import type { Client } from 'Models/User';
import * as React from 'react'
import { NavLink, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useUserStore } from 'Stores/UserStore';

interface BehaviorisNavbarWebMoleculeProps {
    onLogout: () => void;
}

const BehaviorisNavbarWebMolecule: React.FC<BehaviorisNavbarWebMoleculeProps> = ({
    onLogout
}) => {
    const userStore = useUserStore()
    const navigate = useNavigate();
    const [showClients, setShowClients] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState<Client | undefined>(undefined);
    const [selectedClientId, setSelectedClientId] = React.useState<string | undefined>(undefined)
    const [showDogs, setShowDogs] = React.useState(false);
    const [selectedDogId, setSelectedDogId] = React.useState<string | undefined>(undefined);
    const [showPlanWizard, setShowPlanWizard] = React.useState(false);
    const [showCreateClient, setShowCreateClient] = React.useState(false);
    const [isActiveNavItem, setIsActiveNavItem] = React.useState<string | null> (null)

    const path = useResolvedPath(`/${userStore?.user?.name}-dashboard`)
    const isLogoActive = useMatch({ path: path.pathname, end: true }) !== null

    const handleLogout = () => {
		onLogout();
	};

    const currentModalStep =
        showPlanWizard
            ? 'PLAN'
            : showDogs && selectedClient
            ? 'DOGS'
            : showClients
            ? 'CLIENTS'
            : null;

    const closeClientsModal = () => {
        setShowClients(false);
        setShowDogs(false);
        setSelectedDogId(undefined);
        setShowPlanWizard(false);
        setIsActiveNavItem('')
    };

    const closeDogsModal = () => {
        setShowDogs(false);
        setSelectedDogId(undefined);
        setShowPlanWizard(false);
        setIsActiveNavItem('')
    };

    const closePlanWizard = () => {
        setShowPlanWizard(false);
        setIsActiveNavItem('')
    };

    const navItems: NavItem[] = [
        { 
            label: 'CLIENTS',
            to: (`/${userStore?.user?.name}-clients-overview`),
            onClick: () => setIsActiveNavItem('CLIENTS')
        },
        {
            label: 'CREATE PLAN',
            onClick: () => setShowClients(true),
            isActive: () => currentModalStep !== null,
        },
        {
            label: 'NEW CLIENT',
            onClick: () => setShowCreateClient(true),
            isActive: () => showCreateClient,
        },
        { 
            label: 'SETTINGS',
            onClick: () => 
                navigate('*')
            , 
        },
        { 
            label: 'MESSAGES',
            onClick: () => 
                navigate('*')
            ,
        },
    ]

    const getNavItemClasses = (item: NavItem, isLinkActive?: boolean) => {
        const active = item.label === isActiveNavItem || item.isActive?.() || (!isActiveNavItem && isLinkActive) || false

        return active
            ? 'text-teal-400 border-teal-400 font-bold'
            : 'text-slate-500 hover:text-slate-700 font-bold'
    }


    return(
        <>
            <nav 
                className='
                    fixed-top-0 
                    left-0 
                    w-full 
                    flex 
                    justify-between 
                    items-center 
                    bg-white 
                    shadow-[0_2px_16px_0_rgba(0,0,0,0.04)] 
                    px-6 
                    pb-3 
                    pt-3 
                    z-50
                '
                role='nav'
            >
                <div className='row-span-3 col-span-1'>
                    <NavLink 
                        to={`/${userStore?.user?.name}-dashboard`}
                        end
                        className={({ isActive }) =>
                            getNavItemClasses({ label: path.pathname }, isActive)
                        }
                    >
                        <Logo size={50} isActive={isLogoActive} color='#94a3b8' />
                    </NavLink>
                </div>
                <div className='col-span-6 row-span-3 grid grid-flow-col auto-cols-max'>
                    <div className="flex gap-10">
                        {navItems.map(item => {

                            if('to' in item){
                                return(
                                    <NavLink
                                        key={item.label}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            getNavItemClasses(item, isActive)
                                        }
                                    end
                                    >
                                        {item.label}
                                    </NavLink>
                                )
                            }

                            return(
                                <button
                                    key={item.label}
                                    onClick={() =>  {
                                        setIsActiveNavItem(item.label)
                                        item.onClick?.()
                                    }}
                                    className={getNavItemClasses(item)}
                                >
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className='row-span-3 content-center grid grid-cols-1'>
                    <button className='col-end-3' onClick={handleLogout}>
                        <LogOutIcon size={30} color='#94a3b8'/>
                    </button>
                </div>
            </nav>

            {showClients && (
                <SimpleClientList 
                    onCloseClientList={() => closeClientsModal()} 
                    onSelectClient={(client) => {
                        setSelectedClient(client);
                        setSelectedClientId(client.id)
                        if(client.dogIds.length === 1){
                            setSelectedDogId(client.dogIds[0]);
                            setShowPlanWizard(true);
                        }
                        if(client.dogIds.length > 1){
                            setShowDogs(true);
                            setShowClients(false)
                        }
                    }}
                />
            )}
            
            {showDogs && selectedClient && (
                <SimpleDogsList 
                    client={selectedClient} 
                    onCloseDogsList={() => {
                        closeDogsModal()
                        }
                    } 
                    onSelectDog={(dogId) => {
                        setSelectedDogId(dogId);
                        setShowPlanWizard(true)
                        setShowDogs(false);
                    }}                
                />
            )}

            {showPlanWizard && selectedClient && selectedDogId && (
                <CreatePlanWizardModal 
                    clientId={selectedClientId} 
                    dogId={selectedDogId} 
                    onClose={() => 
                        {
                            closePlanWizard()
                        }
                    }          
                />
            )}

            {showCreateClient && (
                <CreateClientModal 
                    onClose={() => 
                        {
                            setShowCreateClient(false)
                            setIsActiveNavItem('')
                        }
                    } 
                />
            )}

        </>
    )
}

export default BehaviorisNavbarWebMolecule;