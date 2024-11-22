import { useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
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
};

const NextComponent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1, // Above the wave
    backgroundColor: theme.palette.background.paper,
    marginTop: '-50px', // Pull into the wave
}));

function App() {
    const { t } = useTranslation(); // Use translation hook
    const [theme, setTheme] = useState(darkTheme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme.palette.mode === 'dark' ? lightTheme : darkTheme));
    };

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
                            margin: '0 auto', // Center alignment
                        }}
                    >
                        <Routes>
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
