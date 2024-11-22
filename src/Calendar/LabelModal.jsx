import React, {useState} from 'react';
import { Box, Button, Typography, TextField, Modal } from '@mui/material';
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase.js";

const LabelModal = ({labels, labelOpen, setLabelOpen }) => {

    const [newLabel, setNewLabel] = useState({ id: '', name: '', color: '' });
    const handleEditLabel = (label) => {
        setNewLabel(label);
        setLabelOpen(true);
    };

    const handleLabelChange = (e) => {
        const { name, value } = e.target;
        setNewLabel({ ...newLabel, [name]: value });
    };

    const handleAddLabel = async () => {
        try {
            if (newLabel.id) {
                // Update existing label
                const labelDoc = doc(db, 'labels', newLabel.id);
                await updateDoc(labelDoc, {
                    name: newLabel.name,
                    color: newLabel.color
                });
            } else {
                // Add new label
                await addDoc(collection(db, 'labels'), {
                    name: newLabel.name,
                    color: newLabel.color
                });
            }
            setLabelOpen(false);
        } catch (err) {
            setError('Failed to save label. Please try again later.');
        }
    };
    return (
        <Modal open={labelOpen} onClose={()=>{setLabelOpen(false);}}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 420,
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
                    p: 4,
                    borderRadius: '16px',
                    backgroundImage: 'linear-gradient(to bottom right, #333, #111)',
                }}
            >
                {/* Modal Title */}
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        mb: 3,
                        fontWeight: 'bold',
                        color: '#fff',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                    }}
                >
                    Manage Labels
                </Typography>

                {/* Input for Label Name */}
                <TextField
                    label="Label Name"
                    name="name"
                    value={newLabel.name}
                    onChange={handleLabelChange}
                    fullWidth
                    margin="normal"
                    variant="filled"
                    sx={{
                        input: {color: '#fff'},
                        label: {color: '#bbb'},
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                    }}
                />

                {/* Input for Label Color */}
                <TextField
                    label="Label Color"
                    name="color"
                    type="color"
                    value={newLabel.color}
                    onChange={handleLabelChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                    sx={{
                        input: {height: 40, width: '100%', padding: '4px', cursor: 'pointer'},
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                    }}
                />

                {/* Add or Update Label Button */}
                <Button
                    variant="contained"
                    onClick={handleAddLabel}
                    sx={{
                        mt: 2,
                        width: '100%',
                        py: 1.5,
                        backgroundImage: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(33, 203, 243, 0.3)',
                        '&:hover': {
                            backgroundImage: 'linear-gradient(45deg, #21CBF3, #2196F3)',
                        },
                    }}
                >
                    {newLabel.id ? 'Update Label' : 'Add Label'}
                </Button>

                {/* Existing Labels List */}
                <Box sx={{mt: 3}}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            color: '#bbb',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Existing Labels
                    </Typography>
                    {labels.map((label) => (
                        <Box
                            key={label.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1.5,
                                p: 1.5,
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {/* Label Name */}
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        backgroundColor: label.color,
                                        mr: 2,
                                    }}
                                />
                                <Typography sx={{color: '#fff', fontWeight: 'bold'}}>{label.name}</Typography>
                            </Box>

                            {/* Edit Button */}
                            <Button
                                variant="outlined"
                                onClick={() => handleEditLabel(label)}
                                sx={{
                                    color: '#21CBF3',
                                    borderColor: '#21CBF3',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 203, 243, 0.1)',
                                    },
                                }}
                            >
                                Edit
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Modal>
    )
};

export default LabelModal;
