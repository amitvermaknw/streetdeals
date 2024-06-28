import { toast } from 'react-toastify';
import { collection, getDocs, limit, or, query, where } from "firebase/firestore";
import { db } from '../../../services/config';
import { ProductListProps } from '../../../utils/Types';

const fetchDealDetails = async (pId: string) => {
    try {

        let getLocalData = localStorage.getItem("deals_cache");
        getLocalData = getLocalData ? JSON.parse(getLocalData) : '';

        let pRecord = null;

        if (Array.isArray(getLocalData)) {
            pRecord = getLocalData.map((item: ProductListProps) => {
                if (item.pid === pId) return item;
            }).filter(data => data !== undefined)[0]
        }

        if (pRecord == null) {
            const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), or(where("pid", "==", pId), where("urlstring", "==", pId)));
            const querySnapshot = await getDocs(q);
            //const result: Array<ProductListProps | string> = []
            await querySnapshot.forEach(async (document) => {
                pRecord = document.data();
                pRecord['documentId'] = document.id;
            });

        }
        return pRecord;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return null;
        }
    }
}

const fetchYouMightLikeDeals = async (category: string): Promise<Array<ProductListProps | string> | undefined> => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), where("pcategory", "==", category), limit(10));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps | string> = []
        await querySnapshot.forEach(async (document) => {

            const documentData = document.data();
            documentData['documentId'] = document.id;
            result.push(documentData as ProductListProps);
        });

        return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
    }
}

export {
    fetchDealDetails,
    fetchYouMightLikeDeals
}