import { toast } from "react-toastify";
import { AddDeals } from "../../../../utils/Types";
import { db, } from '../../../../services/config';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { uid } from "../../../../utils/Uid";
// import { uploadProductImage } from "../utils/uploadImages";
import axios, { AxiosResponse } from 'axios';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD;

const addUpdateDealsService = async (payload: AddDeals & { documentId: string }, callType: string): Promise<boolean> => {
    //let getImageURL: string | undefined = '';
    // if (callType === 'add') {
    //     getImageURL = await uploadProductImage(payload.pimage, 'deals');
    // } else if (callType === 'update') {
    //     if (payload.pimage.image) {
    //         getImageURL = await uploadProductImage(payload.pimage, 'deals');
    //     } else {
    //         getImageURL = payload.pimage.imageObject;
    //     }
    // }

    const dealsPayload = {
        pid: callType === 'add' ? uid() : payload.pid?.value,
        pname: payload.pname.value,
        price: payload.price.value,
        discount: payload.discount.value,
        coupon: payload.coupon.value,
        producturl: payload.producturl.value,
        dealtype: payload.dealtype.value,
        // pimageurl: getImageURL,
        pimage: payload.pimage,
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



    if (callType === 'add') {
        try {
            const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/deals`, dealsPayload);
            if (result.status === 200) {
                toast.success(result.data.msg);
                return true
            } else {
                toast.error(result.statusText);
                return false;
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                throw (error)
            }
            return false;
        }

    } else if (callType === 'update') {

        const updateQuery = doc(db, "streetdeals_collection", "streetdeals", "product_details", payload.documentId);
        await updateDoc(updateQuery, {
            ...dealsPayload
        });

        toast.success("Record updated successfully");
        return true
    }
    return false;

};

export {
    addUpdateDealsService
}