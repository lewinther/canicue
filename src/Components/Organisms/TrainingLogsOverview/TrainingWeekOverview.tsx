import * as React from 'react'
import type { Client } from "Models/User"
import CreateClientModal from 'Components/Molecules/CreateClient/CreateClient'
import ModalPortal from 'Components/Portals/ModalPortal'
import PlusIcon from 'Components/Assets/PlusIcon'
import ClientTrainingLogOverview from './ClientTrainingWeek'

interface TrainingWeekOverviewProps{
    clients: Client[] | null
}

const TrainingLogsOverview: React.FC<TrainingWeekOverviewProps> = ({
    clients,
}) => {
    const [showCreateClient, setShowCreateClient] = React.useState(false)

    const renderClients = (): React.JSX.Element | null => {
        return(
            <>
                {clients?.map((client) =>
                    <ClientTrainingLogOverview client={client} />
                )}
            </>
        )
    }


    return (
        <>
            <section className="rounded-2xl bg-orange-50 p-4 shadow-sm w-full md:mx-auto">
                <header className="flex items-center justify-between md:justify-center mb-3">
                    <h2 className="text-xl font-semibold">Your clients trainings</h2>
                    <button
                        className={`
                            md:hidden
                            w-2/5
                            py-1 
                            rounded-full 
                            bg-pink-400 
                            text-white 
                            font-bold 
                            text-base
                            text-center
                            hover:bg-pink-500 
                            transition-colors 
                            flex 
                            place-items-center 
                            place-content-around
                            gap-1
                        `}
                        onClick={() => setShowCreateClient(true)}
                    >
                        <div className='flex flex-row gap-2 place-items-center '>
                            <PlusIcon size={18} color='white'/>
                            Add client
                        </div>
                    </button>
                </header>

                <div className="grid grid-cols-[auto_fr] gap-2">
                    {renderClients()}
                </div>
            </section>

            {showCreateClient && (
                <ModalPortal>
                    <CreateClientModal 
                        onClose={() => setShowCreateClient(false)} 
                    />
                </ModalPortal>
            )}
        </>
    )
}

export default TrainingLogsOverview