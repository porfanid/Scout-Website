import {alpha, styled} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import bg from "./Pattern-PNG-Photos.png";
import ListItem from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";


export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    height: '80px',
    backdropFilter: 'blur(24px)',
    borderTop: '1px solid',
    borderLeft: '1px solid',
    borderRight: '1px solid',
    borderBottom: 'none',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    padding: '8px 12px'
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 15px',
    textTransform: 'none',
    padding: '3px 10px 3px 10px',
    minWidth: 'auto',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: "transparent",
        boxShadow: 'none',
        color: theme.palette.primary.main,
        transition: 'all 0.3s ease',
        transform: 'scale(1.1)'
    },
    '&:active': {
        color: theme.palette.primary.main,
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        color: theme.palette.primary.main,
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'width 0.3s ease',
    },
    '&:hover:after': {
        width: '100%',
    }
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '.MuiDrawer-paper': {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: '250px',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.customBlue.main,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[5],
        transition: 'transform 0.3s ease-in-out, background 0.3s ease-in-out',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.customBlue.dark, 0.5),
            zIndex: 1,
        },
        '& *': {
            position: 'relative',
            zIndex: 2,
        },
    },
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.customBlue.light, 0.8),
    margin: '8px auto',
    borderRadius: '20px',
    width: '80%',
    '&:hover': {
        backgroundColor: alpha(theme.palette.customBlue.main, 0.8),
        color: theme.palette.customBlue.dark,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'relative',
    zIndex: theme.zIndex.appBar,
    border: 'none',
    backgroundColor: theme.palette.customBlue.main,
    marginBottom: 0,
    paddingBottom: 0,
    boxShadow: 'none',
    height: '80px',
    width: '80%', // Default width
    [theme.breakpoints.down('md')]: {
        width: '100%', // 80% width on small screens and above
    },
}));

export const WaveContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    height: '80px',
    lineHeight: 0,
    zIndex: theme.zIndex.appBar - 1,
    margin: 0,
    padding: 0,
    overflow: "hidden"
}));

export const Wave = styled('svg')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '100%',
    animation: 'wave-animation 10s linear infinite',
    fill: alpha(theme.palette.customBlue.dark,0.4),
    zIndex: 11,
    '@keyframes wave-animation': {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
    },
}));