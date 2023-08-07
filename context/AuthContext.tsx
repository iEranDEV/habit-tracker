'use client';

import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { createContext, useEffect, useState } from 'react';
import Loader from '@/app/components/utils/Loader';
import { Loader2 } from 'lucide-react';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
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