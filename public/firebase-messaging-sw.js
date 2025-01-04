// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBPI1rSdv3if62Dp67hjHKqGk-Vwbq58vo",
    authDomain: "ioannina-scouts.firebaseapp.com",
    projectId: "ioannina-scouts",
    storageBucket: "ioannina-scouts.firebasestorage.app",
    messagingSenderId: "800109105879",
    appId: "1:800109105879:web:9a09ef6bb19769081b9692",
    measurementId: "G-VQMCWMXT54"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});