import { toast } from 'react-toastify';
import { ProductCategory, ProductListProps } from '../../../../utils/Types';
import axios, { AxiosResponse } from 'axios';


const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

const fetchDealsService = async (callType: string, record: number): Promise<ProductListProps | Array<[]>> => {
    try {
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/${callType}/${record}`);
        if (result.status === 200) {
            return result.data;
        } else {
            toast.error(result.statusText);
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return []
    }
}

const fetchSingleDeal = async (pid: string): Promise<ProductListProps | Array<[]>> => {
    try {
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/${pid}`);
        if (result.status === 200) {
            if (!result.data.length)
                toast.error("No Record found");

            return result.data;
        } else {
            toast.error(result.statusText);
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return []
    }

}

const deleteDealsDoc = async (pid: string, imageUrl: string) => {
    try {
        const payload = {
            data: {
                pid: pid,
                imageUrl: imageUrl
            },
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        const result: AxiosResponse<{ msg: string }> = await axios.delete<{ msg: string }>(`${baseUrl}/deals`, payload);
        if (result.status === 200) {
            toast.success(result.data.msg);
        } else {
            toast.error(result.statusText);
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return []
    }
}

const fetchDealsCategories = async () => {
    try {

        const response: AxiosResponse<ProductCategory> = await axios.get<ProductCategory>(`${baseUrl}/deals/categories`);
        if (response.status === 200) {
            if (!response.data.length)
                toast.error("No Category Record found");

            const results: Array<{ value: string, label: string }> = [];
            response.data.forEach((item) => {
                results.push({ value: item.category_value, label: item.category_label })
            })

            return results;
        } else {
            toast.error(response.statusText);
            return [];
        }

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