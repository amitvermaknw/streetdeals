import { toast } from 'react-toastify';
import { db, } from '../../../../services/config';
import { collection, getDocs, query, orderBy, limit, startAfter, where, } from "firebase/firestore";
import { ProductListProps } from '../../../../utils/Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastVisibleData: any = 0;
const fetchDealsService = async () => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), orderBy("pid"), startAfter(lastVisibleData), limit(2));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];
            result.push(document.data() as ProductListProps);
        });

        return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

const fetchSingleDeal = async (pid: string) => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), where("pid", "==", pid));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            result.push(document.data() as ProductListProps);
        });

        return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

export {
    fetchDealsService,
    fetchSingleDeal
}