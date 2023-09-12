import { FirestoreError, Timestamp, and, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, or, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config";
import { v4 as uuid } from 'uuid';
import { CheckIn, Habit } from "@/types";

export async function addCheckInDB(data: CheckIn) {
    const id = uuid();
    const checkIn: CheckIn = { ...data, id };
    let result: CheckIn | null = null, error: FirestoreError | null = null;

    await setDoc(doc(db, "habits", data.habit, "checkins", id), checkIn).then(() => {
        result = checkIn;
    }).catch((e: FirestoreError) => {
        error = e;
    })

    return { result, error }
}

export async function updateCheckInDB(checkIn: CheckIn, val: boolean | number) {
    let result: CheckIn | null = null, error: FirestoreError | null = null;

    await updateDoc(doc(db, "habits", checkIn.habit, "checkins", checkIn.id), {
        value: val
    }).then(() => {
        result = { ...checkIn, value: val };
    }).catch((e: FirestoreError) => {
        error = e;
    });

    return { result, error }
}

export async function deleteCheckInDB(checkIn: CheckIn) {
    let result: boolean = false, error: FirestoreError | null = null;

    await deleteDoc(doc(db, "habits", checkIn.habit, "checkins", checkIn.id)).then(() => {
        result = true;
    }).catch((e: FirestoreError) => {
        error = e;
    });

    return { result, error }
}

export async function getCheckInsBetweenDates(habitID: string, startDate: Date, endDate: Date) {
    const q = query(collection(db, "habits", habitID, "checkins"), and(where('date', '>=', Timestamp.fromDate(startDate)), where('date', '<=', Timestamp.fromDate(endDate))));
    const querySnapshot = await getDocs(q);
    const checkIns = Array<CheckIn>();
    querySnapshot.forEach((doc) => {
        checkIns.push(doc.data() as CheckIn);
    })

    return checkIns;
}

/*export async function getCategory(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
        return docRef.data();
    }
    return null;
}*/

/*export async function getHabits(userID: string) {
    const q = query(collection(db, "users", userID, "habits"));
    const querySnapshot = await getDocs(q);
    const habits = Array<Habit>();
    querySnapshot.forEach((doc) => {
        habits.push(doc.data() as Habit);
    })

    return habits;
}*/