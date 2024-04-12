import { toast } from 'react-toastify';
import { db, } from '../../../services/config';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, } from "firebase/firestore"

interface InputData {
    token: string;
    status: boolean;
    timestamp: string
}
export const writeAdminToken = async (data: InputData) => {
    try {
        const docRef = await addDoc(collection(db, "streetdeals_collection", "streetdeals", "admin_token"), {
            ...data
        });
        localStorage.setItem("login_token", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e);
    }

};

export const updateAdminToken = async () => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "admin_token"), where("status", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
            //console.log(document.id, " => ", document.data());
            const updateQuery = doc(db, "streetdeals_collection", "streetdeals", "admin_token", document.id);
            await updateDoc(updateQuery, {
                status: false,
                timestamp: new Date().toISOString()
            })
        });
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
};

