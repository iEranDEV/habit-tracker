'use client';

import { createContext, useContext, useEffect, useState } from "react";
import LoadingScreen from "@/components/layout/LoadingScreen";
import type { User } from '@prisma/client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const UserContext = createContext({
    user: null as User | null,
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const { data: session } = useSession();

    useEffect(() => {
        /*const fetchData = async () => {
            const data = await fetch(`http://localhost:3000/api/user`).then(r => r.json());
            setUser(data);
        }

        if (session?.user) fetchData();*/
    }, [session?.user]);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

export function ProtectedRoute({ children }: { children: JSX.Element }) {

    const router = useRouter();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/auth/login');
        },
    });

    if (status === 'loading') {
        return <LoadingScreen />;
    }

    return children;
}