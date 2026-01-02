import { useUserStore } from 'Stores/UserStore';
import ClientLayout from './ClientLayout';
import BehavioristLayout from './BehavioristLayout';

export default function AuthenticatedLayout() {
    const userStore = useUserStore();

    return(
        <>
            {userStore.getRole() === 'Client' && <ClientLayout />}
            {userStore.getRole() === 'Behaviorist' && <BehavioristLayout />}
        </>
    )
}