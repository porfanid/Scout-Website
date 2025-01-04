import PushBullet from 'pushbullet'
import decompressResponse from "./decompressResponse.js";
import {defineString} from "firebase-functions/params"; // Import the helper function

const pushBulletKey = defineString('PUSHBULLET');

async function getDevices(pusher) {
    try {
        const response = await pusher.devices(); // Retrieve all devices

        // Use the decompressResponse function to handle gzip decompression automatically
        const decompressedBody = await decompressResponse(response);

        // Parse the JSON response after decompression
        const data = JSON.parse(decompressedBody.toString()).devices;
        return data.map(device => {
            if (device.type === "android") {
                return device.iden
            }
        });
    } catch (error) {
        console.error('Error retrieving devices:', error);
    }
}

export async function sendSMS(to, message) {
    let pusher = new PushBullet(pushBulletKey.value());
    const devices = await getDevices(pusher);
    const device = devices[0]; // Get the first device
    const response = await pusher.createText(device, to, message, {});
    const decompressedBody = await decompressResponse(response);
    return decompressedBody.toString();
}
