import {createTheme} from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1A1A2E', // Solid dark blue
            paper: '#262A46',  // Slightly lighter for content areas
        },
        primary: {
            main: '#4C8BF5',    // Vibrant blue
            contrastText: '#FFFFFF', // White for better contrast
        },
        secondary: {
            main: '#A0C4FF',    // Pastel blue for secondary elements
            contrastText: '#1A1A2E', // Darker text
        },
        fancy: {
            main: '#F5A623',    // Golden-orange for accents
            contrastText: '#1A1A2E', // Dark text for readability
        },
        text: {
            primary: '#EDEDED', // Softer white for text
            secondary: '#B0BEC5', // Muted gray for secondary text
        },
    },
    typography: {
        fontFamily: 'Tahoma, sans-serif', // Clean and modern font
        h1: {
            fontFamily: '"Arial Black", sans-serif',
            fontSize: '28pt',
            fontWeight: 'bold',
            color: '#A0C4FF', // Light pastel blue for headers
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)', // Fancy shadow for headers
        },
        h2: {
            fontSize: '24pt',
            fontWeight: '600',
            color: '#4C8BF5', // Vibrant blue for secondary headers
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.8,
            color: '#E0E0E0', // Soft white for body text
        },
        body2: {
            fontSize: '0.9rem',
            color: '#B0BEC5', // Muted gray for secondary text
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#1A1A2E',//'linear-gradient(90deg, #1A1A2E, #4C8BF5)', // Gradient applied via CSS
                    color: '#FFFFFF',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 20px',
                    textTransform: 'none',
                    backgroundColor: '#4C8BF5', // Vibrant blue for buttons
                    color: '#FFFFFF',
                    boxShadow: '0px 4px 8px rgba(76, 139, 245, 0.4)', // Glow effect
                    '&:hover': {
                        backgroundColor: '#3A73D0', // Slightly darker blue on hover
                        boxShadow: '0px 6px 12px rgba(58, 115, 208, 0.6)', // Enhanced glow
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#262A46', // Slightly lighter for cards/dialogs
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', // Subtle shadow
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#A0C4FF',
                },
                body1: {
                    fontSize: '1rem',
                    color: '#E0E0E0',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2A2A4E', // Dark input background
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4C8BF5', // Blue border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A0C4FF', // Lighter blue hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#F5A623', // Golden border on focus
                        boxShadow: '0px 0px 8px rgba(245, 166, 35, 0.5)', // Fancy glow
                    },
                },
            },
        },
    },
});