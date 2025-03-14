import React from 'react';
import { Box, Typography, Grid2, Link } from '@mui/material';
import ScoutLogo from './Navbar/logo.png';
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";


/**
 * Footer component for the website.
 * @param {Object} props - The component props.
 * @param {Function} props.toggleTheme - Function to toggle the website theme.
 * @param {Function} props.toggleLanguage - Function to toggle the website language.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = ({ toggleTheme, toggleLanguage }) => {
    return (
        <Box
            component="footer"
            sx={{
                padding: '40px',
                backgroundColor: '#1b1b1b',
                width: '100%',
                color: '#f0f0f0'// Ensure the footer spans the full width
            }}
        >
            <Grid2
                container
                justifyContent="space-between" // Distribute items across the full width
                alignItems="center"
                spacing={4}
            >
                {/* Column 1: Logo and Description */}
                <Grid2 size={{
                    xs: 12,
                    md: 4
                }} sx={{ textAlign: 'center' }}>
                    <img src={ScoutLogo} alt="Scout Logo" style={{ height: '80px', marginBottom: '10px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        1ο Σύστημα Προσκόπων Ιωαννίνων
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Εξερεύνηση, αλληλεγγύη, ηγεσία και δράση στην καρδιά της Ηπείρου.
                    </Typography>
                </Grid2>

                {/* Column 2: Navigation Links */}
                <Grid2 size={{
                    xs: 12,
                    md: 4
                }} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Χρήσιμοι Σύνδεσμοι
                    </Typography>
                    <NavLink style={{ color: "#FFFFFF", display: 'block', marginBottom: '8px' }} to="/about">
                        Σχετικά με εμάς
                    </NavLink>
                    <NavLink style={{ color: "#FFFFFF", display: 'block', marginBottom: '8px' }} to="/contact">
                        Επικοινωνία
                    </NavLink>
                    <NavLink
                        to="https://www.scout.org"
                        style={{ color: "#FFFFFF", display: 'block' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Παγκόσμιο Προσκοπικό Κίνημα
                    </NavLink>
                </Grid2>

                {/* Column 3: Contact Information */}
                <Grid2 size={{
                    xs: 12,
                    md: 4
                }} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Επικοινωνία
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        📍 Πινδάρου 9, Ιωάννινα
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        📞 Τηλέφωνο: <Link href="tel:+306946624436" color="inherit">694 662 4436</Link>
                    </Typography>
                    <Typography variant="body2">
                        📧 Email: <Link href="mailto:1ioaninon@sep.org.gr" color="inherit">1ioaninon@sep.org.gr</Link>
                    </Typography>
                </Grid2>
            </Grid2>

            {/* Bottom Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    borderTop: '1px solid #444',
                    marginTop: '30px',
                    paddingTop: '20px',
                }}
            >
                {/* Copyright and Creator */}
                <Typography variant="body2" sx={{ mt: 3, fontSize: '0.85rem' }}>
                    © {new Date().getFullYear()} 1ο Σύστημα Προσκόπων Ιωαννίνων. Όλα τα δικαιώματα κατοχυρωμένα.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontSize: '0.75rem' }}>
                    Created by Pavlos Orfanidis{' '}
                    <Link href="https://github.com/porfanid" color="inherit">github.com/porfanid</Link>
                </Typography>
            </Box>
        </Box>
    );
};

Footer.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
    toggleLanguage: PropTypes.func.isRequired,
};

export default Footer;
