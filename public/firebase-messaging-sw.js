//import { config } from '../src/services/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");


// eslint-disable-next-line no-undef
onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});