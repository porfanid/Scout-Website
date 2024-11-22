import { useState } from 'react';
import { Typography, TextField, Button, Alert, CircularProgress, Box, Paper, Grid } from '@mui/material';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { functions } from "./firebase.js";

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <form onSubmit={handleSubmit}>
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
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <iframe
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            src="https://www.google.com/maps/embed/v1/place?q=Pindarou%209,%20Ioannina,%2045332&key=AIzaSyDuSYLGWDUpKE0Mtc_SjG6OSp9Btt9mXzU"
                            allowFullScreen
                        ></iframe>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default Contact;