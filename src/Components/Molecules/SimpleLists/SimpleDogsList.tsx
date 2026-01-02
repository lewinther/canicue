import { getDogFromId } from 'Api/dogs';
import type { Client } from 'Models/User';
import * as React from 'react';

interface SimpleDogsListProps {
    client: Client | undefined;
    onCloseDogsList: () => void;
    onSelectDog: (dogId: string | undefined) => void;
}

const SimpleDogsList: React.FC<SimpleDogsListProps> = ({
    client,
    onCloseDogsList: onClose,
    onSelectDog: onSelect
}) => {
    const dogIds = client?.dogIds
    const dogs = dogIds?.map((dog) => getDogFromId(dog)) || []
    if(!dogs.length) return;

    return(
        <>
            <div className='fixed inset-0 z-50 flex items-center justify-center '>
                <div 
                    className='absolute inset-0 bg-black/40'
                    onClick={onClose}
                />
                <div className='absolute w-4/5 max-h-4/5 border border-orange-300 bg-white rounded-2xl p-1'>
                    {dogs.map((dog) => (
                        <button
                            key={dog?.name}
                            className='w-full text-center py-2 px-2 text-lg hover:bg-orange-300 rounded-lg'
                            onClick={() => {
                                onSelect(dog?.id);
                            }}
                        >
                            {dog?.name}
                        </button>
                    ))}
                </div>
            </div>

        </>
    )
}

export default SimpleDogsList