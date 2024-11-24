import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useSpring, animated } from '@react-spring/web';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/styles";
import '@fontsource/pacifico';
import '@fontsource/roboto';
import '@fontsource/indie-flower';

const DepartmentCard = ({ department, chief }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const cardAnimation = useSpring({
        from: { transform: 'scale(1)', boxShadow: '0px 4px 10px rgba(0,0,0,0.3)' },
        to: { transform: 'scale(1.1)', boxShadow: '0px 6px 15px rgba(0,0,0,0.5)' },
        config: { tension: 200, friction: 10 },
    });

    const overlayAnimation = useSpring({
        loop: true,
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: { duration: 5000 },
    });

    const cardStyle = {
        width: '100%',
        maxWidth: 350,
        minWidth: 275,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: department.bgColor,
        color: "#FFFFFF",
        position: 'relative',
        boxShadow: 3,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${department.bgColor} 0%, rgba(0,0,0,0.5) 100%)`,
            opacity: 0.7,
            zIndex: 0,
        },
        '& *': {
            position: 'relative',
            zIndex: 1,
        },
        ...(isMobile && {
            maxWidth: '100%',
            minWidth: '100%',
            borderRadius: 0,
            '&:hover': {
                transform: 'none',
                boxShadow: 3,
            },
        }),
    };

    return (
        <Card
            component={department.is_animated ? animated.div : 'div'}
            sx={cardStyle}
        >
            <Box
                sx={{
                    position: 'relative',
                    background: `radial-gradient(circle, white, ${department.bgColor})`,
                }}
            >
                <CardMedia
                    component="img"
                    alt={department.name}
                    image={`https://www.sep.org.gr${department.img_url}`}
                    sx={{
                        height: 200,
                        objectFit: 'contain',
                        padding: 2,
                        zIndex: 1,
                    }}
                />
                {department.overlay_img_url && (
                    department.is_component ? (
                        <department.overlay_img_url style={{
                            ...(department.is_animated ? {} : overlayAnimation),
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: 100,
                            width: 100,
                        }}/>
                    ) : (
                        <animated.img
                            src={department.overlay_img_url}
                            alt={`${department.name} overlay`}
                            style={{
                                ...(department.is_animated ? {} : overlayAnimation),
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: 100,
                                width: 100,
                            }}
                        />
                    )
                )}
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" sx={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                    fontWeight: 'bold',
                    textAlign: 'center', }}>
                    {department.name}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ marginTop: "3vh", marginBottom: "2vh", fontWeight: 'italic', fontFamily: "'Indie Flower', cursive" }}>
                    {department.moto}
                </Typography>
                {department.age && (
                    <Typography variant="body2" sx={{ marginBottom: '10px', display: 'flex', alignItems: 'center', fontFamily: "'Roboto', sans-serif" }}>
                        <FaceIcon sx={{ marginRight: '5px' }} />
                        {department.age} χρονών
                    </Typography>
                )}
                {chief && <>
                    {chief.meetingDate && (
                        <Typography variant="body2" sx={{ marginTop: '5px', display: 'flex', alignItems: 'center', fontFamily: "'Roboto', sans-serif" }}>
                            <CalendarTodayIcon sx={{ marginRight: '5px' }} />
                            {chief.meetingDate}
                        </Typography>
                    )}
                    {chief.name ? (
                        <Box sx={{ backgroundColor: '#B0BEC5', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: department.bgColor, fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
                                Chief: {chief.name}
                            </Typography>
                            {chief.phone && (
                                <Typography variant="body2" sx={{ color: '#37474f', marginTop: '5px', display: 'flex', alignItems: 'center', fontFamily: "'Roboto', sans-serif" }}>
                                    <PhoneIcon sx={{ marginRight: '5px' }} />
                                    {chief.phone}
                                </Typography>
                            )}
                            {chief.email && (
                                <Typography variant="body2" sx={{ color: '#37474f', marginTop: '5px', display: 'flex', alignItems: 'center', fontFamily: "'Roboto', sans-serif" }}>
                                    <EmailIcon sx={{ marginRight: '5px' }} />
                                    {chief.email}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px', fontFamily: "'Roboto', sans-serif" }}>
                            No chief information available.
                        </Typography>
                    )}
                </>}
            </CardContent>
        </Card>
    );
};

export default DepartmentCard;