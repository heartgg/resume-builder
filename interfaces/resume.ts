import { Timestamp } from "firebase/firestore";

export default interface IResume {
    uid: string;
    name: string;
    email: string;
    phone_number: string;
    projects: {
        name: string;
        description: string;
        date: Timestamp;
    }[];
    experience: {
        name: string;
        position: string;
        description: string;
        date: Timestamp;
    }[];
    skills: string;
}