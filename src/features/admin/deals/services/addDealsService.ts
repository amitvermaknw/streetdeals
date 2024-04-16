import { toast } from "react-toastify";
import { cloudinaryConfig } from "../../../../../firebaseConfig";
import { AddDeals } from "../../../../utils/Types";
import { db, } from '../../../../services/config';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, } from "firebase/firestore";
import { compressImage } from "../../../../utils/CompressImageSize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadProductImage = async (payload: any) => {
    const formData = new FormData()
    formData.append('file', await compressImage(payload.image));
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('cloud_name', cloudinaryConfig.cloudName);
    formData.append('folder', 'product_images');
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

const addDealsService = async (payload: AddDeals) => {
    const getImageURL = await uploadProductImage(payload.pimage);
    const delasPayload = {
        pname: payload.pname.value,
        price: payload.price.value,
        discount: payload.discount.value,
        coupon: payload.coupon.value,
        producturl: payload.producturl.value,
        dealtype: payload.dealtype.value,
        pimageurl: getImageURL,
        pshortdetails: payload.pshortdetails.value,
        productdetails: payload.productdetails.value
    }

    try {
        const docRef = await addDoc(collection(db, "streetdeals_collection", "streetdeals", "product_details"), {
            ...delasPayload
        });
        if (docRef.id) {
            toast.success("Record added successfully");
            return true
        }
        return false
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return false;
        }
    }
};

export {
    addDealsService
}