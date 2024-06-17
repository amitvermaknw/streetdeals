import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { onMessageListener } from "../../../services/onMessageListener";

const Notification = () => {
    const [notification, setNotification] = useState({ title: '', body: '' });

    const ToastDisplay = () => {
        return (
            <>
                <p>{notification?.title}</p>
                <p>{notification?.body}</p>

            </>
        )
    }

    const notify = () => toast.info(<ToastDisplay />);

    useEffect(() => {
        if (notification?.title) {
            notify();
        }
    }, [notification]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMessageListener().then((payload: any) => {
        setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    }).catch((error) => console.log('failed', error));
}

export default Notification;