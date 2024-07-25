import { toast } from 'react-toastify';
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

const fetchYouMightLikeDeals = async (category: string): Promise<ProductListProps | Array<[]>> => {
    try {
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/yml/pd/${category}`);
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

export {
    fetchDealDetails,
    fetchYouMightLikeDeals
}