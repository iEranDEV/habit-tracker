'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "@/firebase/db/user";
import { Loader2 } from "lucide-react";
import { getCategories } from "@/firebase/db/category";

export const UserContext = createContext({
    user: null as any,
    categories: Array<Category>(),
    setCategories: (categories: Array<Category>) => {}
});

export const UserContextProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(Array<Category>());
    
    const { loggedUser } = useContext(AuthContext);

    useEffect(() => {
        if(loggedUser) {
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
                <div className='w-screen h-screen bg-neutral-50 flex justify-center items-center'>
                    <div className='animate-spin'>
                        <Loader2 color='#d4d4d4' />
                    </div>
                </div>
            ) : children}
        </UserContext.Provider>
    );
};