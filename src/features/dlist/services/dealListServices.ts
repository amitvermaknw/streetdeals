import { toast } from 'react-toastify';
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from '../../../services/config';
import { ProductListProps } from '../../../utils/Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastVisibleData: any = 0;
const dealsListService = async (callType: string) => {
    try {

        if (callType === 'init')
            lastVisibleData = 0;

        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), orderBy("pid"), startAfter(lastVisibleData), limit(20));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];
            const documentData = document.data();
            documentData.documentId = document.id;
            result.push(documentData as ProductListProps);
        });

        return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

export {
    dealsListService,
}