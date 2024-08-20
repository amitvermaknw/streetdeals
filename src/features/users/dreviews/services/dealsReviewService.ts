
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { DealsReview } from '../../../../utils/Interface';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_REVIEW_SERVICE_LOCAL : import.meta.env.VITE_REVIEW_SERVICE_PROD;

export const getDealsReview = async (pId: string): Promise<DealsReview | Array<[]>> => {
    try {
        const result: AxiosResponse<DealsReview> = await axios.get<DealsReview>(`${baseUrl}/deals/review/${pId}`);
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

export const addDealsReview = async (payload: DealsReview): Promise<string> => {
    try {
        const result: AxiosResponse<DealsReview> = await axios.post<DealsReview>(`${baseUrl}/deals/review`, payload, { headers: { Authorization: localStorage.getItem('user_token') } });
        if (result.status === 200) {
            return result.data as unknown as string;
        } else {
            toast.error(result.statusText);
            return result.data as unknown as string;
        }

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
        return 'error';
    }
}