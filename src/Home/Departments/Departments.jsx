import React, { useEffect, useState } from 'react';
import { db } from '../../firebase.js';
import { Typography, Grid2 as Grid, Box, CircularProgress, Alert } from '@mui/material';
import bgImage from '../6604334.png';
import { collection, onSnapshot } from 'firebase/firestore';
import DepartmentCard from './DepartmentCard.jsx';
import lykopoyla from "../../assets/simatakia_kladou_lukopoulon/Logo_cubs_letterless.png";
import scouts from "./assets/animated_scouts.gif";
import explorers from "../../assets/simatakia_kladou_anixneuton/Logo_explorers_letterless.png";
import diktyo from "./assets/animated_network_transparrent.gif";

/**
 * Departments component that displays a list of departments with their respective details.
 * @returns {JSX.Element} The rendered Departments component.
 */
const Departments = () => {
    const [departments] = useState([
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
            is_animated:true,
            is_component: false,
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
            is_animated: true,
            age: "18-24",
            bgColor: "#003C5B",
        },
        {
            name: 'Εθελοντές',
            moto: null,
            img_url: "/CMS/site/images/participate-5.png",
            overlay_img_url: null,
            age: "",
            bgColor: "#4B2C6D",
        },
        {
            name: 'Γονείς και Κηδεμόνες',
            moto: null,
            img_url: "/CMS/site/images/participate-6.png",
            overlay_img_url: null,
            age: "",
            bgColor: "#C75B00",
        },
    ]);

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

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error fetching chiefs: {error}</Alert>;

    return (
        <Box
            sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 3,
                marginTop: '0px',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    marginTop: '40px',
                    fontFamily: "'Comic Sans MS', cursive",
                    textShadow: '2px 2px #FF6347',
                }}
            >
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

                            <DepartmentCard department={department} chief={chiefs[department.name]} />
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
};

export default Departments;
