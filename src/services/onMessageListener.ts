import { getMessaging, onMessage } from "firebase/messaging"


export const onMessageListener = () => {
    const messaging = getMessaging();
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload);
            resolve(payload);
        })
    })
}