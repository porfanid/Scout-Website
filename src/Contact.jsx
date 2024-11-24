import React, { useState } from 'react';
import { Typography, TextField, Button, Alert, CircularProgress, Box, Paper, Skeleton } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI
import { httpsCallable } from 'firebase/functions';
import { functions } from "./firebase.js";

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mapLoading, setMapLoading] = useState(true);

    const sendContactMessage = httpsCallable(functions, 'sendContactMessage');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setError("Όλα τα πεδία είναι υποχρεωτικά");
            return;
        }

        setLoading(true);

        try {
            await sendContactMessage({ name, email, message });
            setSuccess(true);
            setError(null);
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setError(err.message || "Αποτυχία αποστολής μηνύματος. Παρακαλώ δοκιμάστε ξανά.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 1200, width: '100%' }}>
                <Typography variant="h4" gutterBottom>Επικοινωνήστε μαζί μας</Typography>
                <Typography variant="body1" gutterBottom>
                    Συμπληρώστε την παρακάτω φόρμα για να επικοινωνήσετε μαζί μας.
                </Typography>
                {/* Main Container */}
                <Grid2 container spacing={3} sx={{display: 'flex',justifyContent: 'evenly',}}>
                    {/* Left Column (Form) */}
                    <Grid2
                        item
                        xs={12}  // Full width on small screens
                        md={2}
                        lg={2}// 50% width on medium and larger screens
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: {
                                sm:"100%",
                                md:"40%"
                            },
                            marginRight:{
                                sm:0,
                                md: "100px"
                            }
                        }}
                    >
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <TextField
                                label="Όνομα"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Μήνυμα"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }} disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Αποστολή Μηνύματος'}
                            </Button>
                        </form>
                        {success && <Alert severity="success" sx={{ marginTop: 2 }}>Το μήνυμα στάλθηκε με επιτυχία!</Alert>}
                        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
                    </Grid2>

                    {/* Right Column (Map) */}
                    <Grid2
                        item
                        xs={12}  // Full width on small screens
                        md={5}   // 50% width on medium and larger screens
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: {
                                sm:"100%",
                                md:"40%"
                            },
                        }}
                    >
                        {mapLoading && <Skeleton variant="rectangular" width="100%" height={400} />}
                        <iframe
                            width="100%"
                            height="400"
                            style={{ border: 0, display: mapLoading ? 'none' : 'block' }}
                            src="https://www.google.com/maps/embed/v1/place?q=Pindarou%209,%20Ioannina,%2045332&key=AIzaSyDuSYLGWDUpKE0Mtc_SjG6OSp9Btt9mXzU"
                            onLoad={() => setMapLoading(false)}
                            allowFullScreen
                        ></iframe>
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    );
}

export default Contact;
