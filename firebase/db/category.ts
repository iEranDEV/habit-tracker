import { FirestoreError, collection, doc, getDoc, getDocs, getFirestore, or, query, setDoc, where } from "firebase/firestore";
import firebase_app from "../config";
import { v4 as uuid } from 'uuid';

const db = getFirestore(firebase_app);

export async function addCategory(name: string, color: string, icon: string, createdBy: string) {
    const id = uuid();
    const category: Category = { id, name, color, icon, createdBy };

    return await setDoc(doc(db, "categories", id), category).then(() => {
        return category;
    }).catch((e: FirestoreError) => {
        return null;
    })
}

export async function deleteCategory(id: string) {

}

export async function getCategory(id: string) {
    const docRef = await getDoc(doc(db, "users", id));
    if(docRef.exists()) {
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