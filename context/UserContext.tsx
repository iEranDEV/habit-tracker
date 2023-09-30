'use client';

import LoadingScreen from "@/components/layout/LoadingScreen";
import { UserSettings } from "@prisma/client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";


export const UserContext = createContext<{
    settings: UserSettings | undefined,
    updateSettings: Function
}>({
    settings: undefined,
    updateSettings: () => { }
});

export const SettingsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<UserSettings | undefined>(undefined);

    const { data: session } = useSession();

    const updateSettings = async (data: Partial<UserSettings>) => {
        const response = await fetch(`/api/settings`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        const json = await response.json();
        if (json) setSettings(json);

        return json;
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/settings`).then(r => r.json());
            setSettings(data);
        }

        if (session?.user) fetchData();
    }, [session?.user]);

    return (
        <UserContext.Provider value={{ settings, updateSettings }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserSettings = () => useContext(UserContext);

export function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const router = useRouter();

    const { settings } = useUserSettings();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/auth/login');
        },
    });

    if (status === 'loading' || !settings) {
        return <LoadingScreen />;
    }

    return children;
}