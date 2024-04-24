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

export {
    uploadProductImage
}