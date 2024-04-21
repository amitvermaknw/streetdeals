import { toast } from 'react-toastify';
import { db, } from '../../../../services/config';
import { collection, getDocs, query, orderBy, limit, startAfter, } from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastVisibleData: any = 0;
const fetchDealsService = async () => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), orderBy('timestamp'), startAfter(lastVisibleData), limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
            console.log(document.id, " => ", document.data());
        });

        lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

// const fetchNextLevelDeals = async () => {
//     const nextQuery = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), orderBy('timestamp'), startAfter(lastVisibleData), limit(10));

// }

export {
    fetchDealsService
}