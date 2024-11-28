import { Box, Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import heroImage from "./hero.png";
import siteTitleSvg from "./site_title.svg";
import Departments from "./Departments/Departments.jsx";
import backgroundImage from "../Navbar/topShadow.png"
import {useTheme} from "@mui/styles";
import BecomeScout from "./BecomeScout.jsx";


/**
 * Toggles the drawer open or closed.
 * @param {boolean} newOpen - The new open state of the drawer.
 * @returns {Function} The function to toggle the drawer.
 */
function Home() {

    const theme = useTheme();
    const mainBgColor = theme.palette.background.default;

    return (
        <>
            {/* Hero Section */}
            <Box display="flex" justifyContent="center" sx={{
                width: "100%",
                padding: '2rem',
                position: 'relative',
                marginBottom:"0px",
                backgroundImage: `url(${backgroundImage})`, // Add the background image
                backgroundSize: 'cover', // Ensure the image covers the entire area
                backgroundPosition: 'center', // Center the image
                paddingTop:"15vh",
                '::before': theme.palette.mode==="dark"?{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: `${mainBgColor}80`, // Use the main background color with opacity
                    zIndex: 0,
                }:{}
            }}>
                <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* First Grid item with the SVG image */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 1,
                            padding: { xs: '20px', md: '0' }, // Add padding for smaller screens
                        }}
                    >
                        <Box
                                component="img"
                                src={siteTitleSvg}
                                alt="Site Title"
                                sx={{
                                    minWidth: { md: '50vw', xs: '80vw' },
                                    maxWidth: '100vw',
                                    height: 'auto'
                                }}
                        />
                    </Grid>

                    {/* Second Grid item with the hero image */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 0,
                            marginLeft: { xs: 0, md: '-8vw' }  // Adjust this value for desired overlap
                        }}
                    >
                        <img
                            src={heroImage}
                            alt="Hero Image"
                            style={{ width: '100%', height: 'auto', maxWidth: '700px', objectFit: 'contain' }} // Ensure the hero image fits well
                        />
                    </Grid>
                </Grid>
            </Box>

            <BecomeScout/>

            {/* Departments Section */}

            <Departments/>
        </>
    );
}

export default Home;