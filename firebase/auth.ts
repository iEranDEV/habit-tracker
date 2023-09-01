import { FirebaseError } from "firebase/app";
import firebase_app from "./config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'
import { addUser } from "./db/user";

const auth = getAuth(firebase_app);

const googleProvider = new GoogleAuthProvider();

export async function signUp(name: string, email: string, password: string) {
    let error = null;
    const result = await createUserWithEmailAndPassword(auth, email, password).catch((e: FirebaseError) => {
        error = e;
    });

    if (result) {
        await addUser(result.user.uid, name, email)
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

export async function logOut() {
    auth.signOut();
}

export async function signInGoogle() {
    signInWithRedirect(auth, googleProvider);
}

export async function getRedirect() {
    return getRedirectResult(auth).then(async (result) => {
        if (result) {
            const user = result.user;
            await addUser(result.user.uid, user.displayName || '', user.email || '');
            return { success: true }
        }
    }).catch((error) => {
        return error;
    });
}