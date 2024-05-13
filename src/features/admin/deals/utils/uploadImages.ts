import { toast } from "react-toastify";
import { cloudinaryConfig } from "../../../../../firebaseConfig";
import { compressImage } from "../../../../utils/CompressImageSize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadProductImage = async (payload: any, uploadType: string) => {


    const formData = new FormData();
    formData.append('file', await compressImage(payload.image));
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('cloud_name', cloudinaryConfig.cloudName);
    formData.append('folder', uploadType === 'deals' ? 'product_images' : 'banner_images');
    try {
        const res = await fetch(`${cloudinaryConfig.cloudinaryURL}/${cloudinaryConfig.cloudName}/upload`, {
            method: 'POST',
            body: formData
        })
        const data = await res.json();
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            toast.error(data.message);
        }
        return data.secure_url
    } catch (error) {
        console.log(error)
    }
};

const deleteProductImage = async (payload: string) => {
    const sig = await sha256(`public_id=${payload}&timestamp=${new Date().getMilliseconds()}${cloudinaryConfig.api_key}`);

    const formData = new FormData();
    formData.append('api_key', cloudinaryConfig.api_key);
    formData.append('public_id', "nctoz7ugnmejvnwgpmqo");
    formData.append('signature', sig);
    formData.append('timestamp', `${Number(new Date())}`);
    try {
        const res = await fetch(`${cloudinaryConfig.cloudinaryURL}/${cloudinaryConfig.cloudName}/image/destroy`, {
            method: 'POST',
            body: formData
        })
        const data = await res.json();
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            console.log(data);
            toast.error(data.message);
        }
        return data.secure_url
    } catch (error) {
        console.log(error)
    }
};

const sha256 = async (data: string) => {
    const textAsBuffer = new TextEncoder().encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return digest;
}

export {
    uploadProductImage,
    deleteProductImage
}