'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "@/firebase/db/user";
import { getCategories } from "@/firebase/db/category";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { Category, Habit, User } from "@/types";
import { getHabits } from "@/firebase/db/habit";

const defaultUser: User = {
    id: "",
    name: "",
    email: "",
    settings: {
        firstDayOfWeek: 1,
        language: 'en',
        modifyDaysPast: true,
        modifyDaysFuture: true
    }
}

export const UserContext = createContext({
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
        <UserContext.Provider value={{ user, setUser, categories, setCategories, habits, setHabits }}>
            {loading ? (
                <LoadingScreen />
            ) : children}
        </UserContext.Provider>
    );
};