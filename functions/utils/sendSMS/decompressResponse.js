import { gunzip } from 'zlib';

// Function to decompress the response body
function decompressResponse(response) {
    return new Promise((resolve, reject) => {
        const contentEncoding = response.headers['content-encoding'];

        // Collect the response data as a Buffer
        const chunks = [];
        response.body.on('data', chunk => chunks.push(chunk));
        response.body.on('end', () => {
            const rawBody = Buffer.concat(chunks);

            if (contentEncoding === 'gzip') {
                // Decompress the body if it's gzip-encoded
                gunzip(rawBody, (err, decompressedBody) => {
                    if (err) {
                        reject('Error decompressing body: ' + err);
                    } else {
                        resolve(decompressedBody);
                    }
                });
            } else {
                // If the response is not gzipped, return it as-is
                resolve(rawBody);
            }
        });
        response.body.on('error', reject);
    });
}

export default decompressResponse;