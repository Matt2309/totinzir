'use client';

import {createContext, useContext} from "react";

interface UserContextType {
    userId: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export function UserProvider({ children, userId }: { children: React.ReactNode, userId: string | null }) {
    return (
        <UserContext.Provider value={{ userId }}>
            {children}
        </UserContext.Provider>
    );
}