import React, { useState } from 'react';
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
    IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import GoogleDriveFilePicker from '../components/GoogleDriveFilePicker';

const EventModal = ({ open, handleClose, newEvent, handleInputChange, labels }) => {
    const [error, setError] = useState(null);
    const [attachedFiles, setAttachedFiles] = useState([]);

    const handleAddEvent = async () => {
        try {
            const newEventData = {
                title: newEvent.title,
                start: new Date(newEvent.start),
                end: new Date(newEvent.end),
                label: newEvent.label,
                attachments: attachedFiles.length > 0 ? attachedFiles : null
            };

            if (!newEventData.title || !newEventData.start || !newEventData.end || !newEventData.label) {
                setError('All fields are required.');
                return;
            }

            await addDoc(collection(db, 'events'), newEventData);
            setAttachedFiles([]); // Reset attachments
            handleClose();
        } catch (err) {
            console.error('Error adding event:', err);
            setError('Failed to add event. Please try again later.');
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 520,
                    p: 4,
                    bgcolor: '#1e1e2e',
                    color: '#f5f5f5',
                    borderRadius: '16px',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5)',
                }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#d9e0ee',
                            textTransform: 'uppercase',
                        }}
                    >
                        Add Event
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ color: '#cdd6f4' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Input Fields */}
                <TextField
                    label="Event Title"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                        backgroundColor: '#2c2f3b',
                        borderRadius: '8px',
                        input: { color: '#d9e0ee' },
                        label: { color: '#cdd6f4' },
                        '& .MuiOutlinedInput-root:hover': {
                            borderColor: '#7fbbb3',
                        },
                    }}
                />
                <TextField
                    label="Start Date"
                    name="start"
                    type="date"
                    value={newEvent.start}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        backgroundColor: '#2c2f3b',
                        borderRadius: '8px',
                        input: { color: '#d9e0ee' },
                        label: { color: '#cdd6f4' },
                    }}
                />
                <TextField
                    label="End Date"
                    name="end"
                    type="date"
                    value={newEvent.end}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        backgroundColor: '#2c2f3b',
                        borderRadius: '8px',
                        input: { color: '#d9e0ee' },
                        label: { color: '#cdd6f4' },
                    }}
                />
                <FormControl
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                        backgroundColor: '#2c2f3b',
                        borderRadius: '8px',
                        '.MuiInputLabel-root': { color: '#cdd6f4' },
                        '.MuiOutlinedInput-root': { color: '#d9e0ee' },
                        '.MuiSelect-icon': { color: '#cdd6f4' },
                        '.MuiSelect-root': { color: '#d9e0ee' },
                    }}
                >
                    <InputLabel>Label</InputLabel>
                    <Select
                        name="label"
                        value={newEvent.label}
                        onChange={handleInputChange}
                        label="Label"
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#2c2f3b',
                                    color: '#f5f5f5',
                                    '& .MuiMenuItem-root': {
                                        color: '#f5f5f5',
                                        '&:hover': {
                                            backgroundColor: '#44475a',
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: '#6272a4',
                                            '&:hover': {
                                                backgroundColor: '#555b7a',
                                            },
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        {labels.map((label) => (
                            <MenuItem
                                key={label.id}
                                value={label.id}
                                sx={{
                                    color: '#f5f5f5',
                                }}
                            >
                                {label.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Google Drive File Picker */}
                <GoogleDriveFilePicker
                    onFilesSelected={setAttachedFiles}
                    selectedFiles={attachedFiles}
                    maxFiles={3}
                />

                {/* Error Message */}
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

                {/* Add Event Button */}
                <Button
                    variant="contained"
                    onClick={handleAddEvent}
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.5,
                        backgroundColor: '#44475a',
                        color: '#f5f5f5',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                            backgroundColor: '#6272a4',
                        },
                    }}
                >
                    Add Event
                </Button>
            </Box>
        </Modal>
    );
};

EventModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    newEvent: PropTypes.shape({
        title: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
        label: PropTypes.string,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    labels: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
};

export default EventModal;
