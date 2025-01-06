import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { db, auth } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Box, Typography, useTheme } from '@mui/material';
import { FancyBox, FancyButton, SkeletonLoader, Toolbar } from './StyledComponents';
import EventModal from './EventModal';
import EditEventModal from './EditEventModal';
import EventDetailsModal from './EventDetailsModal';
import LabelModal from './LabelModal';
import CustomEvent from './CustomEvent';
import {fetchUserRole} from "../auth/check_permission.js";

const localizer = momentLocalizer(moment);

function EventCalendar() {
    const [events, setEvents] = useState([]);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [open, setOpen] = useState(false);
    const [labelOpen, setLabelOpen] = useState(false);

    const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', label: '' });
    const theme = useTheme();

    const [editEventOpen, setEditEventOpen] = useState(false);
    const [editEvent, setEditEvent] = useState({ id: '', title: '', start: '', end: '', label: '' });


    const handleEditEventClose = () => setEditEventOpen(false);

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditEvent({ ...editEvent, [name]: value });
    };

    useEffect(() => {
        const fetchLabels = async () => {
            try {
                const labelsCollection = collection(db, 'labels');
                onSnapshot(labelsCollection, (snapshot) => {
                    const labelsList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLabels(labelsList);
                });
            } catch (err) {
                setError('Failed to load labels. Please try again later.');
            }
        };

        fetchLabels();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsCollection = collection(db, 'events');
                onSnapshot(eventsCollection, (snapshot) => {
                    const eventsList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        start: new Date(doc.data().start.seconds * 1000),
                        end: new Date(doc.data().end.seconds * 1000)
                    }));
                    setEvents(eventsList);
                });
            } catch (err) {
                setError('Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            fetchUserRole(
                    user,
                    ["admin"],
                    setLoading,
                    setError,
                    (link)=>{return link},
                    (role) => console.log(role)
            ).then((response)=>{
                setIsAdmin(response);
            });
        });
    }, []);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLabelOpen = () => setLabelOpen(true);
    const handleEventDetailsClose = () => setEventDetailsOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };





    const handleEventClick = (event) => {
        setSelectedEvent(event);

        if (isAdmin) {
            setEventDetailsOpen(true);
            //handleEditEventOpen(event);
        } else {
            setEventDetailsOpen(true);
        }
    };

    const getLabelName = (labelId) => {
        const label = labels.find(label => label.id === labelId);
        return label ? label.name : '';
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <SkeletonLoader>
                    <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', width: '60%', height: '2rem', backgroundColor: theme.palette.action.hover }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, width: '100%' }}>
                        <FancyButton variant="contained" color="primary" sx={{ width: '30%', height: '3rem', backgroundColor: theme.palette.action.hover }} />
                        <FancyButton variant="contained" color="secondary" sx={{ width: '30%', height: '3rem', backgroundColor: theme.palette.action.hover }} />
                    </Box>
                    <Box sx={{
                        height: { xs: '400px', sm: '500px', md: '600px', lg: '700px' },
                        width: '100%',
                        backgroundColor: theme.palette.action.hover,
                    }} />
                </SkeletonLoader>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: 2,
            paddingTop: 4,
        }}>
            <FancyBox>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Scout Events Calendar
                </Typography>
                {isAdmin && <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <FancyButton variant="contained" color="primary" onClick={handleOpen}>Add Event</FancyButton>
                    <FancyButton variant="contained" color="primary" onClick={handleLabelOpen}>Manage Labels</FancyButton>
                </Box>}
                <Box sx={{
                    height: { xs: '400px', sm: '500px', md: '600px', lg: '700px' },
                    width: '100%',
                    color: theme.palette.primary.contrastText,
                    fontSize: '1.1rem',
                    position: 'relative',

                    '& .rbc-month-view': {
                        border: `2px solid ${theme.palette.divider}`,
                        borderRadius: '20px',
                    },
                    '& .rbc-header': {
                        borderBottom: `2px solid ${theme.palette.divider}`,
                    },
                    '& .rbc-day-bg': {
                        borderRight: `2px solid ${theme.palette.divider}`,
                    },
                    '& .rbc-date-cell': {
                        borderBottom: `2px solid ${theme.palette.divider}`,
                    },
                    '& .rbc-today': {
                        backgroundColor: theme.palette.action.selected,
                    },
                    '& .rbc-event': {
                        borderRadius: '8px',
                        padding: '2px 4px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    },
                    // Custom styles for the arrow buttons
                    '& .rbc-btn': {
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.palette.action.hover,
                        border: `2px solid ${theme.palette.divider}`,
                        transition: 'background-color 0.2s, transform 0.2s',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            transform: 'scale(1.1)', // Slight scale effect on hover
                        },
                        '& svg': {
                            fontSize: '1.5rem', // Adjust size of the arrows
                            color: theme.palette.primary.contrastText,
                        },
                    },
                    '& .rbc-btn-group': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}>

                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%', width: '100%', backgroundColor: 'transparent', color: theme.palette.primary.contrastText }}
                        components={{
                            toolbar: Toolbar,
                            event: (props) => <CustomEvent {...props} labels={labels} />
                        }}
                        onSelectEvent={handleEventClick}
                    />
                </Box>
            </FancyBox>

            <EventModal
                open={open}
                handleClose={handleClose}
                newEvent={newEvent}
                handleInputChange={handleInputChange}
                labels={labels}
            />

            <EditEventModal
                open={editEventOpen}
                handleClose={handleEditEventClose}
                editEvent={editEvent}
                handleInputChange={handleEditInputChange}
                labels={labels}
            />

            <EventDetailsModal
                open={eventDetailsOpen}
                handleClose={handleEventDetailsClose}
                selectedEvent={selectedEvent}
                getLabelName={getLabelName}
                theme={theme}
            />

            <LabelModal
                labels={labels}
                labelOpen={labelOpen}
                setLabelOpen={setLabelOpen}
            />
        </Box>
    );
}

export default EventCalendar;