import {alpha, createTheme} from '@mui/material/styles';
import {lighten} from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        customBlue: {
            main: '#3A4F8B',
            light: '#536BAE',
            dark: "#FFFFFF",//lighten('#283A67', 0.4),
            darker: '#0069B1',
        },
        menu: {
            background:alpha('#536BAE', 0.9),
            dark: lighten('#283A67', 0.7),
        },
        background: {
            default: '#E3F6FC',
            paper: '#C8FFFF',
        },
        primary: {
            main: '#00C2FF',
            contrastText: '#000000',
        },
        secondary: {
            main: '#58A5F5',
            contrastText: '#0069B1',
        },
        fancy: {
            main: '#0069B1',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#004C6D',
            secondary: '#1A74A5',
        },
    },
    typography: {
        fontFamily: 'Tahoma, sans-serif',
        h1: {
            fontFamily: '"Arial Black", sans-serif',
            fontSize: '28pt',
            fontWeight: 'bold',
            color: '#0069B1',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        },
        h2: {
            fontSize: '24pt',
            fontWeight: 600,
            color: '#00C2FF',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.8,
            color: '#004C6D',
        },
        body2: {
            fontSize: '0.9rem',
            color: '#1A74A5',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    backgroundColor: 'transparent',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 20px',
                    textTransform: 'none',
                    backgroundColor: '#00C2FF',
                    color: '#FFFFFF',
                    boxShadow: '0px 4px 8px rgba(0, 194, 255, 0.3)',
                    '&:hover': {
                        backgroundColor: '#58A5F5',
                        boxShadow: '0px 6px 12px rgba(88, 165, 245, 0.5)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#C8FFFF',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#0069B1',
                },
                h2: {
                    fontSize: '20pt',
                    fontWeight: '600',
                    color: '#00C2FF',
                },
                body1: {
                    fontSize: '1rem',
                    color: '#004C6D',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#E3F6FC',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#58A5F5',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00C2FF',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0069B1',
                        boxShadow: '0px 0px 8px rgba(0, 105, 177, 0.4)',
                    },
                },
            },
        },
        // Department card custom styles
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#C8FFFF', // Soft pastel cyan for card background
                    borderRadius: '12px', // Border radius from theme
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                    padding: '20px', // Inner padding for content
                    margin: '16px', // Margin around the card
                    transition: 'all 0.3s ease', // Smooth transition for hover effects
                    '&:hover': {
                        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
                        //backgroundColor: '#E3F6FC', // Lighter background on hover
                    },
                },
            },
        },
        // Add any additional styles for specific components
    },
    customStyles: {
        departmentCardOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: 100,
            width: 100,
        },
        departmentCardChiefBox: {
            backgroundColor: '#B0BEC5',
            padding: '10px',
            borderRadius: '10px',
            marginTop: '10px',
        },
        departmentCardChiefText: {
            fontWeight: 'bold',
            color: '#37474f',
        },
    },
});
