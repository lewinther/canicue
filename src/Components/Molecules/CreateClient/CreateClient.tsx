import * as React from 'react';
import CloseIcon from '../../Assets/CloseIcon';
import FormTextAtom from 'Components/Atoms/FormTextField/FormTextAtom';
import { Client } from 'Models/User';
import CreateDogModal from '../CreateDog/CreateDog';
import { Dog } from 'Models/Dog';
import DogList from '../CreateDog/DogList';
import { useCreateClientStore } from 'Stores/CreateClientStore';
import { useUserStore } from 'Stores/UserStore';
import ToolTipAtom from 'Components/Atoms/ToolTip/ToolTipAtom';

interface CreateClientModalProps {
    onClose: () => void;
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({
    onClose,
}) => {
    const createClientStore = useCreateClientStore()
    const clientFromStore = createClientStore.client;
    const userStore = useUserStore()
    const [dogFormActive, setDogFormActive] = React.useState<boolean>(false)
    const [selectedDog, setSelectedDog] = React.useState<Dog | undefined>(undefined)
    const [phoneInput, setPhoneInput] = React.useState('')
    const [showPhoneTooltip, setShowPhoneTooltip] = React.useState(false);
    const phoneInputRef = React.useRef<HTMLInputElement>(null);
    const [emailInput, setEmailInput] = React.useState(clientFromStore?.email ?? '');
    const [showEmailTooltip, setShowEmailTooltip] = React.useState(false);
    const emailInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        setPhoneInput(clientFromStore?.phoneNr?.toString() ?? '');
    }, [clientFromStore?.phoneNr]);
    
    function closeFlow() {
        createClientStore.resetClientForm()
        onClose();
    }

    const handleOnChange = <K extends keyof Client>(
        field: K,
        value: Client[K]
    ) => {
        createClientStore.updateClient({
            [field]: value,
        } as Pick<Client, K>);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handleEmailChange(value: string) {
    setEmailInput(value);

    if (value === '' || !emailRegex.test(value)) {
        setShowEmailTooltip(true);
    } else {
        setShowEmailTooltip(false);
    }

    // Only update store if valid
    if (emailRegex.test(value)) {
        handleOnChange('email', value);
    }
}

    function handlePhoneChange(value: string) {
        if (value === '') {
            setPhoneInput('');
            handleOnChange('phoneNr', 0);
            setShowPhoneTooltip(false);
            return;
        }

        if (!/^\d+$/.test(value)) {
            setShowPhoneTooltip(true);
            return;
        }

        setShowPhoneTooltip(false);
        setPhoneInput(value);
        handleOnChange('phoneNr', Number(value));
    }

    function selectDog(dog: Dog) {
        setSelectedDog(dog);
        setDogFormActive(true)
    }

    function submitDog( dog: Dog ) {
        createClientStore.addDogId(dog.id);
        closeDogFlow()
        console.log('In createDog, dog created: ' + dog);
    }

    //TODO: move to api
    function createClient(client: Client) : void {
        if(!client || !client.dogIds || !userStore.user) return;

        const newClient = 
            new Client(
                client.id,
                client.name,
                client.lastName,
                client.email,
                client.phoneNr,
                userStore.user.id,
                client.dogIds
            )

        createClientStore.setBehavioristId(userStore.user?.id)
        console.log('You have succefully created a client');
        console.log('Created client', newClient);
    }

    //TODO: move to api
    function updateClient(value: Client) : void {
        if(!value || !value.dogIds) return;
        console.log('You have succefully updated a client');
        console.log('Updated client', value);
    }

    function submitClient () {
        if (!emailRegex.test(emailInput)) {
            setShowEmailTooltip(true);
            emailInputRef.current?.focus();
            return;
        }

        setShowEmailTooltip(false);
        handleOnChange('email', emailInput);

        const {client, dogIds, mode } = useCreateClientStore.getState();

        const currentClient: Client = {
            ...client,
            dogIds
        } as Client;

        mode === 'create'
            ? createClient(currentClient)
            : updateClient(currentClient)

        closeFlow()
        createClientStore.resetClientForm()

    }

    function closeDogFlow() {
        setDogFormActive(false)
        setSelectedDog(undefined)
    }

    return(
        <>
            {dogFormActive && (
                <CreateDogModal 
                    dog={selectedDog}
                    onReturn={submitDog}
                    onClose={closeDogFlow}
                />
            )}
            {!dogFormActive && (
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
                            aria-label='Create client modal'
                            className='gap-2'
                        >
                            <div className='grid grid-cols-2 gap-4'>
                                <FormTextAtom
                                    label="First name *"
                                    placeholder="Jane"
                                    value={clientFromStore?.name ?? ''}
                                    onChange={(e) => handleOnChange('name', e.target.value)}
                                />
                                <FormTextAtom
                                    label="Last name *"
                                    placeholder="Doe"
                                    value={clientFromStore?.lastName ?? ''}
                                    onChange={(e) => handleOnChange('lastName', e.target.value)}
                                />
                            </div>
                            <FormTextAtom
                                label="Email *"
                                placeholder="you@example.com"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                ref={emailInputRef}
                            />  
                            {showEmailTooltip && (
                                <ToolTipAtom
                                    show={showEmailTooltip}
                                    message="Please enter a valid email address"
                                    targetRef={emailInputRef}
                                    onClose={() => setShowEmailTooltip(false)}
                                />
                            )}
                            
                            <FormTextAtom
                                ref={phoneInputRef}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                label="Phone number"
                                placeholder= '12345678'
                                value={phoneInput}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                            />  
                            {showPhoneTooltip && (
                                <ToolTipAtom 
                                    show={showPhoneTooltip} 
                                    message={'Phone number must be numeric'} 
                                    targetRef={phoneInputRef} 
                                    onClose={()=> setShowPhoneTooltip(false)}
                                />
                            )}
                        </div>
                        <DogList
                            dogIds={clientFromStore?.dogIds || []}
                            onSelectDog={selectDog}
                        />
                        <button
                            type="button"
                            className="w-40 mt-3 py-1 px-3 place-self-center object-center rounded-full bg-purple-300 text-white font-semibold hover:bg-purple-400 text-xs"
                            onClick={() => setDogFormActive(true)}>
                            Add dog
                        </button>
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
                                onClick={()=> closeFlow()}
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
                                    `}
                                    onClick={() => submitClient()}
                                >
                                    Create client
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateClientModal