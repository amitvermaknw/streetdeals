import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;
// const userBaseUrl = mode.DEV === true ? import.meta.env.VITE_REVIEW_SERVICE_LOCAL : import.meta.env.VITE_REVIEW_SERVICE_PROD;



export const tokenValidAuth = async (token: string, userType: string): Promise<boolean> => {
    try {
        const headers = {
            headers: {
                authorization: token,
                email: userType === 'user' ? localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser") as string).email : '' : ''
            }
        }
        const result: AxiosResponse<{ msg: string }> = await axios.get<{ msg: string }>(`${baseUrl}` + '/' + `${userType === 'admin' ? 'tokenvalidation' : 'users/tokenvalidation'}`, headers);
        if (result.status === 200) {
            return true;
        } else {
            return false;
        }

    } catch (error) {

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ authStatus: string }>;
            if (axiosError.response) {
                if (axiosError.response.data ? !axiosError.response.data.authStatus : axiosError.response.data) {
                    toast.error(axiosError.response.statusText);
                }
            } else if (axiosError.request) {
                toast.error(axiosError.request);
            } else {
                toast.error(axiosError.message);
            }
        } else {
            if (error instanceof Error) {
                toast.error(error.message);
                throw (error)
            }
        }
        return false;
    }
}