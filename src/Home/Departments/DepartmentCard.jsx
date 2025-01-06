import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useSpring, animated } from '@react-spring/web';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const DepartmentCard = ({ department, chief }) => {
    const theme = useTheme();

    const overlayAnimation = useSpring({
        loop: true,
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: { duration: 5000 },
    });

    return (
            <Card
                    component={department.is_animated ? animated.div : 'div'}
                    sx={{
                        bgcolor: department.bgColor,
                        color: '#FFFFFF',
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: 20,
                        height:"100%",
                        '&:hover': {
                            transform: 'none',
                            boxShadow: 3,
                        }
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
                            <Typography variant="body2">
                                <FaceIcon sx={{ marginRight: '5px' }} />
                                {department.age} χρονών
                            </Typography>
                    )}
                    {chief && (
                            <>
                                {chief.meetingDate && (
                                        <Typography variant="body2">
                                            <CalendarTodayIcon sx={{ marginRight: '5px' }} />
                                            {chief.meetingDate}
                                        </Typography>
                                )}
                                {chief.name ? (
                                        <Box sx={theme.customStyles.departmentCardChiefBox}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    ...theme.customStyles.departmentCardChiefText,
                                                    color: department.bgColor,
                                                }}
                                            >
                                                Chief: {chief.name}
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
                                ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No chief information available.
                                        </Typography>
                                )}
                            </>
                    )}
                </CardContent>
            </Card>
    );
};

DepartmentCard.propTypes = {
    department: PropTypes.shape({
        name: PropTypes.string.isRequired,
        moto: PropTypes.string,
        img_url: PropTypes.string.isRequired,
        overlay_img_url: PropTypes.string,
        is_animated: PropTypes.bool,
        is_component: PropTypes.bool,
        age: PropTypes.string,
        bgColor: PropTypes.string.isRequired,
    }).isRequired,
    chief: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        meetingDate: PropTypes.string,
    }),
};

export default DepartmentCard;
