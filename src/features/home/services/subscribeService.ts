import { toast } from "react-toastify";
// import { db, } from '../../../../services/config';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../services/config";
import { SubscriberFormProps } from "../../../utils/Types";
import { AppLocation } from "../../../utils/appLocation";
import { deviceDetect } from "react-device-detect"

const addSubscriber = async (payload: SubscriberFormProps) => {
    try {
        // eslint-disable-next-line no-useless-escape
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (payload.semail.value.match(mailformat)) {
            toast.success("Subscribed successfully");
            const subscriber = {
                subscriber_email: payload.semail.value,
                timestamp: new Date().toISOString(),
                location: await AppLocation(),
                device: deviceDetect(window.navigator.userAgent)
            };

            const docRef = await addDoc(collection(db, "streetdeals_collection", "streetdeals", "subscriber_list"), {
                ...subscriber
            });
            if (docRef.id) {
                localStorage.setItem("is_subscribed", "true");
                return true
            }
        } else {
            toast.error("Email id is not correct");
        }

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return null;
        }
    }
}


export {
    addSubscriber
}