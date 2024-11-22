import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Sitemark from "./SiteMarkIcon";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import {lighten, Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/styles";

import bg from "./Pattern-PNG-Photos.png";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    height: '80px', // Increase the height
    backdropFilter: 'blur(24px)',
    borderTop: '1px solid',
    borderLeft: '1px solid',
    borderRight: '1px solid',
    borderBottom: 'none', // No border at the bottom
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    padding: '8px 12px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 15px',
    textTransform: 'none',
    padding: '3px 10px 3px 10px',
    minWidth: 'auto',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',  // Ensure that the hover effects stay inside the button's bounds
    '&:hover': {
        backgroundColor: "transparent", // Make background change on hover
        boxShadow: 'none',
        color: theme.palette.primary.main, // Text color change on hover
        transition: 'all 0.3s ease', // Smooth transition for hover effects
        transform: 'scale(1.1)'
    },
    '&:active': {
        color: theme.palette.primary.main, // Text color change on click
    },
    // Underline effect on hover
    '&:after': {
        content: '""',
        position: 'absolute',
        color: theme.palette.primary.main,
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'width 0.3s ease',  // Smooth underline effect
    },
    '&:hover:after': {
        width: '100%',  // Full underline on hover
    }
}));


const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '.MuiDrawer-paper': {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: '250px',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[5],
        transition: 'transform 0.3s ease-in-out, background 0.3s ease-in-out',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
            zIndex: 1,
        },
        '& *': {
            position: 'relative',
            zIndex: 2,
        },
    },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.background.paper, 0.8), // Add a semi-transparent background
    margin: '8px auto', // Add some margin between items and center them
    borderRadius: '20px', // Increase border radius for rounder buttons
    width: '80%', // Reduce the width to make them not full width
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.2), // Change background color on hover
        color: theme.palette.primary.main, // Change text color on hover
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'relative',
    zIndex: theme.zIndex.appBar,
    border: 'none',
    backgroundColor: theme.palette.background.default,
    marginBottom: 0, // Ensure no margin at the bottom
    paddingBottom: 0, // Ensure no padding at the bottom
    boxShadow: 'none', // Optional: remove box-shadow if any
    height: '80px', // Increase the height
}));


const WaveContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '100%', // Positioned directly below the AppBar
    left: 0,
    width: '100%',
    height: '80px',
    lineHeight: 0,
    zIndex: theme.zIndex.appBar - 1, // Ensure it layers properly
    margin: 0, // Ensure no margin
    padding: 0, // Ensure no padding
    overflow:"hidden"
}));


const Wave = styled('svg')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%', // Extend the width for continuous effect
    height: '100%',
    animation: 'wave-animation 10s linear infinite',
    fill: theme.palette.background.default, // Match the color of the navbar
    zIndex: 11, // Ensure the wave is above the wave container
    '@keyframes wave-animation': {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
    },
}));


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [defaultOptions, setDefaultOptions] =  useState([
        { name: "Αρχική", link: "/" },
        { name: "Επικοινωνία", link: "/contact" }
    ]);

    const adminLinks = [
        { name: "Διαχειριστής", link: "/admin" },
    ];

    const loggedInLinks=[
        { name: "Προφίλ", link: "/profile" },
        { name: "Αποσύνδεση", link: "/logout" }
    ]

    const [menuOptions, setMenuOptions] = useState(defaultOptions);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setMenuOptions(defaultOptions);
            if (user) {
                getDoc(doc(db, "users", user.uid)).then((snapshot) => {
                    if (!snapshot.exists) { return null; }
                    const data = snapshot.data();
                    if (data.role === "admin") {
                        setMenuOptions([...defaultOptions, ...adminLinks, ...loggedInLinks]);
                    }else{
                        setMenuOptions([...defaultOptions, ...loggedInLinks]);
                    }
                })
            }
        })
    }, []);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Box sx={{ position: 'relative', margin: 0, padding: 0 }}>
                <StyledAppBar position="sticky">
                    <StyledToolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            <Sitemark />
                        </Typography>
                        {isMobile ? (
                            <>
                                <IconButton color={theme.palette.primary.contrastText} edge="end" onClick={toggleDrawer(true)}>
                                    <MenuIcon />
                                </IconButton>
                                <StyledDrawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                    <Box
                                        sx={{ width: 250 }}
                                        role="presentation"
                                        onClick={toggleDrawer(false)}
                                        onKeyDown={toggleDrawer(false)}
                                    >
                                        <List>
                                            {menuOptions.map((option) => (
                                                <StyledListItem button key={option.name} component={Link} to={option.link}>
                                                    <ListItemText primary={option.name} />
                                                </StyledListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </StyledDrawer>
                            </>
                        ) : (
                            <>
                                {menuOptions.map((option) => (
                                    <StyledButton key={option.name} component={Link} to={option.link}>
                                        {option.name}
                                    </StyledButton>
                                ))}
                            </>
                        )}
                    </StyledToolbar>
                </StyledAppBar>
                <WaveContainer>
                    <Wave viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1500,50 L1500,00 L0,0 Z" />
                    </Wave>
                </WaveContainer>
            </Box>
        </>
    );
}
