const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

const generateSitemap = async () => {
    // Use dynamic import for the ES Module
    const { default: routes } = await import('../src/Routes.js'); // Import the default export dynamically

    const smStream = new SitemapStream({ hostname: 'https://ioannina-scouts.gr/' });

    routes.forEach(({ path }) => {
        smStream.write({
            url: path === '/' ? '/' : path, // Normalize root path
            changefreq: 'weekly', // Customize frequency as needed
            priority: path === '/' ? 1.0 : 0.7, // Set priority based on importance
        });
    });

    smStream.end();

    const sitemap = await streamToPromise(smStream).then((data) => data.toString());
    createWriteStream(resolve('./dist/sitemap.xml')).write(sitemap);
    console.log('Sitemap successfully created!');
};

generateSitemap().catch(console.error);
