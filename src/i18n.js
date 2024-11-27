// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Translation system for the website using the i18next library
 * @type {{en: {translation: {contact: string, menu: string, welcome: string, home: string}}, gr: {translation: {contact: string, menu: string, welcome: string, home: string}}}}
 */
const resources = {
    en: {
        translation: {
            welcome: "Welcome to our website",
            home: "Home",
            contact: "Contact",
            menu: "Menu"
            // Add more translations here
        }
    },
    gr: {
        translation: {
            welcome: "Καλώς ήρθατε στην ιστοσελίδα μας",
            home: "Αρχική",
            contact: "Επικοινωνία",
            menu: "Μενού"
            // Add more translations here
        }
    },
    // Add more languages here
};

i18n
    .use(initReactI18next) // Passes i18n down to React
    .init({
        resources,
        lng: "en", // Default language
        fallbackLng: "en", // Fallback language
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;
