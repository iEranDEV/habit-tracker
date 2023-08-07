'use client';

import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { createContext, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

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
                <div className='w-[100svw] h-[100svh] bg-neutral-50 flex justify-center items-center'>
                    <div className='animate-spin'>
                        <Loader2 color='#d4d4d4' />
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};