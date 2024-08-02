// import { config } from "../../firebaseConfig";


// export function registerWorker() {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('../../firebase-messaging-sw.js', {
//             scope: '/'
//         })
//             .then(function (registration) {
//                 console.log('Registration successful, scope is:', registration.scope);
//                 // Pass environment variables to the service worker
//                 registration.active?.postMessage({
//                     apiKey: config.apiKey,
//                     authDomain: config.authDomain,
//                     projectId: config.projectId,
//                     storageBucket: config.storageBucket,
//                     messagingSenderId: config.messagingSenderId,
//                     appId: config.appId,
//                     measurementId: config.measurementId,
//                     databaseURL: config.database,
//                 });
//             })
//             .catch(function (err) {
//                 console.log('Service worker registration failed, error:', err);
//             });
//     }
// }