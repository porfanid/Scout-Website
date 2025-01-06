import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography, TextField, Button, Alert, CircularProgress,
    Box, Paper, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFiles.length || !eventTitle || !eventDate || !eventDescription || !previewImage) {
            setError('Please fill in all fields and select files.');
            return;
        }

        setLoading(true);

        try {
            const docRef = await addDoc(collection(db, 'gallery'), {
                title: eventTitle,
                date: eventDate,
                description: eventDescription,
                previewImage,
            });

            const folderName = docRef.id;

            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files[]', selectedFiles[i]);
            }
            formData.append('folderName', folderName);

            await axios.post('/api/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            await updateDoc(doc(db, 'gallery', folderName), {
                previewImage,
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
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Event Title"
                        fullWidth
                        margin="normal"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Event Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Event Description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        required
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Select Files
                        <input
                            type="file"
                            webkitdirectory="true"
                            directory="true"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    {selectedFiles.length > 0 && (
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="preview-image-label">Select Preview Image</InputLabel>
                            <Select
                                labelId="preview-image-label"
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                                required>
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
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Folder'}
                    </Button>
                    {success && <Alert severity="success" sx={{ mt: 2 }}>Folder uploaded successfully!</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </form>
    );
};

export default FolderUpload;
