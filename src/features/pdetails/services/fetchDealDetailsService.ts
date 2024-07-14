import { toast } from 'react-toastify';
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from '../../../services/config';
import { ProductListProps } from '../../../utils/Types';
import axios, { AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;


const fetchDealDetails = async (pId: string): Promise<ProductListProps | Array<[]>> => {
    try {

        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/product/details/${pId}`);
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

const fetchYouMightLikeDeals = async (category: string): Promise<Array<ProductListProps | string> | undefined> => {
    try {
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_details"), where("pcategory", "==", category), limit(10));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps | string> = []
        await querySnapshot.forEach(async (document) => {

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
    fetchDealDetails,
    fetchYouMightLikeDeals
}