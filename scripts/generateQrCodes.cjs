const admin = require("firebase-admin");
const QRCode = require("qrcode");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { createCanvas } = require("canvas");

// Initialize Firebase Admin SDK
const serviceAccount = require("./ioannina-scouts-firebase-adminsdk-g6qgn-7292ebf7c3.json");  // Replace with your service account path
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const generateFancyQRCode = async (url, label) => {
    try {
        // Generate a basic QR code (buffered)
        const qrCodeBuffer = await QRCode.toBuffer(url);

        // Resize the QR code to match the label's width (400px)
        const resizedQrCodeBuffer = await sharp(qrCodeBuffer)
            .resize(400) // Resize to match label width
            .toBuffer();

        // Create the label (chore name) on a canvas
        const canvasWidth = 400; // Width matches QR code
        const canvasHeight = 100; // Height for label
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext("2d");

        // Set label text properties
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(label, canvasWidth / 2, 30); // Position the label within the canvas

        // Convert the canvas to a buffer
        const labelBuffer = canvas.toBuffer("image/png");

        // Create a new image that will hold both the resized QR code and label
        const finalImage = await sharp({
            create: {
                width: canvasWidth,
                height: 400 + canvasHeight, // Height for both QR code and label
                channels: 4, // RGBA image
                background: { r: 255, g: 255, b: 255, alpha: 1 }, // White background
            },
        })
            .composite([
                {
                    input: resizedQrCodeBuffer,
                    top: 100, // Place resized QR code at the top
                    left: 0,
                },
                {
                    input: labelBuffer,
                    top: 50, // Place label below the QR code
                    left: 0,
                },
            ])
            .png()
            .toBuffer();



        // Save the final image to disk
        const fileName = `${label}.png`;
        await fs.promises.writeFile(path.join(__dirname, "qrcodes", fileName), finalImage);

        console.log(`QR Code saved: ${fileName}`);
        return path.join(__dirname, "qrcodes", fileName); // Return the saved file path
    } catch (err) {
        console.error("Error generating QR code:", err);
        throw new Error("Failed to generate fancy QR code");
    }
};

// Function to fetch chores from Firestore and generate QR codes
const generateChoreQRCodes = async () => {
    try {
        // Fetch chores from Firestore
        const choresRef = admin.firestore().collection("cleaning").doc("chores");
        const choresSnapshot = await choresRef.get();
        const choresData = choresSnapshot.data();

        if (!choresData) {
            console.log("No chores data found");
            return;
        }

        const chorePromises = [];
        for (const choreSet in choresData) {
            const choreSetData = choresData[choreSet];

            for (const choreId in choreSetData) {
                const chore = choreSetData[choreId];

                // Construct the URL for marking the chore as completed
                const choreUrl = `https://us-central1-ioannina-scouts.cloudfunctions.net/markChoreCompleted?choreId=${choreId}&choreSet=${choreSet}`;

                // Generate QR code with label (chore name)
                chorePromises.push(
                    generateFancyQRCode(choreUrl, chore.name).then((qrCodePath) => {
                        return {
                            choreSet,
                            choreId,
                            choreName: chore.name,
                            qrCodePath,
                        };
                    })
                );
            }
        }

        // Wait for all QR codes to be generated
        const qrCodeResults = await Promise.all(chorePromises);

        // Print results (paths to saved QR codes)
        qrCodeResults.forEach((result) => {
            console.log(`Generated QR Code for ${result.choreName}: ${result.qrCodePath}`);
        });
    } catch (err) {
        console.error("Error generating QR codes:", err);
    }
};

// Create the 'qrcodes' directory if it doesn't exist
fs.promises.mkdir(path.join(__dirname, "qrcodes"), { recursive: true })
    .then(() => {
        // Generate QR codes
        generateChoreQRCodes();
    })
    .catch((err) => {
        console.error("Error creating qrcodes directory:", err);
    });
