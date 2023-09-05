import { FirestoreError, Timestamp, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, or, query, setDoc, updateDoc, where } from "firebase/firestore";
import firebase_app from "../config";
import { v4 as uuid } from 'uuid';
import { Category } from "@/types";

const db = getFirestore(firebase_app);

export async function addCategory(name: string, color: string, icon: string, createdBy: string) {
    const id = uuid();
    const category: Category = { id, name, color, icon, createdBy, createdAt: Timestamp.now() };
    let result: Category | null = null, error: FirestoreError | null = null;

    await setDoc(doc(db, "categories", id), category).then(() => {
        result = category;
    }).catch((e: FirestoreError) => {
        error = e;
    })

    return { result, error }
}

export async function updateCategory(id: string, category: Category) {
    let result: Category | null = null, error: FirestoreError | null = null;

    await updateDoc(doc(db, "categories", id), {
        name: category.name,
        icon: category.icon,
        color: category.color
    }).then(() => {
        result = category;
    }).catch((e: FirestoreError) => {
        error = e;
    });

    return { result, error }
}

export async function deleteCategory(id: string) {
    let result: string | null = null, error: FirestoreError | null = null;

    await deleteDoc(doc(db, "categories", id)).then(() => {
        result = id;
    }).catch((e: FirestoreError) => {
        error = e;
    });

    return { result, error }
}

export async function getCategory(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
        return docRef.data();
    }
    return null;
}

export async function getCategories(userID: string) {
    const q = query(collection(db, "categories"), or(where('createdBy', '==', userID), where('createdBy', '==', '')));
    const querySnapshot = await getDocs(q);
    const categories = Array<Category>();
    querySnapshot.forEach((doc) => {
        categories.push(doc.data() as Category);
    })

    return categories;
}