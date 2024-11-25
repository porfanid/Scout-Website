import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Alert, CircularProgress, Box, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';

const FolderUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleEventTitleChange = (event) => {
        setEventTitle(event.target.value);
    };

    const handleEventDateChange = (event) => {
        setEventDate(event.target.value);
    };

    const handleEventDescriptionChange = (event) => {
        setEventDescription(event.target.value);
    };

    const handlePreviewImageChange = (event) => {
        setPreviewImage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFiles.length || !eventTitle || !eventDate || !eventDescription || !previewImage) {
            setError('Please fill in all fields and select files.');
            return;
        }

        setLoading(true);

        try {
            // Save event details to Firestore and get the document ID
            const docRef = await addDoc(collection(db, 'gallery'), {
                title: eventTitle,
                date: eventDate,
                description: eventDescription,
                previewImage: previewImage
            });

            const folderName = docRef.id;

            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files[]', selectedFiles[i]);
            }
            formData.append('folderName', folderName);

            const response = await axios.post('/api/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);

            // Update Firestore document with the preview image name
            await updateDoc(doc(db, 'gallery', folderName), {
                previewImage: previewImage
            });

            setSuccess(true);
            setError(null);
            setEventTitle('');
            setEventDate('');
            setEventDescription('');
            setPreviewImage('');
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error uploading files:', error);
            setError('Error uploading files.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 1200, width: '100%' }}>
                <Typography variant="h4" gutterBottom>Upload Folder</Typography>
                <Typography variant="body1" gutterBottom>
                    Use the form below to upload a folder to the gallery.
                </Typography>
                <Grid2 container spacing={3} sx={{ display: 'flex', justifyContent: 'evenly' }}>
                    <Grid2
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: {
                                sm: '100%',
                                md: '40%',
                            },
                            marginRight: {
                                sm: 0,
                                md: '100px',
                            },
                        }}
                    >
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <TextField
                                label="Event Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={eventTitle}
                                onChange={handleEventTitleChange}
                                required
                            />
                            <TextField
                                label="Event Date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="date"
                                value={eventDate}
                                onChange={handleEventDateChange}
                                required
                                InputLabelProps={{
                                    shrink: true, // Ensure the label shrinks when a date is selected
                                }}
                            />
                            <TextField
                                label="Event Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={eventDescription}
                                onChange={handleEventDescriptionChange}
                                required
                            />
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Select Files
                                <input
                                    type="file"
                                    webkitdirectory="true"
                                    directory="true"
                                    multiple
                                    hidden
                                    onChange={handleFileChange}
                                    required
                                />
                            </Button>
                            {selectedFiles.length > 0 && (
                                <FormControl fullWidth sx={{ marginTop: 2 }}>
                                    <InputLabel id="preview-image-label">Select Preview Image</InputLabel>
                                    <Select
                                        labelId="preview-image-label"
                                        value={previewImage}
                                        onChange={handlePreviewImageChange}
                                        label="Select Preview Image"
                                        required
                                    >
                                        {Array.from(selectedFiles).map((file, index) => (
                                            <MenuItem key={index} value={file.name}>
                                                {file.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Folder'}
                            </Button>
                        </form>
                        {success && <Alert severity="success" sx={{ marginTop: 2 }}>The folder has been uploaded successfully!</Alert>}
                        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    );
};

export default FolderUpload;