import * as React from 'react';
import { useUserStore } from 'Stores/UserStore';
import { useHeaderContext } from 'Layout/Header/HeaderContext';
import { useEffect } from 'react';
import DisplayInterventions from 'Components/Organisms/DisplayPlan/DisplayInterventions';
import { getClientPlans } from 'Api/behavioralModificationPlans';

const ClientDashboard: React.FC = () => {
    const userStore = useUserStore()
    const {setTitle} = useHeaderContext()

    useEffect(() => {
        setTitle(`Welcome back,`)
    }, [setTitle]);

    const displayInterventionsFromLatestPlan = (): React.JSX.Element | null => {
        if(!userStore.user) return null;

        const clientPlans = getClientPlans(userStore.user.id)

        if(!clientPlans?.length) return null;

        const latestPlan = clientPlans.reduce((latest, plan) =>
        new Date(plan.createdAt) > new Date(latest.createdAt)
            ? plan
            : latest
        );

        return (
            <div className='text-slate-600'>
                <DisplayInterventions 
                    title='Current interventions'
                    plan={latestPlan} 
                    borderColor={'bordor-slate-200'} 
                    bgColor={'bg-white'} 
                />
            </div>
        )
    }

    return(

        <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
                <p className="text-gray-600">You can add your dashboard widgets here.</p>
            </div>
            {displayInterventionsFromLatestPlan()}
        </main>

    )
}

export default ClientDashboard;