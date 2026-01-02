import { getBehavioristsClients } from 'Api/users';
import type { Client } from 'Models/User';
import * as React from 'react';
import { useUserStore } from 'Stores/UserStore';

interface SimpleClientListProps {
    onCloseClientList: () => void;
    onSelectClient: (client: Client) => void
}

const SimpleClientList: React.FC<SimpleClientListProps> = ({
    onCloseClientList: thisOnClose,
    onSelectClient: thisOnSelect
}) => {
    const userStore = useUserStore();
    if(!userStore.user) return;
    const clients = getBehavioristsClients(userStore.user.id)
    if(!clients?.length) return;
    
    return(
        <>
            <div className='fixed inset-0 z-50 flex items-center justify-center '>
                <div 
                    className='absolute inset-0 bg-black/40'
                    onClick={thisOnClose}
                />
                <div className='absolute w-4/5 max-h-4/5 border border-orange-300 bg-white rounded-2xl p-1'>
                    {clients.map((client) => (
                        <button
                            key={client.name}
                            className='w-full text-center py-2 px-2 text-lg hover:bg-orange-300 rounded-lg'
                            onClick={() => {
                                thisOnSelect(client);
                            }}
                        >
                            {client.name}
                        </button>
                    ))}
                </div>

            </div>
        </>
    )
}

export default SimpleClientList;