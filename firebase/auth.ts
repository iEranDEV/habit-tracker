import { FirebaseError } from "firebase/app";
import firebase_app from "./config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { addUser } from "./db/user";

const auth = getAuth(firebase_app);

export async function signUp(name: string, email: string, password: string) {
    let error = null;
    const result = await createUserWithEmailAndPassword(auth, email, password).catch((e: FirebaseError) => {
        error = e;
    });

    if(result) {
        addUser(result.user.uid, name, email)
    }

    return { result, error };
}

export async function signIn(email: string, password: string) {
    let result = null, error = null;
    result = await signInWithEmailAndPassword(auth, email, password).catch((e: FirebaseError) => {
        error = e;
    });

    return { result, error };
}