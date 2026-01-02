import * as React from 'react'
import type { Client } from "Models/User"
import { getUsertLogs } from 'Api/trainingLogs'
import { getClientTrainingDaysLastWeekCET, getLast7DaysCET } from './WeekdaysHelper'
import MailIcon from 'Components/Assets/MailIcon'

interface ClientTrainingLogOverviewProps{
    client: Client
}

const ClientTrainingLogOverview: React.FC<ClientTrainingLogOverviewProps> = ({
    client,
}) => {
    const clientLogs = getUsertLogs(client.id);
    const latestWeekTrainings = getClientTrainingDaysLastWeekCET(clientLogs)

    const renderWeekBubbles = (): React.JSX.Element =>  {
        const days = getLast7DaysCET()
        return (
            <>
                {days.map(({ dayKey, weekday, label }) => {
                    let hasLog = false;

                    for (const key in latestWeekTrainings) {
                        if (latestWeekTrainings[key]?.weekday === weekday) {
                            hasLog = latestWeekTrainings[key].logged ?? false;
                            break;
                        }
                    }

                    const bubbleStyles = `
                        w-6 h-6 md:w-10 md:h-10 md:text-base rounded-full text-xs flex items-center justify-center
                        ${hasLog ? "bg-teal-300" :  "bg-slate-200"}
                    `;

                    return (
                        <React.Fragment key={dayKey}>
                            <span className={bubbleStyles}>{label}</span>
                        </React.Fragment>
                    );
                })}
            </>
        )
    }

    const renderClient = (): React.JSX.Element | null => {
        return(
            <>
                <React.Fragment key={client.id}>
                    <div className="flex items-center justify-between bg-white rounded-full px-3 py-2">
                        <span className="text-sm md:text-lg md:font-medium pl-3 pr-5">
                            {client.name}
                        </span>
                        <div className='hidden md:flex items-center gap-5'>
                            <div className='flex flex-row-reverse gap-2'>
                                {renderWeekBubbles()}
                            </div>
                            <span className='overflow-hidden pr-2 pt-3'>
                                <MailIcon size={50} fillColor='#fdba74'/>
                            </span>
                        </div>
                        <div className='md:hidden'>
                            <span className='flex flex-row-reverse gap-2'>
                                {renderWeekBubbles()}
                            </span>
                        </div>
                    </div>
                </React.Fragment>
            </>
        )
    }


    return (
        <>
            <div className="grid grid-cols-[auto_fr]">
                {renderClient()}
            </div>
        </>
    )
}

export default ClientTrainingLogOverview