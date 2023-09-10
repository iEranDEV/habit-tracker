import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";

export async function addUser(id: string, name: string, email: string) {
    const docRef = await setDoc(doc(db, "users", id), {
        id: id,
        name: name,
        email: email
    });

    return docRef;
}

export async function getUser(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
        return docRef.data();
    }
    return null;
}