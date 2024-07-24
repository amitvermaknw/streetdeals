import { toast } from "react-toastify";
import { AddBanner } from "../../../../utils/Types";
import { uid } from "../../../../utils/Uid";
import { compressImage } from "../../../../utils/CompressImageSize";
import axios, { AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

const addBannerService = async (payload: AddBanner & { documentId: string }, callType: string) => {
    const getImageURL: string | undefined = '';
    let compressedImage;

    const bannerPayload = {
        bid: uid(),
        bname: payload.bname.value,
        bannerurl: payload.bannerurl.value,
        bstatus: payload.bstatus.value,
        bimage: payload.bimage.value,
        btimestamp: new Date().toISOString(),
        bimageurl: getImageURL
    };

    const formData = new FormData();

    if ((callType === 'add' && payload.bimage.image)) {
        compressedImage = await compressImage(payload.bimage.image as unknown as Blob);
        formData.append('json', new Blob([JSON.stringify(bannerPayload)], { type: 'application/json' }));
        formData.append('image', compressedImage as unknown as Blob);
    }
    try {
        const headers = {
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        }
        const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/banner`, formData, headers);
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
};

export {
    addBannerService
}