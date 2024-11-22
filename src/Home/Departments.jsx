import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardMedia, Typography, Grid2 as Grid, Box, CircularProgress, Alert, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import diktyo from "../assets/simatakia_kladou_diktyou/Logo_network_letterless.png";
import lykopoyla from "../assets/simatakia_kladou_lukopoulon/Logo_cubs_letterless.png";
import scouts from "../assets/simatakia_kladou_proskopon/Logo_scouts_letterless.png";
import explorers from "../assets/simatakia_kladou_anixneuton/Logo_explorers_letterless.png";
import FaceIcon from '@mui/icons-material/Face';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import bgImage from "./6604334.png";

const Departments = () => {
    const [departments, setDepartments] = useState([
        {
            name: 'Λυκόπουλα',
            moto: "Πάντα πρόθυμος για το καλό!",
            img_url: "/CMS/site/images/participate-1.png",
            overlay_img_url: lykopoyla,
            age: "7-11",
            bgColor: "#B8860B",
        },
        {
            name: 'Πρόσκοποι',
            moto: "Έσο έτοιμος!",
            img_url: "/CMS/site/images/participate-2.png",
            overlay_img_url: scouts,
            age: "11-15",
            bgColor: "#005B33",
        },
        {
            name: 'Ανιχνευτές',
            moto: "Ανίχνευε Υψηλότερα και Ευρύτερα!",
            img_url: "/CMS/site/images/participate-3.png",
            overlay_img_url: explorers,
            age: "15-18",
            bgColor: "#a32121",
        },
        {
            name: 'Προσκοπικό Δίκτυο',
            moto: "Εμείς μαζί με Άλλους!",
            img_url: "/CMS/site/images/participate-4.png",
            overlay_img_url: diktyo,
            age: "18-24",
            bgColor: "#003C5B",
        },
        {
            name: 'Εθελοντές',
            img_url: "/CMS/site/images/participate-5.png",
            age: "",
            bgColor: "#4B2C6D",
        },
        {
            name: 'Γονείς και Κηδεμόνες',
            img_url: "/CMS/site/images/participate-6.png",
            age: "",
            bgColor: "#C75B00",
        }
    ]);

    const [chiefs, setChiefs] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'chiefs'),
            (snapshot) => {
                const data = {};
                snapshot.docs.forEach((doc) => {
                    data[doc.id] = doc.data();
                });
                console.log(data);
                setChiefs(data);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching chiefs:', err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [departments]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error fetching chiefs: {error}</Alert>;

    return (
        <Box
            sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 3,
                marginTop: "30px"
            }}
        >
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '40px' }}>
                Δείτε τα διαθέσιμα τμήματα
            </Typography>
            <Grid
                container
                spacing={3}
                columnSpacing={{ xs: 0, sm: 2, md: 3 }}
                justifyContent="center"
                sx={{ marginTop: 2, width: "100%" }}
            >
                {departments.map((department) => (
                    <Grid
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        key={department.name}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            minWidth: { xs: '100%', sm: '100%', md: '30%' },
                            maxWidth: { md: '33.33%' },
                            boxSizing: 'border-box',
                        }}
                    >
                        <Card
                            sx={{
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
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    alt={department.name}
                                    image={`https://www.sep.org.gr${department.img_url}`}
                                    sx={{
                                        height: 200,
                                        objectFit: 'contain',
                                        padding: 2,
                                    }}
                                />
                                {department.overlay_img_url && (
                                    <CardMedia
                                        component="img"
                                        alt={`${department.name} overlay`}
                                        image={department.overlay_img_url}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            height: 200,
                                            width: '100%',
                                            objectFit: 'contain',
                                            opacity: 0.5,
                                            padding: 2,
                                        }}
                                    />
                                )}
                            </Box>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                    {department.name}
                                </Typography>
                                <Typography variant="subtitle1" component="div" sx={{ marginTop: "3vh", marginBottom: "2vh", fontWeight: 'italic' }}>
                                    {department.moto}
                                </Typography>
                                {department.age && (
                                    <Typography variant="body2" sx={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                        <FaceIcon sx={{ marginRight: '5px' }} />
                                        {department.age} χρονών
                                    </Typography>
                                )}
                                {chiefs[department.name] && <>
                                    {chiefs[department.name].meetingDate && (
                                        <Typography variant="body2" sx={{ marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                                            <CalendarTodayIcon sx={{ marginRight: '5px' }} />
                                            {chiefs[department.name].meetingDate}
                                        </Typography>
                                    )}
                                    {chiefs[department.name].name ? (
                                        <Box sx={{ backgroundColor: '#B0BEC5', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: department.bgColor }}>
                                                Chief: {chiefs[department.name].name}
                                            </Typography>
                                            {chiefs[department.name].phone && (
                                                <Typography variant="body2" sx={{ color: '#37474f', marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                                                    <PhoneIcon sx={{ marginRight: '5px' }} />
                                                    {chiefs[department.name].phone}
                                                </Typography>
                                            )}
                                            {chiefs[department.name].email && (
                                                <Typography variant="body2" sx={{ color: '#37474f', marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                                                    <EmailIcon sx={{ marginRight: '5px' }} />
                                                    {chiefs[department.name].email}
                                                </Typography>
                                            )}
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                                            No chief information available.
                                        </Typography>
                                    )}
                                </>}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Departments;