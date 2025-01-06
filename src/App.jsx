import React,{ useState, useEffect } from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
    CssBaseline,
    Box
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from './Footer';
import './i18n'; // Import i18n configuration
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

import Navbar from "./Navbar/Navbar.jsx";

import { lightTheme } from "./config/themes/light.js";
import { darkTheme } from "./config/themes/dark.js";
import routes from "./Routes.js";
import {auth, db, messaging} from './firebase';
import { getToken } from 'firebase/messaging';

// Import all components
import VolunteerForm from "./4WeekVolunteer.jsx";
import GameComponent from "./Doom/GameComponent.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import AdminPage from "./AdminPage/AdminPage.jsx";
import Logout from "./auth/Logout.js";
import Calendar from "./Calendar/Calendar.jsx";
import ProfilePage from "./auth/ProfilePage.jsx";
import Home from './Home/Home.jsx';
import Contact from './Contact.jsx';
import {Gallery} from "./Gallery/Gallery.jsx";
import ChoresAdmin from "./Chores/Chores.jsx";
import AdminUserManagement from "./AdminPage/AdminUserManagement.jsx";
import {doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore";

// Map keys to components
const componentMap = {
    Home,
    Contact,
    VolunteerForm,
    Login,
    Register,
    AdminPage,
    GameComponent,
    Logout,
    Calendar,
    ProfilePage,
    Gallery,
    ChoresAdmin,
    AdminUserManagement
};

/**
 * Styled component for the main content area.
 * @param {Object} theme - The theme object.
 */
const NextComponent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1, // Above the wave
    backgroundColor: theme.palette.background.paper,
    marginTop: '-50px', // Pull into the wave
}));

/**
 * Main application component.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
    const { t } = useTranslation(); // Use translation hook
    const [theme, setTheme] = useState(lightTheme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (!user) {
                return;
            }
            // Request permission for push notifications
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');

                    // Get FCM Token
                    getToken(messaging, {vapidKey: 'BOmvL1kN2Y7Tm1x4HylBWGCZCOcFRznP8yGWK3ea6m7B4JWY4U5wB0846o33jLQIH2jfJyj3r_gadPbIF5Msxco'})
                            .then(async (currentToken) => {
                                if (currentToken) {
                                    const userRef = doc(db, 'users', user.uid);
                                    const userData = (await getDoc(userRef)).data();

                                    if (userData.fcm&&userData.fcm.includes(currentToken)) {
                                        console.log('Token already synced to Firestore.');
                                    }else {
                                        await updateDoc(doc(db, 'users', user.uid), {
                                            fcm: arrayUnion(currentToken),
                                        });
                                    }
                                } else {
                                    console.log('No registration token available');
                                }
                            })
                            .catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                            });
                } else {
                    console.log('Notification permission denied');
                }
            });
        });
    }, []);

    /**
     * Toggles the theme between light and dark mode.
     */
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme.palette.mode === 'dark' ? lightTheme : darkTheme));
    };

    /**
     * Contact component for the website.
     * @returns {JSX.Element} The rendered Contact component.
     */
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang).then();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div style={{ minHeight: '67vh' }}>
                    <Navbar isMobile={isMobile} t={t} />
                    <NextComponent
                        component="main"
                        sx={{
                            width: {
                                xs:'100%',
                                sm:'100%',
                                md:'80%',
                                lg:'80%'
                            }, // Occupies 80% of the width
                            margin: '0 auto', // Center alignment
                            minHeight: '67vh', // Maintain existing height constraint
                        }}
                    >
                        <Routes
                            sx={{
                                width: '100%', // Ensures the inner box matches the 80% width
                                padding: 2, // Adds some padding around the content
                            }}
                        >
                            {routes.map(({ path, componentKey }) => {
                                const Component = componentMap[componentKey];
                                return (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Component isMobile={isMobile} />} // Pass `isMobile` if needed
                                    />
                                );
                            })}
                        </Routes>
                    </NextComponent>
                </div>
                <Footer toggleTheme={toggleTheme} toggleLanguage={changeLanguage} />
            </Router>
        </ThemeProvider>
    );
}

export default App;
