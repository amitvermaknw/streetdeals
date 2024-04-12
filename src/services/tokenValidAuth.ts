import { toast } from 'react-toastify';
import { db, } from './config';
import { collection, getDocs, query, where } from "firebase/firestore"

export const tokenValidAuth = async (token: string): Promise<boolean> => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "admin_token"), where("token", "==", token), where("status", "==", true));
        const querySnapshot = await getDocs(q);
        let status: boolean = false;
        querySnapshot.forEach(async (document) => {
            //console.log(document.id, " => ", document.data());
            const tokenObj = document.data();
            if (token === tokenObj.token) {
                status = true;
            } else {
                status = false
            }
        });
        return status;
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
        return false
    }
}