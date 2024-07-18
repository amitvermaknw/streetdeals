import { toast } from "react-toastify";
import { AddDeals, ProductListProps } from "../../../../utils/Types";
import { uid } from "../../../../utils/Uid";
// import { uploadProductImage } from "../utils/uploadImages";
import axios, { AxiosResponse } from 'axios';
import { compressImage } from "../../../../utils/CompressImageSize";

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

const addUpdateDealsService = async (payload: AddDeals & { documentId: string }, callType: string): Promise<boolean | AxiosResponse<{ msg: string, authStatus: boolean, status: number }> | undefined> => {

    let compressedImage;

    const dealsPayload: ProductListProps = {
        pid: callType === 'add' ? uid() : payload.pid?.value || '',
        pname: payload.pname.value,
        price: payload.price.value,
        discount: payload.discount.value,
        coupon: payload.coupon.value,
        producturl: payload.producturl.value,
        dealtype: payload.dealtype.value,
        pimageurl: '',
        //pimage: payload.pimage,
        pshortdetails: payload.pshortdetails.value,
        productdetails: payload.productdetails.value,
        ptimestamp: new Date().toISOString(),
        preprice: payload.preprice.value,
        dealstatus: payload.dealstatus?.value,
        pcategory: payload.pcategory?.value,
        preview: payload.preview?.value,
        ptimeframe: payload.ptimeframe?.value,
        urlstring: payload.pname.value ? payload.pname.value.replace(/[^a-zA-Z ]/g, "").split(" ").join("-").toLowerCase() : ''
    };

    const formData = new FormData();

    if ((callType === 'add' && payload.pimage.image)) {
        compressedImage = await compressImage(payload.pimage.image as unknown as Blob);
        formData.append('json', new Blob([JSON.stringify(dealsPayload)], { type: 'application/json' }));
        formData.append('image', compressedImage as unknown as Blob);
    } else if (callType === 'update' && payload.pimage.image === "" && payload.pimage.imageObject !== "") {
        dealsPayload.pimageurl = payload.pimage.imageObject !== undefined ? payload.pimage.imageObject : ''
        dealsPayload.documentId = payload.documentId;
    } else if (callType === 'update' && payload.pimage.image !== "") {
        compressedImage = await compressImage(payload.pimage.image as unknown as Blob);
        dealsPayload.documentId = payload.documentId;
        formData.append('json', new Blob([JSON.stringify(dealsPayload)], { type: 'application/json' }));
        formData.append('image', compressedImage as unknown as Blob);
    }

    if (callType === 'add') {
        try {
            const headers = {
                headers: {
                    'authorization': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            }
            const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/deals`, formData, headers);
            if (result.status === 200) {
                toast.success(result.data.msg);
                return true
            } else {
                toast.error(result.statusText);
                return false;
            }
        } catch (error: unknown) {

            if (axios.isAxiosError(error)) {
                if (Object.prototype.hasOwnProperty.call(error, "response")) {

                    if (error.response?.status === 401) {
                        toast.error(error.response?.data.msg as string);
                        return error.response;
                    }
                    toast.error(error.response?.data as string);
                }

                if (error instanceof Error) {
                    toast.error(error.message);
                    throw (error)
                }
            }

            return false;
        }

    } else if (callType === 'update') {
        try {
            let headers = {};
            let result: AxiosResponse<{ msg: string }> = {} as AxiosResponse<{ msg: string }>;

            if (payload.pimage.image === "" && payload.pimage.imageObject !== "") {
                headers = {
                    headers: {
                        'authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                }
                result = await axios.put<{ msg: string }>(`${baseUrl}/deals`, dealsPayload, headers);
            } else if (payload.pimage.image !== "") {
                headers = {
                    headers: {
                        'authorization': localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                }
                result = await axios.put<{ msg: string }>(`${baseUrl}/deals`, formData, headers);
            }

            if (result.status === 200) {
                toast.success(result.data.msg);
                return true
            } else {
                toast.error(result.statusText);
                return false;
            }
        } catch (error: unknown) {

            if (axios.isAxiosError(error)) {
                if (Object.prototype.hasOwnProperty.call(error, "response")) {
                    if (error.response?.status === 401) {
                        toast.error(error.response?.data.msg as string);
                        return error.response;
                    }
                    toast.error(error.response?.data as string);
                }
                if (error instanceof Error) {
                    toast.error(error.message);
                    throw (error)
                }
            }
            return false;
        }
    }
    return false;

};

export {
    addUpdateDealsService
}