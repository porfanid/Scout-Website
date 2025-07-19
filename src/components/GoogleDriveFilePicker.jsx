import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    IconButton,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    CloudDone as CloudDoneIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import {
    initializeGoogleAPI,
    signInToGoogle,
    openDrivePicker,
    isUserSignedIn
} from '../utils/googleDriveAPI';

// Environment variable helper for cross-environment compatibility
const getEnvVar = (key) => {
    // In Jest/Node environment
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key];
    }
    // In Vite/browser environment
    if (typeof window !== 'undefined' && window.__ENV) {
        return window.__ENV[key];
    }
    // Fallback for test mocking
    if (typeof global !== 'undefined' && global.__meta && global.__meta.env) {
        return global.__meta.env[key];
    }
    // Default (this will be replaced by Vite at build time)
    try {
        return import.meta.env[key];
    } catch {
        return undefined;
    }
};

const GoogleDriveFilePicker = ({ onFilesSelected, selectedFiles = [], maxFiles = 5 }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isApiReady, setIsApiReady] = useState(false);

    useEffect(() => {
        const initAPI = async () => {
            try {
                // Only initialize if API keys are available
                if (getEnvVar('VITE_GOOGLE_DRIVE_API_KEY') && getEnvVar('VITE_GOOGLE_DRIVE_CLIENT_ID')) {
                    await initializeGoogleAPI();
                    setIsApiReady(true);
                }
            } catch (err) {
                console.warn('Google Drive API not available:', err.message);
                setError('Google Drive integration is not configured');
            }
        };

        initAPI();
    }, []);

    const handleFilePicker = async () => {
        if (!isApiReady) {
            setError('Google Drive API is not ready');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Sign in if not already signed in
            if (!isUserSignedIn()) {
                await signInToGoogle();
            }

            // Open file picker
            const files = await openDrivePicker();
            
            if (files.length > 0) {
                const validatedFiles = files.slice(0, maxFiles - selectedFiles.length);
                onFilesSelected(validatedFiles);
            }
        } catch (err) {
            console.error('Google Drive picker error:', err);
            setError('Failed to access Google Drive. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFile = (fileToRemove) => {
        const updatedFiles = selectedFiles.filter(file => file.id !== fileToRemove.id);
        onFilesSelected(updatedFiles);
    };

    const openFileInNewTab = (file) => {
        window.open(file.viewUrl, '_blank');
    };

    // Don't render if API is not configured
    if (!getEnvVar('VITE_GOOGLE_DRIVE_API_KEY') || !getEnvVar('VITE_GOOGLE_DRIVE_CLIENT_ID')) {
        return null;
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#cdd6f4' }}>
                Google Drive Files (Optional)
            </Typography>
            
            {error && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={loading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    onClick={handleFilePicker}
                    disabled={loading || !isApiReady || selectedFiles.length >= maxFiles}
                    sx={{
                        backgroundColor: '#2c2f3b',
                        borderColor: '#44475a',
                        color: '#cdd6f4',
                        '&:hover': {
                            backgroundColor: '#44475a',
                            borderColor: '#6272a4',
                        },
                        '&:disabled': {
                            borderColor: '#44475a',
                            color: '#6c7086',
                        }
                    }}
                >
                    {loading ? 'Loading...' : 'Select from Google Drive'}
                </Button>
                
                {selectedFiles.length > 0 && (
                    <Typography variant="caption" sx={{ color: '#a6adc8' }}>
                        {selectedFiles.length}/{maxFiles} files selected
                    </Typography>
                )}
            </Box>

            {selectedFiles.length > 0 && (
                <Box sx={{ 
                    backgroundColor: '#2c2f3b', 
                    borderRadius: '8px', 
                    p: 2,
                    border: '1px solid #44475a'
                }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#cdd6f4' }}>
                        Selected Files:
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {selectedFiles.map((file) => (
                            <Box
                                key={file.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#44475a',
                                    borderRadius: '6px',
                                    p: 1.5,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <CloudDoneIcon sx={{ mr: 1, color: '#a3e635' }} />
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#cdd6f4', fontWeight: 'medium' }}>
                                            {file.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#a6adc8' }}>
                                            {file.mimeType} • {file.size ? `${Math.round(file.size / 1024)} KB` : 'Unknown size'}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => openFileInNewTab(file)}
                                        sx={{ color: '#74c0fc' }}
                                        title="View file"
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveFile(file)}
                                        sx={{ color: '#f38ba8' }}
                                        title="Remove file"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

GoogleDriveFilePicker.propTypes = {
    onFilesSelected: PropTypes.func.isRequired,
    selectedFiles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mimeType: PropTypes.string,
        url: PropTypes.string,
        downloadUrl: PropTypes.string,
        viewUrl: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        thumbnailUrl: PropTypes.string
    })),
    maxFiles: PropTypes.number
};

export default GoogleDriveFilePicker;