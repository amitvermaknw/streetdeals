import { toast } from "react-toastify";
import { SubscriberFormProps } from "../../../utils/Types";
import { AppLocation } from "../../../utils/appLocation";
import { deviceDetect } from "react-device-detect"
import axios, { AxiosResponse } from "axios";
const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_SERVICE_LOCAL : import.meta.env.VITE_SERVICE_PROD

const addSubscriber = async (payload: SubscriberFormProps): Promise<{ msg: string } | boolean | undefined> => {
    try {
        // eslint-disable-next-line no-useless-escape
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (payload.semail.value.match(mailformat)) {
            const subscriber = {
                subscriber_email: payload.semail.value,
                timestamp: new Date().toISOString(),
                location: await AppLocation(),
                device: deviceDetect(window.navigator.userAgent)
            };

            const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/subscribe`, subscriber);

            if (result.status == 200) {
                toast.success(result.data.msg);
                localStorage.setItem("is_subscribed", "true");
            } else {
                toast.error(result.data.msg)
            }
            return true;
        } else {
            toast.error("Email id is not correct");
            return false;
        }

    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            return false;
        }
    }
}


export {
    addSubscriber
}