import { toast } from 'react-toastify';
import { BannerListProps, ProductListProps } from '../../../utils/Types';
import axios, { AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

const fetchBannerService = async (): Promise<BannerListProps | Array<[]>> => {
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

const fetchDealsService = async (callType: string, record: number): Promise<ProductListProps | Array<[]>> => {
    try {
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/${callType}/${record}`);
        if (result.status === 200) {
            return result.data;
        } else {
            toast.error(result.statusText);
            return [];
        }
        return result.data;
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return []
    }
}

export {
    fetchBannerService,
    fetchDealsService
}