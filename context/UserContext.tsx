'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/firebase/db/user";
import { getCategories } from "@/firebase/db/category";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { Category, Habit, User } from "@/types";
import { getHabits } from "@/firebase/db/habit";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setLoading(true);
            if (data) {
                // User is logged in (sync his data)
                const syncData = async (id: string) => {
                    const userDocRef = await getUser(id);
                    const categories = await getCategories(id);
                    const habits = await getHabits(id);

                    setUser(userDocRef);
                    setCategories(categories);
                    setHabits(habits);
                }

                syncData(data.uid);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ loading, user, setUser, categories, setCategories, habits, setHabits }}>
            {children}
        </UserContext.Provider>
    );
};

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useContext(UserContext);
    if (loading || (!user && window.location.pathname !== '/auth/login')) {
        return <LoadingScreen />;
    }

    return children;
}