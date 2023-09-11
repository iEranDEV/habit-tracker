'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "@/firebase/db/user";
import { getCategories } from "@/firebase/db/category";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { Category, Habit } from "@/types";
import { getHabits } from "@/firebase/db/habit";

export const UserContext = createContext({
    user: null as any,
    categories: Array<Category>(),
    setCategories: (categories: Array<Category>) => { },
    habits: Array<Habit>(),
    setHabits: (habits: Array<Habit>) => { },
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(Array<Category>());
    const [habits, setHabits] = useState(Array<Habit>());

    const { loggedUser } = useContext(AuthContext);

    useEffect(() => {
        if (loggedUser) {
            const syncData = async (id: string) => {
                setLoading(true);

                const userDocRef = await getUser(id);
                setUser(userDocRef);

                const categories = await getCategories(id);
                setCategories(categories);

                const habits = await getHabits(id);
                setHabits(habits);

                setLoading(false);
            }

            syncData(loggedUser.uid);
        }
    }, [loggedUser]);

    return (
        <UserContext.Provider value={{ user, categories, setCategories, habits, setHabits }}>
            {loading ? (
                <LoadingScreen />
            ) : children}
        </UserContext.Provider>
    );
};