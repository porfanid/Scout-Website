import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';

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
        delay: 300
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
                                fontFamily: "'Roboto', sans-serif",
                                textShadow: '2px 2px #FF6347',
                            }}
                    >
                        Γίνε Πρόσκοπος!
                    </Typography>
                    <Typography
                            variant="h4"
                            sx={{
                                marginBottom: 3,
                                fontFamily: "'Open Sans', sans-serif",
                                fontStyle: 'italic',
                                color: '#000000',
                            }}
                    >
                        Η περιπέτεια σε περιμένει!
                    </Typography>
                </animated.div>

                <Typography
                        variant="body1"
                        sx={{
                            marginBottom: 3,
                            fontFamily: "'Lora', serif",
                            lineHeight: 1.6,
                            fontSize: '30px',
                            letterSpacing: '0.5px',
                            color: '#000000',
                        }}
                >
                    Ανακάλυψε τον κόσμο της περιπέτειας, της φιλίας και της μάθησης. Γίνε μέλος της προσκοπικής οικογένειας
                    και ζήσε μοναδικές εμπειρίες που θα θυμάσαι για πάντα!
                </Typography>

                <animated.div style={buttonAnimation}>
                    <Button
                            variant="contained"
                            color="primary"
                            component={NavLink}
                            to="/contact"
                            sx={{
                                fontFamily: "'Verdana', sans-serif",
                                fontWeight: 'bold',
                                padding: '10px 20px',
                            }}
                    >
                        Επικοινωνήστε μαζί μας
                    </Button>
                </animated.div>
            </Box>
    );
};

export default Foreground;