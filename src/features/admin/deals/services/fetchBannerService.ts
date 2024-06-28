import { toast } from 'react-toastify';
import { db, } from '../../../../services/config';
import { collection, getDocs, query, orderBy, limit, startAfter, where, deleteDoc, doc } from "firebase/firestore";
import { BannerListProps } from '../../../../utils/Types';
import { deleteProductImage } from '../utils/uploadImages';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastVisibleData: any = 0;
const fetchBannerService = async () => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "banner_details"), orderBy("bid"), startAfter(lastVisibleData), limit(2));
        const querySnapshot = await getDocs(q);
        const result: Array<BannerListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];
            const documentData = document.data();
            documentData['documentId'] = document.id;
            result.push(documentData as BannerListProps);
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
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "banner_details"), where("pid", "==", pid));
        const querySnapshot = await getDocs(q);
        const result: Array<BannerListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
            result.push(document.data() as BannerListProps);
            result.push(document.id as string);
        });

        return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

const deleteBannerDoc = async (pid: string, imageUrl: string) => {

    try {
        const res = await deleteProductImage(imageUrl);
        if (res === true) {
            await deleteDoc(doc(db, "streetdeals_collection", "streetdeals", "banner_details", pid));
            toast.success('Record Deleted successfully');
            return true
        } else {
            toast.error('Error while deleting image');
            return false
        }

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return false
        }
    }
}

export {
    fetchBannerService,
    fetchSingleDeal,
    deleteBannerDoc
}