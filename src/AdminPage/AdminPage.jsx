import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Make sure Firebase is configured
import {doc, onSnapshot, setDoc} from 'firebase/firestore';
import { Button, TextField, CircularProgress, Alert, Box, Paper, Typography, Grid2 as Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import {fetchUserRole} from "../auth/check_permission.js";

const AdminPage = () => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chiefs, setChiefs] = useState({});
    const [updatedChiefs, setUpdatedChiefs] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        return auth.onAuthStateChanged((user)=>{
            fetchUserRole(user, ["admin"], setLoading, setError, navigate, setUserRole).then();
        });
    }, []);

    useEffect(() => {
        // Function to fetch and listen to Firestore changes
        const fetchChiefs = () => {
            try {
                const chiefsList = ['Λυκόπουλα', 'Πρόσκοποι', 'Ανιχνευτές', 'Προσκοπικό Δίκτυο']; // Add more if necessary
                const chiefsData = {};
                const unsubscribeList = [];

                // Add a listener for each department
                chiefsList.forEach((department) => {
                    const chiefDocRef = doc(db, 'chiefs', department);
                    const unsubscribe = onSnapshot(chiefDocRef, (snapshot) => {
                        if (snapshot.exists()) {
                            chiefsData[department] = snapshot.data();
                        } else {
                            chiefsData[department] = null; // Handle deleted documents
                        }

                        // Update state for every change
                        setChiefs({ ...chiefsData });
                        setUpdatedChiefs({ ...chiefsData }); // Keep updatedChiefs in sync
                    }, (error) => {
                        console.error(`Error fetching chiefs for ${department}:`, error);
                        setError('Failed to load chiefs data.');
                    });

                    // Save the unsubscribe function
                    unsubscribeList.push(unsubscribe);
                });

                // Cleanup function to unsubscribe from all listeners
                return () => unsubscribeList.forEach((unsubscribe) => unsubscribe());
            } catch (err) {
                setError('Failed to initialize chiefs listener.');
            }
        };

        const unsubscribe = fetchChiefs();

        return () => {
            if (unsubscribe) unsubscribe(); // Cleanup on unmount
        };
    }, [userRole]); // Re-run the effect if `userRole` changes

    const handleInputChange = (department, field, value) => {
        setUpdatedChiefs({
            ...updatedChiefs,
            [department]: {
                ...updatedChiefs[department],
                [field]: value,
            },
        });
    };

    const handleSaveChanges = async (department) => {
        try {
            await setDoc(doc(db, 'chiefs', department), updatedChiefs[department]);
            alert(`Chief information for ${department} updated successfully!`);
        } catch (err) {
            setError(`Failed to update ${department}'s chief information.`);
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    if (error) return <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>;

    return (
        <Box sx={{ padding: '40px' }}>
            <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginBottom: '40px' }}>
                Admin Panel: Manage Department Chiefs
            </Typography>

            <Grid container spacing={4}>
                {Object.keys(chiefs).map((department) => (
                    <Grid item xs={12} md={6} key={department}>
                        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
                            <Typography variant="h5" gutterBottom textAlign="center">
                                {department}
                            </Typography>

                            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="Όνομα αρχηγού"
                                    value={updatedChiefs[department]?.name || ''}
                                    onChange={(e) => handleInputChange(department, 'name', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Τηλέφωνο"
                                    value={updatedChiefs[department]?.phone || ''}
                                    onChange={(e) => handleInputChange(department, 'phone', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Email"
                                    value={updatedChiefs[department]?.email || ''}
                                    onChange={(e) => handleInputChange(department, 'email', e.target.value)}
                                    fullWidth
                                />

                                <TextField
                                    label="Ημέρα Συνάντησης"
                                    value={updatedChiefs[department]?.meetingDate || ''}
                                    onChange={(e) => handleInputChange(department, 'meetingDate', e.target.value)}
                                    fullWidth
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    onClick={() => handleSaveChanges(department)}
                                    sx={{
                                        alignSelf: 'center',
                                        width: '50%',
                                        borderRadius: '8px',
                                        marginTop: '20px',
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminPage;
