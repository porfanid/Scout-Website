import '@testing-library/jest-dom';

global.import = {
    meta: {
        env: {
            MODE: 'development', // or 'test', based on your setup
        },
    },
};
