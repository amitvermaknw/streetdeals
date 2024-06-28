// import { getToken } from 'firebase/messaging'
// import { messaging } from './config';
// import { toast } from 'react-toastify';
// import { vapidKey } from '../../firebaseConfig';

// const requestPermission = async () => {

//     try {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const permission = await (Notification as any).requestPermission();

//         if (permission === 'granted') {
//             const token = await getToken(messaging, {
//                 vapidKey: vapidKey
//             });
//             console.log(token);
//         } else if (permission === 'denied') {
//             toast.warning("You denied for the notification");
//         }

//     } catch (error) {
//         if (error instanceof Error) {
//             console.log(error.message);
//         }
//     }
// }

// export default requestPermission;