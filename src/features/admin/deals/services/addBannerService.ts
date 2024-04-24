import { toast } from "react-toastify";
import { AddBanner } from "../../../../utils/Types";
import { db, } from '../../../../services/config';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { uid } from "../../../../utils/Uid";
import { uploadProductImage } from "../utils/uploadImages";

const addBannerService = async (payload: AddBanner & { documentId: string }, callType: string) => {
    let getImageURL: string | undefined = '';
    if (callType === 'add') {
        getImageURL = await uploadProductImage(payload.bimage, 'deals');
    } else if (callType === 'update') {
        if (payload.bimage.image) {
            getImageURL = await uploadProductImage(payload.bimage, 'deals');
        } else {
            getImageURL = payload.bimage.imageObject;
        }
    }
    const dealsPayload = {
        bid: uid(),
        bname: payload.bname.value,
        bannerurl: payload.bannerurl.value,
        bstatus: payload.bstatus.value,
        bimage: payload.bimage.value,
        btimestamp: new Date().toISOString(),
        bimageurl: getImageURL
    };

    try {

        if (callType === 'add') {
            const docRef = await addDoc(collection(db, "streetdeals_collection", "streetdeals", "banner_details"), {
                ...dealsPayload
            });
            if (docRef.id) {
                toast.success("Record added successfully");
                return true
            }
        } else if (callType === 'update') {

            const updateQuery = doc(db, "streetdeals_collection", "streetdeals", "banner_details", payload.documentId);
            await updateDoc(updateQuery, {
                ...dealsPayload
            });
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
    addBannerService
}