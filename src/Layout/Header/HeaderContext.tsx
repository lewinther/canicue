import { createContext, useContext } from "react";

export interface iHeaderContext {
    title: string;
    setTitle: (title: string) => void;
}

export const HeaderContext = createContext<iHeaderContext | null>(null)

export const useHeaderContext = () => {
    const ctx = useContext(HeaderContext)
    if (!ctx) {
        throw new Error('useHeader must be used within HeaderProvider')
    }
    return ctx;
}