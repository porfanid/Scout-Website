import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { TextField, Button, Typography, Container, Box, Alert, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);

            // Store additional user data in Firestore (name and phone)
            await setDoc(doc(db, 'users', user.uid), {
                name,
                phone,
                email,
            }, {merge: true});

            setSuccessMessage('Registration successful! A verification email has been sent to your email address.');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
            <Container
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                    maxWidth="xs"
            >
                <Box
                        component="form"
                        onSubmit={handleRegister}
                        sx={{
                            mt: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Register
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
                    <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                            label="Phone"
                            type="tel"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                    >
                        Register
                    </Button>
                    <Typography sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <MuiLink
                                component={RouterLink}
                                to="/login"
                                underline="hover"
                                sx={{ textDecoration: 'none', color: '#1976d2' }}
                        >
                            Login here
                        </MuiLink>
                    </Typography>
                </Box>
            </Container>
    );
};

export default Register;
