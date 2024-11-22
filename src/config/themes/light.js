import {createTheme} from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#DCEEFB',  // Soft blue background for the main app
            paper: '#FFFFFF',    // White paper for content cards and dialogs
        },
        primary: {
            main: '#0074D9',      // Bright blue for primary elements
            contrastText: '#000000', // White text for better contrast
        },
        secondary: {
            main: '#005BB5',      // Darker blue for secondary elements
            contrastText: '#FFFFFF', // White text for contrast
        },
        fancy: {
            main: '#003F88',      // Deep navy blue for highlights
            contrastText: '#FFFFFF', // White for clarity
        },
        text: {
            primary: '#002B4E',    // Dark navy for readable text
            secondary: '#4B6478',  // Muted blue-gray for secondary text
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", sans-serif', // Modern sans-serif fonts
        h1: {
            fontFamily: '"Poppins", sans-serif',
            fontSize: '2.5rem',
            color: '#005BB5', // Darker blue for headers
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            color: '#0074D9', // Bright blue for secondary headers
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.75,
            color: '#002B4E',  // Navy blue for main text
        },
        body2: {
            fontSize: '0.875rem',
            color: '#4B6478',    // Muted gray-blue for secondary text
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#005BB5', // Dark blue for the navbar
                    color: '#FFFFFF', // White text for contrast
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 20px',
                    textTransform: 'none',
                    backgroundColor: '#0074D9',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#005BB5', // Darker blue on hover
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: '64px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#BDBDBD',
                        },
                        '&:hover fieldset': {
                            borderColor: '#0074D9', // Bright blue for hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#005BB5', // Darker blue for focus
                        },
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#005BB5',
                },
                h2: {
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: '#0074D9',
                },
                body1: {
                    fontSize: '1rem',
                    color: '#002B4E',
                },
            },
        },
    },
});