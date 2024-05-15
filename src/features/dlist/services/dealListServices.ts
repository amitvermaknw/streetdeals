import { toast } from 'react-toastify';
import { collection, getDocs, query, orderBy, limit, startAfter, Query, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from '../../../services/config';
import { ProductListProps } from '../../../utils/Types';

let lastVisibleData: QueryDocumentSnapshot<DocumentData, DocumentData>;
const dealsListService = async (callType: string) => {
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