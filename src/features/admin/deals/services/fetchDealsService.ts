import { toast } from 'react-toastify';
import { db, } from '../../../../services/config';
import { collection, getDocs, query } from "firebase/firestore";
import { ProductListProps } from '../../../../utils/Types';
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
        return result.data;
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
        const q = query(collection(db, "streetdeals_collection", "streetdeals", "product_category"));
        const querySnapshot = await getDocs(q);
        const result: Array<ProductListProps | string> = []
        await querySnapshot.forEach(async (document) => {
            // console.log(document.id, " => ", document.data());
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