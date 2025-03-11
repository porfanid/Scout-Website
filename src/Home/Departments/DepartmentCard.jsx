import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useSpring, animated } from '@react-spring/web';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {lighten, darken} from "@mui/material/";

export const DepartmentCard = ({ department, chief }) => {
    const theme = useTheme();

    const overlayAnimation = useSpring({
        loop: true,
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: { duration: 5000 },
    });

    const buttonHoverAnimation = useSpring({
        from: { transform: 'scale(1)' },
        to: async (next) => {
            while (true) {
                await next({ transform: 'scale(1.1)' });
                await next({ transform: 'scale(1)' });
            }
        },
        config: { tension: 180, friction: 12 },
    });

    return (
            <Card
                    component={department.is_animated ? animated.div : 'div'}
                    sx={{
                        bgcolor: department.bgColor,
                        color: "#000000",
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: 20,
                        height: "100%",
                        '&:hover': {
                            transform: 'none',
                            boxShadow: 3,
                        },
                    }}
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
                    />
                    {department.overlay_img_url && (
                            department.is_component ? (
                                    <department.overlay_img_url
                                            style={{
                                                ...theme.customStyles.departmentCardOverlay,
                                                ...(department.is_animated ? {} : overlayAnimation),
                                            }}
                                    />
                            ) : (
                                    <animated.img
                                            src={department.overlay_img_url}
                                            alt={`${department.name} overlay`}
                                            style={{
                                                ...theme.customStyles.departmentCardOverlay,
                                                ...(department.is_animated ? {} : overlayAnimation),
                                            }}
                                    />
                            )
                    )}
                </Box>
                <CardContent>
                    <Typography variant="h5">{department.name}</Typography>
                    <Typography variant="subtitle1">{department.moto}</Typography>
                    {department.age && (
                            <Typography variant="body2" color={"#000000"}>
                                <FaceIcon sx={{ marginRight: '5px' }} />
                                {department.age} χρονών
                            </Typography>
                    )}
                    {chief && (
                            <>
                                {chief.meetingDate && (
                                        <Typography variant="body2" color={"#000000"}>
                                            <CalendarTodayIcon sx={{ marginRight: '5px' }} />
                                            {chief.meetingDate}
                                        </Typography>
                                )}
                                {chief.name && (
                                        <Box sx={theme.customStyles.departmentCardChiefBox}>
                                            <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        ...theme.customStyles.departmentCardChiefText,
                                                        color: darken(department.bgColor, 0.5),
                                                    }}
                                            >
                                                Αρχηγός: {chief.name}
                                            </Typography>
                                            {chief.phone && (
                                                    <Typography variant="body2">
                                                        <PhoneIcon sx={{ marginRight: '5px' }} />
                                                        {chief.phone}
                                                    </Typography>
                                            )}
                                            {chief.email && (
                                                    <Typography variant="body2">
                                                        <EmailIcon sx={{ marginRight: '5px' }} />
                                                        {chief.email}
                                                    </Typography>
                                            )}
                                        </Box>
                                )}
                            </>
                    )}
                    {department.formLink && (
                            <Box
                                    sx={{
                                        marginTop: 2,
                                        textAlign: 'center',
                                    }}
                            >
                                <animated.div style={buttonHoverAnimation}>
                                    <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{
                                                bgcolor: lighten(department.bgColor, 0.3),
                                                color: 'white',
                                                borderRadius: 50,
                                                padding: '10px 20px',
                                                '&:hover': {
                                                    bgcolor: '#ffffff',
                                                    color: department.bgColor,
                                                },
                                            }}
                                            href={department.formLink}
                                            target="_blank"
                                            startIcon={<OpenInNewIcon />}
                                    >
                                        🚀 Ζήσε την περιπέτεια!
                                    </Button>
                                </animated.div>
                            </Box>
                    )}
                </CardContent>
            </Card>
    );
};
