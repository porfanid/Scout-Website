import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        customBlue: {
            main: '#3A4F8B', // Blueish main color
            light: '#536BAE', // Lighter shade for hover effects
            dark: '#283A67',  // Darker shade for contrast
            darker: '#0069B1'
        },
        background: {
            default: '#E3F6FC', // Light whitish-cyan for the main background
            paper: '#C8FFFF',   // Soft pastel cyan for content areas
        },
        primary: {
            main: '#00C2FF',    // Vibrant cyan for primary elements
            contrastText: '#FFFFFF', // White for better contrast
        },
        secondary: {
            main: '#58A5F5',    // Blue for secondary elements
            contrastText: '#0069B1', // Deep blue for better readability
        },
        fancy: {
            main: '#0069B1',    // Deep blue for accents
            contrastText: '#FFFFFF', // White for readability
        },
        text: {
            primary: '#004C6D', // Darker blue for main text
            secondary: '#1A74A5', // Slightly muted blue for secondary text
        },
    },
    typography: {
        fontFamily: 'Tahoma, sans-serif', // Clean and modern font
        h1: {
            fontFamily: '"Arial Black", sans-serif',
            fontSize: '28pt',
            fontWeight: 'bold',
            color: '#0069B1', // Deep blue for headers
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', // Subtle shadow
        },
        h2: {
            fontSize: '24pt',
            fontWeight: '600',
            color: '#00C2FF', // Vibrant cyan for secondary headers
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.8,
            color: '#004C6D', // Darker blue for body text
        },
        body2: {
            fontSize: '0.9rem',
            color: '#1A74A5', // Muted blue for secondary text
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#0069B1', // Deep blue for the app bar
                    color: '#FFFFFF',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 20px',
                    textTransform: 'none',
                    backgroundColor: '#00C2FF', // Vibrant cyan for buttons
                    color: '#FFFFFF',
                    boxShadow: '0px 4px 8px rgba(0, 194, 255, 0.3)', // Subtle glow
                    '&:hover': {
                        backgroundColor: '#58A5F5', // Blue on hover
                        boxShadow: '0px 6px 12px rgba(88, 165, 245, 0.5)', // Enhanced glow
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#C8FFFF', // Soft pastel cyan for cards/dialogs
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#0069B1', // Deep blue for headers
                },
                body1: {
                    fontSize: '1rem',
                    color: '#004C6D', // Darker blue for body text
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#E3F6FC', // Light whitish-cyan for input background
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#58A5F5', // Blue border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00C2FF', // Cyan on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0069B1', // Deep blue border on focus
                        boxShadow: '0px 0px 8px rgba(0, 105, 177, 0.4)', // Fancy glow
                    },
                },
            },
        },
    },
});
