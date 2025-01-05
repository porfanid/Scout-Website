import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom';
import Sitemark from "./SiteMarkIcon";
import {auth, db} from "../firebase.js";
import {doc, getDoc} from "firebase/firestore";
import {Menu, MenuItem, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/styles";
import {
    StyledAppBar,
    StyledButton,
    StyledDrawer,
    StyledListItem,
    StyledToolbar,
    Wave,
    WaveContainer
} from "./Components.jsx";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const menuLinks=[
        {
            role:null,
            links:[
                    {name: "Αρχική", link: "/"},
            ]
        },
        {
            role: null,
            links:[
                {
                    name: "Σχετικά με εμάς", subMenu: [
                        {name: "Gallery", link: "/events"},
                        {name: "Ημερολόγιο", link: "/calendar"}
                    ]
                }
            ]
        },
        {
            role: ["admin"],
            links:[
                {
                    name: "Διαχείριση", subMenu: [
                        {name: "Διαχείριση Αρχηγών", link: "/admin"},
                        {name: "Διαχείριση Χρηστών", link: "/user-admin"}
                    ]
                }
            ]
        },
        {
            role: ["cleaning", "admin"],
            links:[
                {name: "Καθαριότητες", link: "/chores"}
            ]
        },
        {
            role: null,
            links:[
                {name: "Επικοινωνία", link: "/contact"}
            ]
        },
        {
            loggedIn: true,
            role: null,
            links: [
                {name: "Προφίλ", link: "/profile"},
                {name: "Αποσύνδεση", link: "/logout"}
            ]
        },
        {
            loggedIn: false,
            role: null,
            links: [
                {name: "Σύνδεση/Εγγραφή", link: "/login"}
            ]
        }
    ]

    const [menuOptions, setMenuOptions] = useState([]);
    const [anchorEls, setAnchorEls] = useState({});
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const [isLoggedIn, setIsLogged] = useState(false);
    const [role, setRole] = useState(null);


    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            if (user) {
                setIsLogged(true);
                const snapshot = await getDoc(doc(db, "users", user.uid));
                if (!snapshot.exists) {
                    return null;
                }
                const data = snapshot.data();
                if (data.role) {
                    setRole(data.role);
                }
            }else{
                setRole(null);
                setIsLogged(false);
            }
        });
    }, []);


    useEffect(() => {
        let menuEntries = [];
        menuLinks.forEach((menuLink) => {
            const shouldBeHidden = menuLink.hidden ||
                    (!isLoggedIn&&(!!menuLink.role||menuLink.loggedIn)) ||
                    (isLoggedIn && menuLink.loggedIn===false)
            ;
            if(shouldBeHidden){
                return;
            }
            if (menuLink.role === null || (role && menuLink.role && menuLink.role.some(r => role.includes(r)))) {
                menuEntries.push(...menuLink.links);
            }
        });
        setMenuOptions(menuEntries);
    }, [role, isLoggedIn]);



    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleMenuOpen = (event, name) => {
        setAnchorEls((prev) => ({...prev, [name]: event.currentTarget}));
    };

    const handleMenuClose = (name) => {
        setAnchorEls((prev) => ({...prev, [name]: null}));
    };

    const handleMobileSubMenuOpen = (subMenu) => {
        setOpenSubMenu(subMenu);
        setSubMenuOpen(true);
    };

    const handleMobileSubMenuClose = (closeBoth) => {
        if (closeBoth) {
            setOpen(false); // Close the main drawer
        }
        setOpenSubMenu(null);
        setSubMenuOpen(false);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
            <>
                <Box sx={{position: 'relative', margin: 0, padding: 0}}>
                    <StyledAppBar position="sticky">
                        <StyledToolbar>
                            <Typography variant="h6" sx={{flexGrow: 1, fontWeight: 'bold'}}>
                                <Sitemark/>
                            </Typography>
                            {isMobile ? (
                                    <>
                                        <IconButton aria-label="menu" color={theme.palette.primary.contrastText}
                                                    edge="end" onClick={toggleDrawer(true)}>
                                            <MenuIcon/>
                                        </IconButton>
                                        <StyledDrawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                            <Box
                                                    sx={{width: 250}}
                                                    role="presentation"
                                                    onKeyDown={toggleDrawer(false)}
                                            >
                                                <List>
                                                    {menuOptions.map((option) => (
                                                            option.subMenu ? (
                                                                    <StyledListItem button key={option.name}
                                                                                    onClick={() => handleMobileSubMenuOpen(option.subMenu)}>
                                                                        <ListItemText primary={option.name}/>
                                                                    </StyledListItem>
                                                            ) : (
                                                                    <StyledListItem button key={option.name}
                                                                                    component={Link} to={option.link}
                                                                                    onClick={toggleDrawer(false)}>
                                                                        <ListItemText primary={option.name}/>
                                                                    </StyledListItem>
                                                            )
                                                    ))}
                                                </List>
                                            </Box>
                                        </StyledDrawer>
                                        <StyledDrawer anchor="right" open={subMenuOpen}
                                                      onClose={() => handleMobileSubMenuClose(false)}>
                                            <Box
                                                    sx={{width: 250}}
                                                    role="presentation"
                                                    onKeyDown={() => handleMobileSubMenuClose(false)}
                                            >
                                                <List>
                                                    {openSubMenu && openSubMenu.map((subOption) => (
                                                            <StyledListItem button key={subOption.name} component={Link}
                                                                            to={subOption.link}
                                                                            onClick={() => handleMobileSubMenuClose(true)}>
                                                                <ListItemText primary={subOption.name}/>
                                                            </StyledListItem>
                                                    ))}
                                                </List>
                                            </Box>
                                        </StyledDrawer>
                                    </>
                            ) : (
                                    <>
                                        {menuOptions.map((option) => (
                                                option.subMenu ? (
                                                        <div key={option.name}>
                                                            <StyledButton
                                                                    aria-controls={`${option.name}-menu`}
                                                                    aria-haspopup="true"
                                                                    onClick={(e) => handleMenuOpen(e, option.name)}
                                                            >
                                                                {option.name}
                                                            </StyledButton>
                                                            <Menu
                                                                    id={`${option.name}-menu`}
                                                                    anchorEl={anchorEls[option.name]}
                                                                    keepMounted
                                                                    open={Boolean(anchorEls[option.name])}
                                                                    onClose={() => handleMenuClose(option.name)}
                                                            >
                                                                {option.subMenu.map((subOption) => (
                                                                        <MenuItem key={subOption.name} component={Link}
                                                                                  to={subOption.link}>
                                                                            {subOption.name}
                                                                        </MenuItem>
                                                                ))}
                                                            </Menu>
                                                        </div>
                                                ) : (
                                                        <StyledButton key={option.name} component={Link}
                                                                      to={option.link}>
                                                            {option.name}
                                                        </StyledButton>
                                                )
                                        ))}
                                    </>
                            )}
                        </StyledToolbar>
                    </StyledAppBar>
                    <WaveContainer>
                        <Wave viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1500,50 L1500,00 L0,0 Z"/>
                        </Wave>
                    </WaveContainer>
                </Box>
            </>
    );
}