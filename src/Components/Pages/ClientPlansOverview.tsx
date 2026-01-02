import * as React from 'react';
import { useHeaderContext } from 'Layout/Header/HeaderContext';
import { useEffect } from 'react';
import { getClientPlans } from 'Api/behavioralModificationPlans';
import { getDogFromId } from 'Api/dogs';
import { useUserStore } from 'Stores/UserStore';
import DisplayPlan from 'Components/Organisms/DisplayPlan/DisplayPlan';
import PlanIcon from 'Components/Assets/PlanIcon';
import DogIcon from 'Components/Assets/DogIcon';
import type { BehaviouralModificationPlan } from 'Models/BehavioralModificationPlan';

const ClientPlansOverview: React.FC = () => {
    const userStore = useUserStore()   
    const {setTitle} = useHeaderContext()
    useEffect(() => {
        setTitle(`Plans`)
    }, [setTitle]);

    const displayPlans = (): React.JSX.Element | null => {
        if(!userStore.user) return null;
        const clientPlans = getClientPlans(userStore.user.id)

        if(!clientPlans?.length) return null;

        const sortedPlans = clientPlans.sort((a, b) => {
            return Number(b.createdAt) - Number(a.createdAt);
        });

        function getDogName(plan: BehaviouralModificationPlan) {
            const dog= getDogFromId(plan.dogId)
            return dog?.name
        }

        return (
            <>
                {sortedPlans.map((plan) => (
                    <React.Fragment key={plan.id}>
                        <div className='border-2 rounded-2xl shadow-sm grid grid-rows-2 space-y-2 p-5 m-5 bg-zinc-50'>
                            <div className='row-span-2 mb-2'>
                                <div className='grid grid-cols-[auto_1fr] items-start gap-2 mb-2'>
                                    <DogIcon color='#6B7280' size={25}/>
                                    <p className='text-sm text-slate-500'>{getDogName(plan) || 'Unknown'}</p>
                                </div>
                                <div className='grid grid-cols-[auto_1fr] items-start gap-2 mt-2'>
                                    <PlanIcon size={25} fillColor='#6B7280'/>
                                    <p className='text-sm text-slate-500 font-bold'>{plan.details.name}</p>
                                </div>
                            </div>
                            <div className='row-span-2'>
                                <DisplayPlan plan={plan} showTitle={false}/>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </>
        )
    }

    return (
        <>
            <div className='
                space-y-2
            '>
                {displayPlans()}
            </div>

        </>
    )
}

export default ClientPlansOverview;