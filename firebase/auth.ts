import { FirebaseError } from "firebase/app";
import firebase_app from "./config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(firebase_app);

export async function signUp(email: string, password: string) {
    let result = null, error = null;
    result = await createUserWithEmailAndPassword(auth, email, password).catch((e: FirebaseError) => {
        error = e;
    });

    return { result, error };
}

export async function signIn(email: string, password: string) {
    let result = null, error = null;
    result = await signInWithEmailAndPassword(auth, email, password).catch((e: FirebaseError) => {
        error = e;
    });

    return { result, error };
}