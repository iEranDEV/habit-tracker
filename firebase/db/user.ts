import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { User } from "@/types";

export async function addUser(id: string, name: string, email: string) {
    const user: User = {
        id,
        name,
        email,
        settings: {
            firstDayOfWeek: 1,
            language: "en",
            modifyDaysPast: true,
            modifyDaysFuture: true
        }
    }
    const docRef = await setDoc(doc(db, "users", id), user);

    return docRef;
}

export async function getUser(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
        return docRef.data() as User;
    }
    return undefined;
}