import { toast } from 'react-toastify';
import axios, { AxiosResponse, AxiosError } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

interface InputData {
    token: string;
    status: boolean;
    timestamp: string
}

export const usersAuthValidate = async (token: string): Promise<boolean> => {
    try {
        const headers = {
            headers: {
                authorization: token
            }
        }
        const result: AxiosResponse<{ msg: string }> = await axios.get<{ msg: string }>(`${baseUrl}/auth/validate`, headers);
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


export const userLogin = async (formData: { email: string, password: string }): Promise<string> => {
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

