import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { ProductListProps } from '../../../utils/Types';


const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

const dealsListService = async (callType: string, record: number) => {
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
    dealsListService,
}