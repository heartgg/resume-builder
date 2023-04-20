import firebase_app from "../config";
import { collection, getFirestore, doc, setDoc, addDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import IResume from "@/interfaces/resume";
import IUser from "@/interfaces/user";

const db = getFirestore(firebase_app)

export async function createResume(data: IResume) {
    let result = null;
    let error = null;

    try {
        result = await addDoc(collection(db, "resumes"), data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function retrieveResume(rid: string) {
    let result = null;
    let error = null;

    try {
        result = await getDoc(doc(db, "resumes", rid))
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function retrieveResumes(uid: string) {
    let result = null;
    let error = null;

    const q = query(collection(db, "resumes"), where("uid", "==", uid));

    try {
        result = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() })
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function updateResume(rid: string, data: IResume) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, "resumes", rid), data, {
            merge: true
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function createUser(uid:string, data: IUser) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, "users", uid), data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function updateUser(uid:string, data: IUser) {
    return createUser(uid, data);
}