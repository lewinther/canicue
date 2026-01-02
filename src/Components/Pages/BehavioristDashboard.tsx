
import * as React from 'react';
import { useHeaderContext } from 'Layout/Header/HeaderContext';
import { useEffect } from 'react';
import { useUserStore } from 'Stores/UserStore';
import { getBehavioristsClients } from 'Api/users';
import TrainingWeekOverview from 'Components/Organisms/TrainingLogsOverview/TrainingWeekOverview';

const BehavioristDashboard: React.FC = () => {	
	const {setTitle} = useHeaderContext()
	useEffect(() => {
		setTitle(`Welcome back`)
	}, [setTitle]);
	
	const userStore = useUserStore()
    if(!userStore.user) return null;
	const clients = getBehavioristsClients(userStore.user?.id)


	return (
		<>
			<main className="flex-block w-full md:mx-auto px-4 py-8 gap-3">
				<div className="flex flex-col md:flex-row md:gap-6">
					<div className='w-full md:w-fit mb-6 md:mb-0'>
						<TrainingWeekOverview clients={clients} />
					</div>
					<div className='w-full md:w-auto'>
						<div className="bg-white rounded-xl shadow p-6 mb-6">
							<h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
							<p className="text-gray-600">You can add your dashboard widgets here.</p>
						</div>
					</div>

				</div>
			</main>
		</>
	);
};

export default BehavioristDashboard;
