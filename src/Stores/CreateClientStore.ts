import { create } from 'zustand';
import type { Client } from 'Models/User';

export interface CreateClientStore {
    mode: 'create' | 'edit';
    client: Partial<Client> | undefined;
    dogIds: string[];
    setBehavioristId: (value: string) => void;
    setClient: (data: Partial<Client>) => void;
    addDogId: (dogId: string) => void;
    updateClient: (client: Partial<Client>) => void;
    resetClientForm: () => void;
    isClientValid: () => boolean;
}

export const useCreateClientStore = create<CreateClientStore>((set, get) => ({
    mode: 'create',
    client: undefined,
    dogIds: [],
    setBehavioristId: (value: string) => set((state) => ({client: state.client?.setBehavioristId?.(value)})),
    setClient: (value: Partial<Client>) => set({ client: value }),
    addDogId: (value : string) => 
        set((state) => {
        const updatedClient = state.client?.setDogIds?.(value);
        return updatedClient ? { client: updatedClient, dogIds: updatedClient.dogIds } : {};
    }),
    updateClient: (client: Partial<Client>) => set((state) => ({ client: { ...state.client, ...client} })),
    resetClientForm: () => set({ client: undefined, dogIds: [] }),
    isClientValid: () => {
        const c = get().client;
        return !!(c?.name && c?.lastName && c?.email);
    }
}))