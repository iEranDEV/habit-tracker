'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "@/firebase/user";
import { Loader2 } from "lucide-react";

export const UserContext = createContext({
    user: null as any,
    categories: Array<Category>()
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

                setLoading(false);
            }

            syncData(loggedUser.uid);
        }
    }, [loggedUser]);

    return (
        <UserContext.Provider value={{ user, categories }}>
            {loading ? (
                <div className='w-[100svw] h-[100svh] bg-neutral-50 flex justify-center items-center'>
                    <div className='animate-spin'>
                        <Loader2 color='#d4d4d4' />
                    </div>
                </div>
            ) : children}
        </UserContext.Provider>
    );
};