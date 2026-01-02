import * as React from 'react';
import { useHeaderContext } from 'Layout/Header/HeaderContext';
import { useEffect } from 'react';
import { useUserStore } from 'Stores/UserStore';
import { getBehavioristsClients } from 'Api/users';
import DogIcon from 'Components/Assets/DogIcon';
import ClientIcon from 'Components/Assets/ClientIcon';
import { getDogFromId } from 'Api/dogs';
import type { Client } from 'Models/User';
import MailIcon from 'Components/Assets/MailIcon';
import PlansIcon from 'Components/Assets/PlansIcon';
import CreateClientModal from 'Components/Molecules/CreateClient/CreateClient';
import SimpleDogsList from 'Components/Molecules/SimpleLists/SimpleDogsList';
import CreatePlanWizardModal from 'Components/Organisms/CreatePlanWizard/CreatePlanWizardModal';
import ModalPortal from 'Components/Portals/ModalPortal';

const BehavioristClientOverview: React.FC = () => {
    const userStore = useUserStore()  
    const {setTitle} = useHeaderContext()
    const [showCreateClient, setShowCreateClient] = React.useState(false)
    const [selectedClient, setSelectedClient] = React.useState<Client | undefined>(undefined);
    const selectedClientId = selectedClient?.id;
    const [showDogs, setShowDogs] = React.useState(false)
    const [selectedDogId, setSelectedDogId] = React.useState<string | undefined>(undefined);
    const [showCreatePlan, setShowCreatePlan] = React.useState(false)
    
    useEffect(() => {
        setTitle(`Clients`)
    }, [setTitle]);
    
    const displayClients = (): React.JSX.Element | null => {
        if(!userStore.user) return null;
        const clients = getBehavioristsClients(userStore.user.id)
        if(!clients?.length) return null; 
        
        const displayDogNames = (client: Client): React.JSX.Element | null => {
            const dogIds = client.dogIds;
            const uniqueDogIds = Array.from(new Set(dogIds));

            return (
                <>
                    {uniqueDogIds.map(dogId => {
                        const dog = getDogFromId(dogId)
                        return(
                        <p 
                            key={dogId}
                            className='text-sm text-slate-500'
                        >
                            {dog?.name || 'Unknown'}
                        </p>
                        )
                    })}
                </>
            )
        }

        return(
            <>
                {clients.map((client) =>(
                    <React.Fragment key={client.id}>
                        <div className='border-2 rounded-2xl shadow-s grid grid-cols-3 grid-flow-row p-5 m-5 bg-zinc-50'>
                            <div className='row-span-3 col-span-2'>
                                <div className='grid grid-rows-subgrid space-y-1'>
                                    <div className='grid grid-cols-[auto_1fr] items-start gap-2 mt-2'>
                                        <ClientIcon size={25} color='#6B7280'/>
                                        <p className='text-sm text-slate-500 font-bold'>{client.name}</p>
                                    </div>
                                    <div className='grid grid-cols-[auto_1fr] items-start gap-2'>
                                        <MailIcon size={25} strokeColor='#6B7280'/>
                                        <p className='text-sm text-slate-500'>{client.email}</p>
                                    </div>
                                    <div className='grid grid-cols-[auto_1fr] items-start gap-3 mb-2'>
                                        <DogIcon color='#6B7280' size={20}/>
                                        <div className='grid grid-rows-1'>
                                            {displayDogNames(client)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row-span-1 col-span-1 grid grid-rows-1'>
                                <button
                                    className='justify-self-end'
                                    onClick={() => {
                                        setSelectedClient(client) 
                                        setShowDogs(true)
                                    }}
                                >
                                    <PlansIcon size={50} fillColor='#fdba74'/>
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                ))

                }
            </>
        )
    }
    
    return (
        <>
            <div className='
                space-y-2
            '>
                <div className='
                grid
                grid-cols-1
                place-items-end
                mx-5
                mt-2
                '>
                    <button
                        className={`
                            md:hidden
                            w-1/3
                            py-1 
                            rounded-full 
                            bg-pink-400 
                            text-white 
                            font-bold 
                            hover:bg-pink-500 
                            transition-colors 
                        `}
                        onClick={() => setShowCreateClient(true)}
                    >
                        Add client
                    </button>
                </div>
                {displayClients()}
            </div>

            {showCreateClient && (
                <ModalPortal>
                    <CreateClientModal 
                        onClose={() => setShowCreateClient(false)} 
                    />
                </ModalPortal>
            )}

            {showDogs && (
                <ModalPortal>
                    <SimpleDogsList 
                        client={selectedClient} 
                        onCloseDogsList={() => setShowDogs(false)} 
                        onSelectDog={(dogId) => {
                            setSelectedDogId(dogId);
                            setShowCreatePlan(true)
                            setShowDogs(false);
                        }}                
                    />
                </ModalPortal>
            )}

            {showCreatePlan && (
                <ModalPortal>
                    <CreatePlanWizardModal 
                        clientId={selectedClientId} 
                        dogId={selectedDogId} 
                        onClose={() => setShowCreatePlan(false)}          
                    />
                </ModalPortal>
            )}
        </>
    )
}

export default BehavioristClientOverview;