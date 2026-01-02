import * as React from 'react';
import CloseIcon from '../../Assets/CloseIcon';
import FormTextAtom from 'Components/Atoms/FormTextField/FormTextAtom';
import { Dog } from 'Models/Dog';

interface CreateDogModalProps {
    dog: Dog | undefined;
    onReturn: (dog: Dog) => void;
    onClose: () => void;
}

const CreateDogModal: React.FC<CreateDogModalProps> = ({
    dog,
    onReturn,
    onClose,
}) => {
    const [updateDog, setUpdateDog] = React.useState<Partial<Dog>>({
        ...(dog?.name && { name: dog.name }) ?? '',
        ...(dog?.dateOfBirth && { dateOfBirth: dog.dateOfBirth }) ?? '',
    })

    const handleOnChange = <K extends keyof Dog>(
        field: K,
        value: Dog[K]
    ) => {
        setUpdateDog((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    function closeFlow() {
        onClose();
    }

    function onCreateDog() : void {
        if(!updateDog.name || !updateDog.dateOfBirth) return;
        
        const newDog = new Dog(
            dog?.id,
            updateDog.name ?? '',
            updateDog.dateOfBirth ?? ''
        );

        onReturn(newDog)
        console.log("You have successfully created a dog");
        console.log("Created dog: ", newDog);
        closeFlow();
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-scroll">                
                <div className="relative w-full max-w-lg bg-[#FFF6F2] rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto hide-scrollbar">
                    <div aria-label='Create client modal header' className='mb-4'>
                        <h2 className="text-center -mt-2 text-lg font-semibold">Create new client</h2>
                        <button
                            className="absolute top-4 right-4 flex items-center justify-center "
                            onClick={closeFlow}
                            aria-label="Close"
                            style={{ zIndex: 10 }}
                        >
                            <CloseIcon color="#f472b6" size={30} />
                        </button>
                    </div>
                    <div 
                        aria-label='Create Dog modal form'
                        className='grid grid-cols gap-5'
                    >
                            <FormTextAtom
                                label="First name *"
                                placeholder="Fido"
                                value={updateDog?.name ?? ''}
                                onChange={(e) => handleOnChange('name', e.target.value)}
                            />
                            <FormTextAtom
                                label="Date of birth"
                                placeholder="MM-DD-YYYY"
                                value={updateDog?.dateOfBirth ?? ''}
                                onChange={(e) => handleOnChange('dateOfBirth', e.target.value)}
                            />
                    </div>
                    <div className="flex flex-row gap-4 mt-4">
                        <button
                            className={`
                                flex-1 
                                py-2 
                                rounded-full 
                                border 
                                border-gray-300 
                                bg-white 
                                text-gray-700 
                                font-semibold 
                                hover:bg-gray-100`}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <div className="relative flex-1">
                            <button
                                className={`
                                    w-full 
                                    py-2 
                                    rounded-full 
                                    bg-pink-400 
                                    text-white 
                                    font-bold 
                                    hover:bg-pink-500 
                                    transition-colors 
                                    ${updateDog?.name && updateDog?.dateOfBirth ? '' : 'opacity-50 cursor-not-allowed'}`}
                                onClick={() => onCreateDog()}
                                disabled={!updateDog?.name || !updateDog?.dateOfBirth}
                            >
                                Create dog
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateDogModal;