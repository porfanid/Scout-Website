//IGAANfrB17XU9BZAE1QVU9aNklIYWlIcmhZARDRCaFI5UHhXZAGZAnZAExTOFBSUUoxaU5iRnU2MWN1RVlRc05VU0hhajQ5TzhWbVd3dXRKVEhiaVh1SzBQMkp2ZAW05RXJ3ZA3Y3cDRjSEtnbUVRc0J6VkFMSXVadzAzXzVXQnBlNkVPTQZDZD

import React, { useEffect, useState } from 'react';
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Paper,
    Button,
    Divider,
    Grid2 as Grid,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderUpload from './FolderUpload';
import LightboxGallery from './LightboxGallery';
import axios from 'axios';
import {fetchUserRole} from "../auth/check_permission.js";


/**
 * Gallery component that displays a collection of event galleries.
 * Allows admin users to upload new events and delete existing ones.
 * @returns {JSX.Element} The rendered Gallery component.
 */
const Gallery = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const [tagembedCode] = useState("2145372");//"ioannina-scouts")

    useEffect(() => {
        const fetchGallery = async () => {
            const querySnapshot = await getDocs(collection(db, 'gallery'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGalleryData(data);
        };

        fetchGallery();
    }, []);


    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://widget.tagembed.com/embed.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            fetchUserRole(
                    user,
                    ["admin"],
                    (loading)=>{return loading},
                    (loading)=>{return loading},
                    (link)=>{return link},
                    (role) => console.log(role)
            ).then((response)=>{
                setIsAdmin(response);
            });
        });
    }, []);

    /**
     * Handle the deletion of a gallery folder.
     * @param {string} folderId - The ID of the folder to delete.
     */
    const handleDelete = async (folderId) => {
        try {
            // Delete the folder from the server
            const response = await axios.post('/api/delete.php', new URLSearchParams({ folderName: folderId }));

            // Delete the document from Firestore
            await deleteDoc(doc(db, 'gallery', folderId));
            console.log(response.data);

            // Update the local state
            setGalleryData(galleryData.filter(item => item.id !== folderId));
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    return (
            <Box sx={{p: 4}}>
                <Typography variant="h3" gutterBottom align="center" sx={{fontWeight: 'bold'}}>
                    Event Gallery
                </Typography>
                <Typography variant="body1" align="center" sx={{mb: 4, color: 'text.secondary'}}>
                    Explore past events and their memorable moments below.
                </Typography>

                {isAdmin && (
                        <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    mb: 4,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                }}
                        >
                            <Typography variant="h5" gutterBottom>
                                Admin: Upload New Event
                            </Typography>
                            <FolderUpload/>
                        </Paper>
                )}

                <Divider sx={{my: 4}}/>

                <Grid container spacing={4}>
                    {galleryData.map((item) => (
                            <Grid size={{xs: 12, md: 4, sm: 6}} xs={12} sm={6} md={4} key={item.id}>
                                <Card
                                        elevation={3}
                                        sx={{
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
                                            },
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                >
                                    <CardMedia
                                            component="img"
                                            height="200"
                                            image={`/gallery/${item.id}/${item.previewImage}`}
                                            alt={item.title}
                                            sx={{
                                                borderTopLeftRadius: '4px',
                                                borderTopRightRadius: '4px',
                                            }}
                                    />
                                    <CardContent sx={{textAlign: 'center', flexGrow: 1}}>
                                        <Typography variant="h6" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.date}
                                        </Typography>
                                        <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{mt: 1}}
                                        >
                                            {item.description}
                                        </Typography>
                                        <Button
                                                size="small"
                                                variant="outlined"
                                                color="secondary"
                                                sx={{mt: 2}}
                                                onClick={() => {
                                                    console.log('Selected Folder ID:', item.id);
                                                    setSelectedFolderId(item.id)
                                                }}
                                        >
                                            View Details
                                        </Button>
                                        {isAdmin && (
                                                <IconButton
                                                        aria-label="delete"
                                                        color="error"
                                                        onClick={() => handleDelete(item.id)}
                                                        sx={{mt: 2}}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                    ))}

                    <div className="tagembed-widget" style={{width:"100%", height:"100%"}} data-widget-id={tagembedCode}
                         data-tags="false" view-url={`https://widget.tagembed.com/${tagembedCode}`}></div>

                </Grid>

                {selectedFolderId && (
                        <LightboxGallery
                                folderId={selectedFolderId}
                                onClose={() => setSelectedFolderId(null)}
                        />
                )}
            </Box>
    );
};

export {Gallery};