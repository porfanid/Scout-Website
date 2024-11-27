module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { node: 'current' },
                modules: false, // Keep ESM imports
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-import-meta', // This enables `import.meta`
    ],
};
