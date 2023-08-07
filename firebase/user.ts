import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "./config";

const db = getFirestore(firebase_app);

export async function addUser(id: string, name: string, email: string) {
    const docRef = await setDoc(doc(db, "users", id), {
        name: name,
        email: email
    });

    return docRef;
}

export async function getUser(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if(docRef.exists()) {
        return docRef.data();
    } 
    return null;
}