import * as React from 'react';
import {useNavigate} from 'react-router-dom'
import HomeIcon from 'Components/Assets/HomeIcon';
import AddIcon from 'Components/Assets/AddIcon';
import SettingsIcon from 'Components/Assets/SettingsIcon';
import MailIcon from 'Components/Assets/MailIcon';
import PlansIcon from 'Components/Assets/PlansIcon';
import { useUserStore } from 'Stores/UserStore';
import { getClientPlans } from 'Api/behavioralModificationPlans';
import type { Intervention } from 'Models/Intervention';
import ActionSheet, { type iActionSheetItem } from 'Components/Molecules/ActionSheet/ActionSheet';
import CreateTrainingLog from 'Components/Molecules/CreateTrainingLog/CreateTrainingLog';
import ModalPortal from 'Components/Portals/ModalPortal';

const ICON_SIZE = 37;
const CENTER_ICON_SIZE = 75;
const COLOR = "#6B7280";

const ClientNavbarMolecule: React.FC = () => {
    const userStore = useUserStore()
    const navigate = useNavigate()
    
    const [showActions, setShowActions] = React.useState(false);
    const [selectedIntervention, setSelectedIntervention] = React.useState<Intervention[] | undefined>(undefined)
    const [showLogTraining, setShowLogTraining] = React.useState(false)

    function clickLogAllInterventions() {
        if(!userStore.user) return;
        const clientPlans = getClientPlans(userStore.user?.id);
        if (!clientPlans || clientPlans?.length === 0) return [];
        const latestPlan = clientPlans.reduce((latest, current) =>
            current.createdAt > latest.createdAt ? current : latest
        );
        setSelectedIntervention( latestPlan.interventions )
    }

    if (!userStore.user) return
    const clientPlans = getClientPlans(userStore?.user.id);
        if (!clientPlans?.length) return [];

    const latestPlan = clientPlans.reduce((latest, current) =>
        current.createdAt > latest.createdAt ? current : latest
    );
    
    function listInterventionsForActionItems(): iActionSheetItem[] {
        const interventions = latestPlan.interventions ?? [];
        if (interventions.length <= 1) {
            return [];
        }

        return [
            {
                label: 'Log for all interventions',
                onClick: () => {
                    clickLogAllInterventions();
                    setShowLogTraining(true);
                },
            },
            ...interventions.map(intervention => ({
                label: intervention.name,
                onClick: () => {
                    setSelectedIntervention([intervention]);
                    setShowLogTraining(true);
                },
            })),
        ];
    }

    function onCenterButtonClick() {
        const items = listInterventionsForActionItems();

        if (items.length === 0) {
            setSelectedIntervention(latestPlan.interventions);
            setShowLogTraining(true);
            
            console.log('in onCenterButtonClick() if statement')
            return;
        } else if ( items.length >= 1) {
            setShowActions(true)
            return;
        }
    }

    const buttonIcons = [
        { 
            icon: <HomeIcon  size={ICON_SIZE} color={COLOR}/>, 
            onClick: () => navigate(`/${userStore?.user?.name}-dashboard`),
            alt: 'Home' 
        },
        { 
            icon: <PlansIcon size={ICON_SIZE} fillColor={COLOR}/>, 
            onClick: () => navigate(`/${userStore?.user?.name}-plans-overview`), 
            alt: 'Plans' 
        },
        { 
            icon: <AddIcon size={CENTER_ICON_SIZE} />, 
            onClick: () => onCenterButtonClick(),
            alt: 'Add', 
            center: true 
        },
        { 
            icon: <SettingsIcon size={ICON_SIZE} color={COLOR}/> ,
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
                className="scroll-hidden fixed bottom-0 left-0 w-full flex justify-between items-center bg-white shadow-[0_-2px_16px_0_rgba(0,0,0,0.04)] px-6 pt-8 pb-2 z-50"
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
                <ModalPortal>
                    <ActionSheet 
                        onClose={() => setShowActions(false)} 
                        actions={listInterventionsForActionItems()}            
                    />
                </ModalPortal>
            )}

            {showLogTraining && (
                <ModalPortal>
                    <CreateTrainingLog 
                        trainingLog={undefined}
                        interventions={Array.isArray(selectedIntervention) ? selectedIntervention : selectedIntervention ? [selectedIntervention] : []} 
                        plan={latestPlan}
                        onClose={() => setShowLogTraining(false)}
                    />
                </ModalPortal>
            )}
        </>
    );
};

export default ClientNavbarMolecule;