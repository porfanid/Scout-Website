import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';

// Import fonts from Fontsource
import '@fontsource/pacifico';
import '@fontsource/playfair-display';
import '@fontsource/roboto-slab';
import '@fontsource/montserrat';

const Foreground = () => {
    // Animation for the button
    const buttonAnimation = useSpring({
        from: { transform: 'scale(0.9)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
        delay: 600,
    });

    // Animation for the heading
    const headingAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        delay: 300,
    });

    return (
            <Box
                    style={{
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: 20,
                    }}
            >
                <animated.div style={headingAnimation}>
                    <Typography
                            variant="h1"
                            gutterBottom
                            sx={{
                                marginBottom: 2,
                                fontFamily: "'Pacifico', cursive", // Fancy handwritten style
                                textShadow: '3px 3px #FF6347',
                                color: '#4A90E2',
                            }}
                    >
                        Ζήσε την περιπέτεια!
                    </Typography>
                    <Typography
                            variant="h4"
                            sx={{
                                marginBottom: 3,
                                fontFamily: "'Playfair Display', serif", // Elegant serif style
                                fontStyle: 'italic',
                                color: '#000000',
                            }}
                    >
                        Κάνε κάθε στιγμή να μετράει.
                    </Typography>
                </animated.div>

                <Typography
                        variant="body1"
                        sx={{
                            marginBottom: 3,
                            fontFamily: "'Roboto Slab', serif", // Clean and modern serif
                            lineHeight: 1.6,
                            fontSize: '30px',
                            color: '#000000',
                        }}
                >
                    Εξερεύνησε, δημιούργησε και ζήσε εμπειρίες που θα θυμάσαι για πάντα.
                    Γίνε μέρος της αλλαγής.
                </Typography>

                <animated.div style={buttonAnimation}>
                    <Button
                            variant="contained"
                            color="primary"
                            component={NavLink}
                            to="/contact"
                            sx={{
                                fontFamily: "'Montserrat', sans-serif", // Professional sans-serif
                                fontWeight: 'bold',
                                padding: '10px 20px',
                            }}
                    >
                        Ξεκίνα τώρα!
                    </Button>
                </animated.div>
            </Box>
    );
};

export default Foreground;
