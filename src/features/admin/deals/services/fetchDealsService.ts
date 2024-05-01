import { toast } from 'react-toastify';
import { db, } from '../../../../services/config';
import { collection, getDocs, query, orderBy, limit, startAfter, where, deleteDoc, doc } from "firebase/firestore";
import { ProductListProps } from '../../../../utils/Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastVisibleData: any = 0;
const fetchDealsService = async () => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), orderBy("pid"), startAfter(lastVisibleData), limit(2));
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

const fetchSingleDeal = async (pid: string) => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), where("pid", "==", pid));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            result.push(document.data() as ProductListProps);
            result.push(document.id as string);
        });

        return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

const deleteDealsDoc = async (pid: string) => {
    try {
        //const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), where("pid", "==", pid));

        await deleteDoc(doc(db, "streetdeals_collection", "streetdeals", "product_details", pid));
        return true

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return false
        }
    }
}

const fetchDealsCategories = async () => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_category"));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];
            let documentData = document.data();
            documentData = { value: documentData.category_value, label: documentData.category_label }
            //documentData.documentId = document.id;
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
    fetchDealsService,
    fetchSingleDeal,
    deleteDealsDoc,
    fetchDealsCategories
}