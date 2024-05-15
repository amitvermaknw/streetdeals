import { toast } from 'react-toastify';
import { collection, getDocs, limit, orderBy, query, startAfter, where, QueryDocumentSnapshot, Query, DocumentData } from "firebase/firestore";
import { db } from '../../../services/config';
import { BannerListProps, ProductListProps } from '../../../utils/Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchBannerService = async () => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "banner_details"), where("bstatus", "==", "active"));
        const querySnapshot = await getDocs(q);
        const result: Array<BannerListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            const documentData = document.data();
            documentData.documentId = document.id;
            result.push(documentData as BannerListProps);
        });

        return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return null;
        }
    }
}

let lastVisibleData: QueryDocumentSnapshot<DocumentData, DocumentData>;

const fetchDealsService = async (callType: string): Promise<Array<ProductListProps | string> | undefined> => {
    try {
        let q: Query<DocumentData, DocumentData>;
        if (callType === 'init') {
            q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), orderBy("pid", "desc"), limit(20));
        } else {
            q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), orderBy("pid", "desc"), startAfter(lastVisibleData), limit(20));
        }

        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];
            const documentData = document.data();
            documentData.documentId = document.id;
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
    fetchBannerService,
    fetchDealsService
}