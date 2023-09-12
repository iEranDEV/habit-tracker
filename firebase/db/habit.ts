import { FirestoreError, Timestamp, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, or, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config";
import { v4 as uuid } from 'uuid';
import { Habit } from "@/types";

export async function addHabit(data: Habit) {
    const id = uuid();
    const habit: Habit = { ...data, id };
    let result: Habit | null = null, error: FirestoreError | null = null;

    await setDoc(doc(db, "users", habit.createdBy, "habits", id), habit).then(() => {
        result = habit;
    }).catch((e: FirestoreError) => {
        error = e;
    })

    return { result, error }
}

/*export async function updateCategory(id: string, category: Category) {
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
}*/

/*export async function deleteCategory(id: string) {
    let result: string | null = null, error: FirestoreError | null = null;

    await deleteDoc(doc(db, "categories", id)).then(() => {
        result = id;
    }).catch((e: FirestoreError) => {
        error = e;
    });

    return { result, error }
}*/

/*export async function getCategory(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
        return docRef.data();
    }
    return null;
}*/

export async function getHabits(userID: string) {
    const q = query(collection(db, "users", userID, "habits"));
    const querySnapshot = await getDocs(q);
    const habits = Array<Habit>();
    querySnapshot.forEach((doc) => {
        habits.push(doc.data() as Habit);
    })

    return habits;
}