import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

const Background = () => {
    const boxRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });

    const circleAnimation = useSpring({
        loop: {reverse:true}, // Continuous looping
        from: { transform: 'translateY(-20px)' },
        to: { transform: `translateY(${dimensions.height}px)` },
        config: { duration: 3000 },
    });

    const rectAnimation = useSpring({
        loop: {reverse:true}, // Continuous looping
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(365deg)' },
        config: { duration: 3000 },
    });

    const polygonAnimation = useSpring({
        loop: {reverse:true}, // Continuous looping
        from: { transform: 'scale(1)' },
        to: { transform: 'scale(1.5)' },
        config: { duration: 3000 },
    });


    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                const { top, left } = entries[0].target.getBoundingClientRect();
                setDimensions({ width, height, top, left });
            }
        });

        if (boxRef.current) {
            resizeObserver.observe(boxRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    return (
            <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        pointerEvents: 'none',
                        overflow: 'hidden',
                    }}
                    ref={boxRef}
            >
                <animated.svg
                        width="300"
                        height="300"
                        style={{
                            position: 'absolute',
                            top: '-50px',
                            left: '-50px',
                            opacity: 0.7,
                            ...circleAnimation,
                        }}
                >
                    <circle cx="150" cy="150" r="120" fill="#FF6347" />
                </animated.svg>

                <animated.svg
                        width="200"
                        height="200"
                        style={{
                            position: 'absolute',
                            bottom: '-40px',
                            right: '-40px',
                            opacity: 0.7,
                            ...rectAnimation,
                        }}
                >
                    <rect width="200" height="200" fill="#FFD700" rx="20" />
                </animated.svg>

                <animated.svg
                        width="150"
                        height="150"
                        style={{
                            position: 'absolute',
                            top: '30%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotate(45deg)',
                            opacity: 0.7,
                            ...polygonAnimation,
                        }}
                >
                    <polygon points="75,0 150,150 0,150" fill="#4682B4" />
                </animated.svg>
            </Box>
    );
};

export default Background;