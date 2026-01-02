import type { AnyUser, AnyUserRole } from "Models/User";
import { create } from "zustand";

export interface UserStore {
    initialized: boolean;
    user: AnyUser | undefined;
    setUser: (value: AnyUser | undefined) => void;
    getRole: () => AnyUserRole | undefined;
}

export const useUserStore = create<UserStore>((set, get) => ({
    initialized: false,
    user: undefined,
    setUser: ( value: AnyUser | undefined ) => set(() => ({user : value})),
    getRole: () => { 
        const user = get().user;
        return user ? user.role as AnyUserRole : undefined;
    }
}))
