import React, {useEffect, useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import axios from 'axios';
import {useTheme} from "@mui/styles";
import {alpha} from "@mui/material/styles";
import PropTypes from "prop-types";
/**
 * Handle the deletion of a gallery folder.
 * @param {string} folderId - The ID of the folder to delete.
 */
const LightboxGallery = ({folderId, onClose}) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    const theme = useTheme();

    const getImageNameFromSrc = (src) => {
        return src.split('/').pop();
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`/api/listImages.php?folderId=${folderId}`);
                const imageUrls = Object.values(response.data).map(url => ({src: url, alt: url.split('/').pop()}));
                setImages(imageUrls);
            } catch (error) {
                setError('Error fetching images: ' + error.message);
            }
        };

        fetchImages();
    }, [folderId]);

    if (!isOpen) {
        onClose();
        return null;
    }

    return (
            <div>
                {error && <div style={{color: 'red'}}>{error}</div>}
                {isOpen && images.length > 0 && (
                        <Lightbox
                                open={isOpen}
                                close={() => {
                                    setIsOpen(false);
                                    onClose();
                                }}
                                slides={images}
                                index={photoIndex}
                                carousel={{
                                    onPrev: () => setPhotoIndex((photoIndex + images.length - 1) % images.length),
                                    onNext: () => setPhotoIndex((photoIndex + 1) % images.length),
                                }}
                                render={{
                                    slide: ({slide}) => (
                                            <div style={{
                                                position: 'relative',
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: alpha(theme.palette.background.default, 0.7),
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <div style={{
                                                    position: 'relative',
                                                }}>
                                                    <img
                                                            src={slide.src}
                                                            alt={getImageNameFromSrc(slide.src)}
                                                            style={{width: '100%', height: 'auto'}}
                                                    />
                                                    {slide.description && (
                                                            <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        bottom: 0,
                                                                        width: '100%',
                                                                        background: 'rgba(0, 0, 0, 1)',
                                                                        color: '#fff',
                                                                        padding: '10px',
                                                                        textAlign: 'center',
                                                                    }}
                                                            >
                                                                {slide.description}
                                                            </div>
                                                    )}
                                                </div>
                                            </div>
                                    ),
                                }}
                        />
                )}
            </div>
    );
};

LightboxGallery.propTypes = {
    folderId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LightboxGallery;