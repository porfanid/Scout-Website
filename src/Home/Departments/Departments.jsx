import React, {useEffect, useState} from 'react';
import {db} from '../../firebase.js';
import {Alert, Box, CircularProgress, Grid2 as Grid, Typography} from '@mui/material';
import {collection, onSnapshot} from 'firebase/firestore';
import {DepartmentCard} from './DepartmentCard.jsx';
import lykopoyla from "../../assets/simatakia_kladou_lukopoulon/Logo_cubs_letterless.png";
import scouts from "./assets/animated_scouts.gif";
import explorers from "../../assets/simatakia_kladou_anixneuton/Logo_explorers_letterless.png";
import diktyo from "./assets/animated_network_transparrent.gif";
import departmentsBackground from './assets/hollowed-boxes.svg'; // Import the SVG file
import departmentsBackgroundDark from './assets/hollowed-boxes.dark.svg'; // Import the SVG file
import {animated, useSpring} from '@react-spring/web';
import {useTheme} from "@mui/styles";

const Departments = () => {

    const theme = useTheme();

    const getAnimationProps = (index) => {
        const animations = [
            {from: {opacity: 0, transform: 'translateX(-100%)'}, to: {opacity: 1, transform: 'translateX(0)'}},
            {from: {opacity: 0, transform: 'translateX(100%)'}, to: {opacity: 1, transform: 'translateX(0)'}},
            {from: {opacity: 0, transform: 'translateY(-100%)'}, to: {opacity: 1, transform: 'translateY(0)'}},
            {from: {opacity: 0, transform: 'translateY(100%)'}, to: {opacity: 1, transform: 'translateY(0)'}},
        ];
        return animations[index % animations.length];
    };

    const [departments] = useState([
        {
            name: 'Λυκόπουλα',
            moto: "Πάντα πρόθυμος για το καλό!",
            img_url: "/CMS/site/images/participate-1.png",
            overlay_img_url: lykopoyla,
            age: "7-11",
            bgColor: "#FFAC00",
            animationProps: useSpring(getAnimationProps(0)),
        },
        {
            name: 'Πρόσκοποι',
            moto: "Έσο έτοιμος!",
            img_url: "/CMS/site/images/participate-2.png",
            overlay_img_url: scouts,
            is_animated: true,
            is_component: false,
            age: "11-15",
            bgColor: "#007560",
            animationProps: useSpring(getAnimationProps(1)),
        },
        {
            name: 'Ανιχνευτές',
            moto: "Ανίχνευε Υψηλότερα και Ευρύτερα!",
            img_url: "/CMS/site/images/participate-3.png",
            overlay_img_url: explorers,
            age: "15-18",
            bgColor: "#B93A3E",
            animationProps: useSpring(getAnimationProps(2)),
        },
        {
            name: 'Προσκοπικό Δίκτυο',
            moto: "Εμείς μαζί με Άλλους!",
            img_url: "/CMS/site/images/participate-4.png",
            overlay_img_url: diktyo,
            is_animated: true,
            age: "18-24",
            bgColor: "#2760A7",
            animationProps: useSpring(getAnimationProps(3)),
        },
        {
            name: 'Εθελοντές',
            moto: null,
            img_url: "/CMS/site/images/participate-5.png",
            overlay_img_url: null,
            age: "",
            bgColor: "#4B2C6D",
            formLink: 'https://forms.gle/e4cUbZ3k6U7YfcbA7', // Volunteer form
            animationProps: useSpring(getAnimationProps(4)),
        },
        {
            name: 'Γονείς και Κηδεμόνες',
            moto: null,
            img_url: "/CMS/site/images/participate-6.png",
            overlay_img_url: null,
            age: "",
            bgColor: "#C75B00",
            formLink: 'https://forms.gle/SfpDDNGE28u7N5vu8', // Parents form
            animationProps: useSpring(getAnimationProps(5)),
        },
    ]);


    const backgroundAnimation = useSpring({
        backgroundPosition: '0% 0%',
        to: async (next) => {
            while (true) {
                await next({backgroundPosition: '100% 50%'});
                await next({backgroundPosition: '0% 0%'});
            }
        },
        config: {duration: 15000}, // Adjust speed
    });


    const [chiefs, setChiefs] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
                collection(db, 'chiefs'),
                (snapshot) => {
                    const data = {};
                    snapshot.docs.forEach((doc) => {
                        data[doc.id] = doc.data();
                    });
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
    }, []);

    if (loading) return <CircularProgress/>;
    if (error) return <Alert severity="error">Error fetching chiefs: {error}</Alert>;

    return (
            <animated.div style={{
                ...backgroundAnimation,
                backgroundImage: `url(${theme.palette.mode==='dark'?departmentsBackgroundDark:departmentsBackground})`,
                backgroundSize: '150%',
                backgroundRepeat: 'repeat',
                height:"100%"
            }}>
                <Box
                        sx={{
                            padding: 3,
                            marginTop: '0px',
                        }}
                >
                    <Typography
                            variant="h1"
                            gutterBottom
                            sx={{
                                textAlign: 'center',
                                marginTop: '40px',
                                fontFamily: "'Comic Sans MS', cursive",
                            }}
                    >
                        Δείτε τα διαθέσιμα τμήματα
                    </Typography>
                    <Grid
                            container
                            spacing={3}
                            columnSpacing={{xs: 0, sm: 2, md: 3}}
                            justifyContent="center"
                            sx={{marginTop: 2, width: "100%"}}
                    >
                        {departments.map((department) => {
                            return (
                                    <Grid
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 4,
                                                lg: 4,
                                            }}
                                            key={department.name}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                boxSizing: 'border-box',
                                                height:"100%"
                                            }}
                                    >
                                        <animated.div style={department.animationProps}>
                                            <DepartmentCard department={department} chief={chiefs[department.name]}/>
                                        </animated.div>
                                    </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </animated.div>
    );
};

export default Departments;
