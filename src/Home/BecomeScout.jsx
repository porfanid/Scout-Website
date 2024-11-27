import React from 'react';
import Background from './Background';
import Foreground from './Foreground.jsx';
import {Box} from "@mui/material";

const BecomeScout = () => {

    return (
            <Box
                    sx={{
                        position: 'relative',
                        padding: 4,
                        marginTop: 3,
                        textAlign: 'center',
                        borderRadius: 3,
                        overflow: 'hidden',
                    }}
            >
                <Background />
                <Foreground/>
            </Box>
    );


};

export default BecomeScout;
