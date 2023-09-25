'use client';

import LoadingScreen from "@/components/layout/LoadingScreen";
import { UserSettings } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";


export const UserContext = createContext<{
    settings: UserSettings | undefined
}>({
    settings: undefined
});

export const SettingsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<UserSettings | undefined>(undefined);

    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:3000/api/settings`).then(r => r.json());
            setSettings(data);
        }

        if (session?.user) fetchData();
    }, [session?.user]);

    return (
        <UserContext.Provider value={{ settings }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserSettings = () => useContext(UserContext);

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