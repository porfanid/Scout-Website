import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Assuming firebase.js is set up properly
import { Card, CardContent, Avatar, Typography, Button, Box, Grid, Divider, TextField } from '@mui/material';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateProfile } from "firebase/auth";
const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [editingDisplayName, setEditingDisplayName] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Listen to authentication state changes
        const unsubscribe = auth.onAuthStateChanged(setUser);

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const handleLogout = () => {
        auth.signOut();
    };

    const handleDisplayNameChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleUpdateProfile = async () => {
        if (newDisplayName.trim()) {
            try {
                await updateProfile(user,{ displayName: newDisplayName });
                setUser({ ...user, displayName: newDisplayName });
                setEditingDisplayName(false);  // Close the edit mode after update
                setNewDisplayName('');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleChangePassword = async () => {
        if (newPassword.trim().length >= 6 && newPassword === confirmNewPassword) {
            try {
                // Re-authenticate user with the old password to allow password update
                const credential = EmailAuthProvider.credential(
                    user.email,
                    oldPassword
                );
                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, newPassword);
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setEditingPassword(false); // Close the password edit mode after update
                alert('Password updated successfully!');
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Password must be at least 6 characters long and the new passwords must match.');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardContent>
                            {/* Profile Header */}
                            <Box textAlign="center" mb={3}>
                                <Avatar
                                    src={user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000'}
                                    alt="Profile"
                                    sx={{ width: 120, height: 120, margin: '0 auto' }}
                                />
                                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mt: 2 }}>
                                    {user.displayName || 'Anonymous User'}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {user.email}
                                </Typography>
                            </Box>

                            <Divider sx={{ marginBottom: 2 }} />

                            {/* User Info */}
                            <Box mb={2}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>UID:</Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
                                    {user.uid}
                                </Typography>

                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email:</Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
                                    {user.email}
                                </Typography>
                            </Box>

                            {/* Update Display Name */}
                            {!editingDisplayName ? (
                                <Box mb={2}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => setEditingDisplayName(true)}
                                    >
                                        Edit Display Name
                                    </Button>
                                </Box>
                            ) : (
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        value={newDisplayName}
                                        onChange={handleDisplayNameChange}
                                        label="New Display Name"
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdateProfile}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ mt: 2 }}
                                        onClick={() => setEditingDisplayName(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            )}

                            {/* Change Password */}
                            {!editingPassword ? (
                                <Box mb={2}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setEditingPassword(true)}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            ) : (
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        value={oldPassword}
                                        onChange={handleOldPasswordChange}
                                        label="Old Password"
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        type="password"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        label="New Password"
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={handleConfirmNewPasswordChange}
                                        label="Confirm New Password"
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleChangePassword}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ mt: 2 }}
                                        onClick={() => setEditingPassword(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            )}

                            {/* Error Messages */}
                            {error && (
                                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                                    {error}
                                </Typography>
                            )}

                            {/* Logout Button */}
                            <Box textAlign="center" mt={3}>
                                <Button variant="contained" color="primary" size="large" onClick={handleLogout}>
                                    Log out
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;
