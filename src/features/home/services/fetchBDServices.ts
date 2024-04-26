import { toast } from 'react-toastify';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../services/config';
import { BannerListProps } from '../../../utils/Types';

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

export {
    fetchBannerService
}