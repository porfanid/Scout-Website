import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Typography, Container, Box, Alert, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setVerificationMessage('Your email is not verified. Please verify your email.');
            } else {
                navigate('/admin');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleResendVerification = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                setVerificationMessage('Verification email resent. Please check your inbox.');
            }
        } catch (error) {
            setError('Failed to resend verification email. Please try again later.');
        }
    };

    return (
            <Container
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80vh',
                    }}
                    maxWidth="xs"
            >
                <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{
                            mt: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Login
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {verificationMessage && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {verificationMessage}
                                <Button variant="text" color="secondary" onClick={handleResendVerification}>
                                    Resend Verification Email
                                </Button>
                            </Alert>
                    )}
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
                        Login
                    </Button>
                    <Typography sx={{ mt: 2 }}>
                        Don't have an account?{' '}
                        <MuiLink
                                component={RouterLink}
                                to="/register"
                                underline="hover"
                                sx={{ textDecoration: 'none', color: '#1976d2' }}
                        >
                            Register here
                        </MuiLink>
                    </Typography>
                </Box>
            </Container>
    );
};

export default Login;
