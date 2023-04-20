import firebase_app from "../config";
import { collection, getFirestore, doc, setDoc, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function createResume(data) {
    let result = null;
    let error = null;

    try {
        result = await addDoc(collection(db, "resumes"), data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}