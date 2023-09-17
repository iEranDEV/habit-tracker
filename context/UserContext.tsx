'use client';

import { createContext, useContext, useEffect, useState } from "react";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { Category, Habit, User } from "@/types";
import { useSession } from "next-auth/react";

export const UserContext = createContext({
    loading: false,
    user: undefined as User | undefined,
    setUser: (user: User | undefined) => { },
    categories: Array<Category>(),
    setCategories: (categories: Array<Category>) => { },
    habits: Array<Habit>(),
    setHabits: (habits: Array<Habit>) => { },
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(Array<Category>());
    const [habits, setHabits] = useState(Array<Habit>());

    const { data: session } = useSession();

    useEffect(() => {
        setLoading(true);
        if (session) {

        }
        setLoading(false);
    }, [session]);

    return (
        <UserContext.Provider value={{ loading, user, setUser, categories, setCategories, habits, setHabits }}>
            {children}
        </UserContext.Provider>
    );
};

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useContext(UserContext);

    if (loading || !user) {
        return <LoadingScreen />;
    }

    return children;
}