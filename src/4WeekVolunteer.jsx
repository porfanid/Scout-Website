import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

const VolunteerForm = () => {
    const [loading, setLoading] = useState(true);

    return (
        <Box
            sx={{
                padding: 3,
                minHeight: '100vh',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 800,
                    margin: 'auto',
                }}
            >
                <Typography variant="h1" align="center" gutterBottom>
                    Φόρμα Εθελοντή 4 Εβδομάδων
                </Typography>
                <Typography variant="body1">
                    <b>Αν σκέφτεστε ότι ο Προσκοπισμός δεν είναι για όλους, μπορεί να μην μάθετε ποτέ αν είναι για εσάς, μέχρι να δοκιμάσετε. Η πρόκληση των 4 εβδομάδων είναι η ευκαιρία σας. Ζήστε λίγη από τη διασκέδαση και την περιπέτεια του Προσκοπισμού, βοηθώντας για ένα μήνα σαν εθελοντές σε ένα Προσκοπικό Σύστημα. Θα εκπλαγείτε με τη διαφορά που μπορείτε να κάνετε.</b>
                </Typography>
                <Typography variant="body1">
                    Η πρόκληση των 4 εβδομάδων είναι μια ευκαιρία να βιώσετε τη χαρά του Προσκοπισμού από πρώτο χέρι και να δοκιμάσετε το ρόλο του εθελοντή, χωρίς μακροχρόνια δέσμευση. Οι 4 εβδομάδες είναι αρκετές για να δείξουν πόσο εύκολο είναι για εσάς να υποστηρίζετε τις δράσεις ενός Προσκοπικού Τμήματος και να μάθετε πόσα θα μπορούσατε να κερδίσετε συμμετέχοντας στους Προσκόπους. Αυτά μπορεί να περιλαμβάνουν νέες δεξιότητες, νέες φιλίες, νέες εμπειρίες και την αίσθηση να κάνετε τη διαφορά στη ζωή των νέων. Υπάρχει ένα ευρύ φάσμα ευκαιριών εθελοντισμού, που ταιριάζουν με τις δεξιότητες που ήδη έχετε ή με εκείνες που θα θέλατε να αναπτύξετε.
                </Typography>

                <Button
                    component="a"
                    href="https://www.sep.org.gr/admin/dsContent/UserData/117079/%CE%93%CE%99%CE%9D%CE%95_%CE%95%CE%98%CE%95%CE%9B%CE%9F%CE%9D%CE%A4%CE%97%CE%A3_4_%CE%95%CE%92%CE%94%CE%9F%CE%9C%CE%91%CE%94%CE%A9%CE%9D.pdf"
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Improves security
                    color={"fancy"}
                >
                    Κατέβασε τον οδηγό των 4 εβδομάδων
                </Button>

                <Box
                    sx={{
                        width: '100%',
                        minHeight: '800px',
                        marginTop: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    {loading && (
                        <CircularProgress
                            sx={{
                                position: 'absolute',
                                zIndex: 1,
                            }}
                            color={"fancy"}
                        />
                    )}
                    <Box
                        component="iframe"
                        src="https://docs.google.com/forms/d/e/1FAIpQLSegWDAfIBRLJIAXNqpWNLO_xb2b3xXfzZwSDjBU-Jm0TjYFLg/viewform?embedded=true"
                        onLoad={() => setLoading(false)}
                        sx={{
                            width: '100%',
                            minHeight: '800px',
                            border: 'none',
                            display: loading ? 'none' : 'block', // Hide iframe until it loads
                        }}
                    />
                </Box>

                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Ευχαριστούμε για το ενδιαφέρον σας να συμμετάσχετε ως εθελοντής! Αν έχετε οποιαδήποτε ερώτηση, μη διστάσετε να επικοινωνήσετε μαζί μας.
                </Typography>
            </Paper>
        </Box>
    );
};

export default VolunteerForm;
