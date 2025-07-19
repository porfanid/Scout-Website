import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Modal,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import GoogleDriveFilePicker from '../components/GoogleDriveFilePicker';

const EditEventModal = ({ open, handleClose, editEvent, handleInputChange, labels }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [error, setError] = useState(null);
    const [attachedFiles, setAttachedFiles] = useState([]);

    // Initialize attached files when editEvent changes
    useEffect(() => {
        if (editEvent && editEvent.attachments) {
            setAttachedFiles(editEvent.attachments);
        } else {
            setAttachedFiles([]);
        }
    }, [editEvent]);

    const handleConfirmOpen = () => setConfirmOpen(true);
    const handleConfirmClose = () => setConfirmOpen(false);

    const handleUpdateEvent = async () => {
        try {
            const updatedEventData = {
                title: editEvent.title,
                start: new Date(editEvent.start),
                end: new Date(editEvent.end),
                label: editEvent.label,
                attachments: attachedFiles.length > 0 ? attachedFiles : null
            };

            if (!updatedEventData.title || !updatedEventData.start || !updatedEventData.end || !updatedEventData.label) {
                setError('All fields are required.');
                return;
            }

            await updateDoc(doc(db, 'events', editEvent.id), updatedEventData);
            handleClose();
        } catch (err) {
            console.error('Error updating event:', err);
            setError('Failed to update event. Please try again later.');
        }
    };

    const handleDeleteEvent = async () => {
        try {
            await deleteDoc(doc(db, 'events', editEvent.id));
            handleClose();
        } catch (err) {
            console.error('Error deleting event:', err);
            setError('Failed to delete event. Please try again later.');
        }
    };

    const handleConfirmDelete = () => {
        handleDeleteEvent();
        handleConfirmClose();
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2">Edit Event</Typography>
                    <TextField
                        label="Title"
                        name="title"
                        value={editEvent.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Start Date"
                        name="start"
                        type="date"
                        value={editEvent.start}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="End Date"
                        name="end"
                        type="date"
                        value={editEvent.end}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Label</InputLabel>
                        <Select
                            name="label"
                            value={editEvent.label}
                            onChange={handleInputChange}
                        >
                            {labels.map((label) => (
                                <MenuItem key={label.id} value={label.id}>{label.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    {/* Google Drive File Picker */}
                    <GoogleDriveFilePicker
                        onFilesSelected={setAttachedFiles}
                        selectedFiles={attachedFiles}
                        maxFiles={3}
                    />
                    
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{
                                mt: 2,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            {error}
                        </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleUpdateEvent}>Update Event</Button>
                        <Button variant="contained" color="error" onClick={handleConfirmOpen}>Delete Event</Button>
                    </Box>
                </Box>
            </Modal>
            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

EditEventModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    editEvent: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
        label: PropTypes.string
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    })).isRequired
};

export default EditEventModal;