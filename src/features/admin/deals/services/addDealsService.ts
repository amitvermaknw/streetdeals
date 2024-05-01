import { toast } from "react-toastify";
import { AddDeals } from "../../../../utils/Types";
import { db, } from '../../../../services/config';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { uid } from "../../../../utils/Uid";
import { uploadProductImage } from "../utils/uploadImages";

const addUpdateDealsService = async (payload: AddDeals & { documentId: string }, callType: string) => {
    let getImageURL: string | undefined = '';
    if (callType === 'add') {
        getImageURL = await uploadProductImage(payload.pimage, 'deals');
    } else if (callType === 'update') {
        if (payload.pimage.image) {
            getImageURL = await uploadProductImage(payload.pimage, 'deals');
        } else {
            getImageURL = payload.pimage.imageObject;
        }
    }
    const dealsPayload = {
        pid: uid(),
        pname: payload.pname.value,
        price: payload.price.value,
        discount: payload.discount.value,
        coupon: payload.coupon.value,
        producturl: payload.producturl.value,
        dealtype: payload.dealtype.value,
        pimageurl: getImageURL,
        pshortdetails: payload.pshortdetails.value,
        productdetails: payload.productdetails.value,
        ptimestamp: new Date().toISOString(),
        preprice: payload.preprice.value,
        dealstatus: payload.dealstatus?.value,
        pcategory: payload.pcategory?.value,
        preview: payload.preview?.value,
        ptimeframe: payload.ptimeframe?.value
    };

    try {

        if (callType === 'add') {
            const docRef = await addDoc(collection(db, "streetdeals_collection", "streetdeals", "product_details"), {
                ...dealsPayload
            });
            if (docRef.id) {
                toast.success("Record added successfully");
                return true
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

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return false;
        }
    }
};

export {
    addUpdateDealsService
}