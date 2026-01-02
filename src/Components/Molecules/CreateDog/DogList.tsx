import { getDogFromId } from 'Api/dogs';
import type { Dog } from 'Models/Dog';
import * as React from 'react';

interface DogListProps{
    dogIds: string[] | [],
    onSelectDog: (value: Dog) => void
}

const DogList: React.FC<DogListProps> = ({
    dogIds: theseDogIds,
    onSelectDog
}) => {

    const dogs = theseDogIds.map((dog) => getDogFromId(dog)).filter((dog): dog is Dog => dog !== null)
    if(!dogs.length) return;

    function selectDog( value: Dog ) {
        onSelectDog(value);
    }

    if(theseDogIds.length < 1) return ( <></> )

    const title = theseDogIds.length === 1 ? 'Dog' : 'Dogs'

    return (
        <>
            <div aria-label="Saved dogs" className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
                {dogs.map((dog, index) => (
                    <div key={index} className="mb-2 border rounded-lg bg-gray-50">
                        <button
                            className="w-full text-left px-4 py-2 focus:outline-none"
                                onClick={() => selectDog(dog)}>
                            <span className="font-medium text-gray-700">{dog?.name || 'Unnamed dog'}</span>
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DogList;