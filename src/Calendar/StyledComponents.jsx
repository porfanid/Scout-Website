import { Box, Button, styled } from '@mui/material';
import pattern1dark from './pattern1.jpg';
import pattern1light from './pattern1_light.png';
import {ArrowBack, ArrowForward} from "@mui/icons-material";

export const FancyBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
    },
    fontFamily: 'Roboto, sans-serif',
    backgroundImage: `url(${theme.palette.mode === "dark" ? pattern1dark : pattern1light})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '1200px',
}));

export const FancyButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    borderRadius: '8px',
    padding: '10px 20px',
    fontFamily: 'Montserrat, sans-serif',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export const FancyToolbar = styled('div')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    '& .toolbar-label': {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    '& .toolbar-buttons': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '& .prev-button': {
        left: '-50px',
    },
    '& .next-button': {
        right: '-50px',
    },
}));

const CircularButton = styled(Button)(({ theme }) => ({
    color: 'inherit',
    width: '50px',  // Set a fixed width
    height: '50px',  // Set a fixed height
    borderRadius: '50%',  // Make it circular
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,  // Remove padding to maintain perfect circle shape
    backgroundColor: "transparent",
    boxShadow: 'none',
    border: "none",//`2px solid ${theme.palette.divider}`,
    transition: 'background-color 0.2s, transform 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        transform: 'scale(1.1)',  // Slight scale effect on hover
    },
    '& svg': {
        fontSize: '1.5rem',  // Adjust size of the arrows
        color: theme.palette.primary.contrastText,
    },
}));



export const Toolbar = ({ label, onNavigate }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
        <CircularButton onClick={() => onNavigate('PREV')} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)' }}>
            <ArrowBack />
        </CircularButton>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{label}</span>
        <CircularButton onClick={() => onNavigate('NEXT')} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)' }}>
            <ArrowForward />
        </CircularButton>
    </div>
);


export const SkeletonLoader = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
    },
    fontFamily: 'Roboto, sans-serif',
    backgroundImage: `url(${theme.palette.mode === "dark" ? pattern1dark : pattern1light})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));