import * as React from 'react';
import HomeIcon from 'Components/Assets/HomeIcon';
import ClientsIcon from 'Components/Assets/ClientsIcon';
import AddIcon from 'Components/Assets/AddIcon';
import SettingsIcon from 'Components/Assets/SettingsIcon';
import MailIcon from 'Components/Assets/MailIcon';
import { useUserStore } from 'Stores/UserStore';
import { useNavigate } from 'react-router-dom';
import ActionSheet from 'Components/Molecules/ActionSheet/ActionSheet';
import CreatePlanWizardModal from 'Components/Organisms/CreatePlanWizard/CreatePlanWizardModal';
import SimpleClientList from 'Components/Molecules/SimpleLists/SimpleClientList';
import { Client } from 'Models/User';
import SimpleDogsList from 'Components/Molecules/SimpleLists/SimpleDogsList';
import CreateClientModal from 'Components/Molecules/CreateClient/CreateClient';

const ICON_SIZE = 37;
const CENTER_ICON_SIZE = 75;
const COLOR = "#6B7280";

const BehavioristNavbarMolecule: React.FC = () => {
    const userStore = useUserStore();
    const navigate = useNavigate();
    const [showActions, setShowActions] = React.useState(false);
    const [showClients, setShowClients] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState<Client | undefined>(undefined);
    const selectedClientId = selectedClient?.id;
    const [showDogs, setShowDogs] = React.useState(false);
    const [selectedDogId, setSelectedDogId] = React.useState<string | undefined>(undefined);
    const [showPlanWizard, setShowPlanWizard] = React.useState(false);
    const [showCreateClient, setShowCreateClient] = React.useState(false);


    const centerClickActionItems = [
        {
            label: 'Create new plan',
            onClick: () => setShowClients(true),
        },
        {
            label: 'Add Client',
            onClick: () => setShowCreateClient(true),
        },
        // {
        //     label: 'Send Message',
        //     onClick: () => console.log('Send message'),
        // },
    ]

    const buttonIcons = [
        { 
            icon: <HomeIcon size={ICON_SIZE} color={COLOR}/>, 
            onClick: () => 
                navigate(`/${userStore?.user?.name}-dashboard`)
            ,
            alt: 'Home' 
        },
        { 
            icon: <ClientsIcon size={ICON_SIZE} color={COLOR}/>, 
            onClick: () => 
                navigate(`/${userStore?.user?.name}-clients-overview`)
            ,
            alt: 'Clients' 
        },
        { 
            icon: <AddIcon size={CENTER_ICON_SIZE}/>, 
            onClick: () => setShowActions(true)
            ,
            alt: 'Add', 
            center: true 
        },
        { 
            icon: <SettingsIcon size={ICON_SIZE} color={COLOR}/>,
            onClick: () => 
                navigate('*')
            , 
            alt: 'Settings' 
        },
        { 
            icon: <MailIcon size={ICON_SIZE} fillColor={COLOR}/>,
            onClick: () => 
                navigate('*')
            , 
            alt: 'Mail' 
        },
    ];
    
    return (
        <>
        <nav
            className="fixed bottom-0 left-0 w-full flex justify-between items-center bg-white shadow-[0_-2px_16px_0_rgba(0,0,0,0.04)] px-6 pt-8 pb-2 z-50"
            role="navigation"
        >
            {buttonIcons.map((item) =>
                item.center ? (
                    <div key={item.alt} className="flex justify-center items-center -mt-8">
                        <button
                            onClick={item.onClick}
                        >
                            {item.icon}
                        </button>
                    </div>
                ) : (
                    <button
                        key={item.alt}
                        className="flex flex-col items-center p-0 bg-transparent border-none"
                        onClick={item.onClick}
                    >
                        {item.icon}
                    </button>
                )
            )}
        </nav>

        {showActions && (
            <ActionSheet 
                onClose={() => setShowActions(false)} 
                actions={centerClickActionItems}            
            />
        )}

        {showClients && (
            <SimpleClientList 
                onCloseClientList={() => setShowClients(false)} 
                onSelectClient={(client) => {
                    setSelectedClient(client);
                    if(client.dogIds.length === 1){
                        setSelectedDogId(client.dogIds[0]);
                        setShowPlanWizard(true);
                    }
                    if(client.dogIds.length > 1){
                        setShowDogs(true);
                    }
                    setShowClients(false);
                }}
            />
        )}

        {showDogs && (
            <SimpleDogsList 
                client={selectedClient} 
                onCloseDogsList={() => setShowDogs(false)} 
                onSelectDog={(dogId) => {
                    setSelectedDogId(dogId);
                    setShowPlanWizard(true)
                    setShowDogs(false);
                }}                
            />
        )}

        {showPlanWizard && (
            <CreatePlanWizardModal 
                clientId={selectedClientId} 
                dogId={selectedDogId} 
                onClose={() => setShowPlanWizard(false)}          
            />
        )}

        {showCreateClient && (
            <CreateClientModal 
                onClose={() => setShowCreateClient(false)} 
            />
        )}
        </>
    );
};

export default BehavioristNavbarMolecule;