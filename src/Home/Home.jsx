import { Box, Grid } from '@mui/material';
import React from 'react';
import heroImage from "./hero.png";
import siteTitlePng from "./site_title.png";
import Departments from "./Departments/Departments.jsx";
import backgroundImage from "../Navbar/topShadow.png";
import { useTheme } from "@mui/styles";
import BecomeScout from "./BecomeScout/BecomeScout.jsx";

function Home() {
    const theme = useTheme();
    const mainBgColor = theme.palette.background.default;

    return (
            <>
                {/* Hero Section */}
                <Box
                        display="flex"
                        justifyContent="center"
                        sx={{
                            width: "100%",
                            padding: '2rem',
                            position: 'relative',
                            Bottom: "20rem", // Add margin bottom to prevent overlap
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            paddingTop: { xs: "10vh", md: "10vh" },
                            maxHeight: {
                                md:"100vh",
                                lg: "100vh"
                            },
                            '::before': theme.palette.mode === "dark"
                                    ? {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: `${mainBgColor}80`,
                                        zIndex: -1,
                                    }
                                    : {},
                        }}
                >
                    <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                flexDirection: { xs: 'row', sm: 'row', md:"column" }, // Stack on extra-small screens, row on small and larger
                            }}
                    >
                        <Grid
                                item
                                xs={12} // Full width on extra-small screens
                                sm={12} // Full width on small screens
                                md={6} // Half width on medium screens and above
                        >
                            <Box
                                    component="img"
                                    src={siteTitlePng}
                                    alt="Site Title"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                            />
                        </Grid>

                        <Grid
                                item
                                xs={12} // Full width on extra-small screens
                                sm={12} // Full width on small screens
                                md={6} // Half width on medium screens and above
                        >
                            <Box
                                    component="img"
                                    src={heroImage}
                                    alt="Hero Image"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight:{
                                            xs: "100vh",
                                            md: "auto"
                                        }
                                    }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Call-to-Action Section */}
                <BecomeScout />

                {/* Departments Section */}
                <Departments />
            </>
    );
}

export default Home;