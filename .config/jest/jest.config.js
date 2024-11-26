export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/.config/jest/jest.setup.mjs'],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '^@fontsource/(.*)$': 'identity-obj-proxy',
        '^firebase/functions$': '<rootDir>/__mocks__/firebaseFunctionsMock.js',
        '^firebase/(.*)$': '<rootDir>/__mocks__/firebase.js',
    },

    transform: {
        '^.+\\.(js|jsx|mjs|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!@firebase)', // Add any other modules that need to be transformed
        'node_modules/(?!@fontsource)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
    extensionsToTreatAsEsm: ['.jsx'],
};