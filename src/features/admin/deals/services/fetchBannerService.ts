import { toast } from 'react-toastify';
// import { db, } from '../../../../services/config';
// import { collection, getDocs, query, where } from "firebase/firestore";
import { BannerListProps } from '../../../../utils/Types';
import axios, { AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

const fetchBannerService = async (callType: string, record: number) => {
    try {
        const result: AxiosResponse<BannerListProps> = await axios.get<BannerListProps>(`${baseUrl}/banner/${callType}/${record}`);
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

const fetchSingleBanner = async (bid: string) => {
    try {
        const result: AxiosResponse<{ msg: string }> = await axios.get<{ msg: string }>(`${baseUrl}/banner/${bid}`);
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

const deleteBannerDoc = async (bid: string, imageUrl: string) => {
    try {
        const payload = {
            data: {
                bid: bid,
                imageUrl: imageUrl
            },
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }

        console.log("payload", payload);
        const result: AxiosResponse<{ msg: string }> = await axios.delete<{ msg: string }>(`${baseUrl}/banner`, payload);
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

export {
    fetchBannerService,
    fetchSingleBanner,
    deleteBannerDoc
}