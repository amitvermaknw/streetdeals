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

const deleteProductImage = async () => {
    const sig = await sha256(`folder=product_images&public_id=qufs6hqr76knv8aqp0zs&timestamp=${Number(new Date())}${cloudinaryConfig.api_secret}`);

    const formData = new FormData();
    formData.append('api_key', cloudinaryConfig.api_key);
    formData.append('folder', 'product_images');
    formData.append('public_id', "qufs6hqr76knv8aqp0zs");
    formData.append('signature', sig);
    formData.append('timestamp', `${Number(new Date())}`);
    try {
        const res = await fetch(`${cloudinaryConfig.cloudinaryURL}/${cloudinaryConfig.cloudName}/image/destroy`, {
            method: 'POST',
            body: formData
        })

        if (res.status === 401) {
            toast.error(res.statusText);
            return;
        }
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

const sha256 = async (input: string) => {
    // Create a new instance of the TextEncoder interface
    const encoder = new TextEncoder();
    // Convert the input string to a Uint8Array
    const data = encoder.encode(input);

    // Use the SubtleCrypto API to generate the SHA-256 hash
    return crypto.subtle.digest("SHA-256", data)
        .then(hash => {
            // Convert the hash to a hexadecimal string
            let hexString = "";
            const bytes = new Uint8Array(hash);
            for (let i = 0; i < bytes.length; i++) {
                hexString += bytes[i].toString(16).padStart(2, '0');
            }
            return hexString;
        });
}

export {
    uploadProductImage,
    deleteProductImage
}
