import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

interface InputData {
    token: string;
    status: boolean;
    timestamp: string
}

export const login = async (formData: { email: string, password: string }): Promise<string> => {
    try {
        const result: AxiosResponse<{ token: string, msg?: string }> = await axios.post<{ token: string, msg?: string }>(`${baseUrl}/login`, formData);
        if (result.status === 200) {
            toast.success("Login successfully");
            return result.data.token;
        } else {
            toast.error(result.data.msg);
            return result.data.msg as string;
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return "error";
    }
}

export const addAdminToken = async (data: InputData) => {
    try {
        const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/admintoken`, data);
        if (result.status === 200) {
            localStorage.setItem("login_token", result.data.msg)
        } else {
            console.log(result.data.msg);
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return "error";
    }
};

export const updateAdminToken = async () => {

    try {
        const payload = {
            status: false,
            timestamp: new Date().toISOString()
        }
        const result: AxiosResponse<{ msg: string }> = await axios.put<{ msg: string }>(`${baseUrl}/admintoken`, payload);
        if (result.status === 200) {
            console.log(result.data);
        } else {
            console.log(result.data.msg);
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return "error";
    }
};

