'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "@/firebase/db/user";
import { getCategories } from "@/firebase/db/category";
import LoadingScreen from "@/components/LoadingScreen";
import { Category } from "@/types";

export const UserContext = createContext({
    user: null as any,
    categories: Array<Category>(),
    setCategories: (categories: Array<Category>) => { }
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(Array<Category>());

    const { loggedUser } = useContext(AuthContext);

    useEffect(() => {
        if (loggedUser) {
            const syncData = async (id: string) => {
                setLoading(true);

                const userDocRef = await getUser(id);
                setUser(userDocRef);

                const categories = await getCategories(id);
                setCategories(categories);

                setLoading(false);
            }

            syncData(loggedUser.uid);
        }
    }, [loggedUser]);

    return (
        <UserContext.Provider value={{ user, categories, setCategories }}>
            {loading ? (
                <LoadingScreen />
            ) : children}
        </UserContext.Provider>
    );
};