'use client';

import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { createContext, useEffect, useState } from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({
    loggedUser: null as User | null
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggedUser, setLoggedUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) {
                setLoggedUser(user);
            } else {
                setLoggedUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedUser }}>
            {loading ? (
                <LoadingScreen />
            ) : children}
        </AuthContext.Provider>
    );
};