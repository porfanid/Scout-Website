import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Ensure the firebase config is correct
import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Button,
    Box,
    Grid2,
    Divider,
    TextField,
} from '@mui/material';
import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
} from 'firebase/auth';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [editingDisplayName, setEditingDisplayName] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const db = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                setUserData(userDoc.exists() ? userDoc.data() : null);
            }
        });

        return () => unsubscribe();
    }, [db]);

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

    const handleUpdateDisplayName = async () => {
        if (newDisplayName.trim()) {
            try {
                await updateDoc(doc(db, 'users', user.uid), { displayName: newDisplayName });
                setUserData((prev) => ({ ...prev, displayName: newDisplayName }));
                setEditingDisplayName(false);
                setNewDisplayName('');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleChangePassword = async () => {
        if (newPassword.trim().length >= 6 && newPassword === confirmNewPassword) {
            try {
                const credential = EmailAuthProvider.credential(user.email, oldPassword);
                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, newPassword);
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setEditingPassword(false);
                alert('Password updated successfully!');
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Passwords must match and be at least 6 characters.');
        }
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(fileRef, file);
            const photoURL = await getDownloadURL(fileRef);

            await updateDoc(doc(db, 'users', user.uid), { photoURL });
            setUserData((prev) => ({ ...prev, photoURL }));
        } catch (error) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    };

    if (!user || !userData) {
        return <div>Loading...</div>;
    }

    return (
            <Box
                    sx={{
                        minHeight: '100vh',
                        padding: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
            >
                <Grid2 container justifyContent="center">
                    <Grid2 item xs={12} sm={8} md={6}>
                        <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 6,
                                    overflow: 'hidden',
                                }}
                        >
                            <CardContent>
                                <Box textAlign="center" mb={3}>
                                    <Avatar
                                            src={userData.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000'}
                                            alt="Profile"
                                            sx={{
                                                width: 140,
                                                height: 140,
                                                margin: '0 auto',
                                                border: '4px solid #3f51b5',
                                            }}
                                    />
                                    <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 'bold',
                                                mt: 2,
                                            }}
                                    >
                                        {userData.displayName || 'Anonymous User'}
                                    </Typography>
                                    <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ mb: 1 }}
                                    >
                                        {user.email}
                                    </Typography>
                                    <Button
                                            variant="outlined"
                                            component="label"
                                            sx={{
                                                mt: 2,
                                                borderColor: '#3f51b5',
                                            }}
                                    >
                                        {uploading ? 'Uploading...' : 'Change Profile Picture'}
                                        <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={handleProfilePictureChange}
                                        />
                                    </Button>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                {!editingDisplayName ? (
                                        <Button
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#3f51b5',
                                                    mb: 2,
                                                }}
                                                onClick={() => setEditingDisplayName(true)}
                                        >
                                            Edit Display Name
                                        </Button>
                                ) : (
                                        <Box mb={3}>
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
                                                    sx={{ backgroundColor: '#3f51b5', mb: 2 }}
                                                    onClick={handleUpdateDisplayName}
                                            >
                                                Save Changes
                                            </Button>
                                            <Button
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ backgroundColor: '#e53935' }}
                                                    onClick={() => setEditingDisplayName(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                )}

                                {!editingPassword ? (
                                        <Button
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#3f51b5',
                                                    mb: 2,
                                                }}
                                                onClick={() => setEditingPassword(true)}
                                        >
                                            Change Password
                                        </Button>
                                ) : (
                                        <Box mb={3}>
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
                                                    sx={{ backgroundColor: '#3f51b5', mb: 2 }}
                                                    onClick={handleChangePassword}
                                            >
                                                Save Changes
                                            </Button>
                                            <Button
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ backgroundColor: '#e53935' }}
                                                    onClick={() => setEditingPassword(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                )}

                                {error && (
                                        <Typography
                                                variant="body2"
                                                color="error"
                                                sx={{ mt: 2, textAlign: 'center' }}
                                        >
                                            {error}
                                        </Typography>
                                )}

                                <Box textAlign="center" mt={3}>
                                    <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#e53935',
                                                color: '#ffffff',
                                                fontWeight: 'bold',
                                                px: 4,
                                            }}
                                            onClick={handleLogout}
                                    >
                                        Log Out
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Box>
    );
};

export default ProfilePage;
