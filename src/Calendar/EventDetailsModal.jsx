import React from 'react';
import { Box, Modal, Typography, IconButton, Divider } from '@mui/material';
import {
    Close as CloseIcon,
    Event as EventIcon,
    CalendarToday as CalendarTodayIcon,
    Label as LabelIcon
} from '@mui/icons-material';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

const EventDetailsModal = ({ open, handleClose, selectedEvent, getLabelName, theme }) => (
    <Modal open={open} onClose={handleClose}>
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 550,
                maxWidth: '90%',
                bgcolor: 'background.paper',
                color: '#E0E0E0',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                p: 4,
                borderRadius: '16px',
                backgroundImage: 'linear-gradient(to bottom, #3e3e3e, #232323)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    pb: 2,
                    mb: 3,
                }}
            >
                {selectedEvent && (
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center',
                            color: '#00e5ff',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <EventIcon sx={{ mr: 1 }} /> {selectedEvent.title}
                    </Typography>
                )}
                <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {selectedEvent ? (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            p: 2,
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <CalendarTodayIcon sx={{ mr: 2, color: '#ffab00' }} />
                        <Typography color={"#E0E0E0"} variant="body1">
                            <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            p: 2,
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <CalendarTodayIcon sx={{ mr: 2, color: '#ffab00' }} />
                        <Typography color={"#E0E0E0"} variant="body1">
                            <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            p: 2,
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <LabelIcon sx={{ mr: 2, color: '#76ff03' }} />
                        <Typography color={"#E0E0E0"} variant="body1">
                            <strong>Label:</strong> {getLabelName(selectedEvent.label)}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 3,
                        }}
                    >
                        <AddToCalendarButton
                            name={selectedEvent.title}
                            startDate={new Date(selectedEvent.start).toISOString()}
                            endDate={new Date(selectedEvent.end).toISOString()}
                            options={['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo']}
                            location=""
                            label="Add to Calendar"
                            lightMode={theme.palette.mode}
                            buttonStyle="round" // Optional for rounded styling
                        />
                    </Box>
                </>
            ) : (
                <Typography variant="body1" sx={{ color: '#bdbdbd' }}>
                    No event selected.
                </Typography>
            )}

            <Divider
                sx={{
                    mt: 4,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
            />
        </Box>
    </Modal>
);

export default EventDetailsModal;
