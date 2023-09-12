import { FirestoreError, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { User, UserSettings } from "@/types";

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

export async function updateUser(user: User, settings: UserSettings) {
    let result: User | null = null, error: FirestoreError | null = null;

    await updateDoc(doc(db, 'users', user.id), {
        settings: settings
    }).then(() => {
        result = { ...user, settings: settings };
    }).catch((e: FirestoreError) => {
        error = e;
    });

    return { result, error }
}

export async function getUser(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
        return docRef.data() as User;
    }
    return undefined;
}