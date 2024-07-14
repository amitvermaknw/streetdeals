import { toast } from 'react-toastify';
import { db, } from '../../../../services/config';
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { BannerListProps } from '../../../../utils/Types';
import { deleteProductImage } from '../utils/uploadImages';
import axios, { AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const fetchBannerService = async () => {
    try {
        const result: AxiosResponse<BannerListProps> = await axios.get<BannerListProps>(`${baseUrl}/banner`);
        if (result.status === 200) {
            return result.data;
        } else {
            toast.error(result.statusText);
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
        return [];
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