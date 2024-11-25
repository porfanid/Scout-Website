import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Read the service account key JSON file
const serviceAccountPath = path.resolve('./ioannina-scouts-firebase-adminsdk-g6qgn-f625d59955.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'http://localhost:8080' // Use the Firestore emulator URL
});

const db = admin.firestore();
db.settings({
    host: 'localhost:8080',
    ssl: false
});

async function createUser() {
    const userId = 'EKHFtPI1o8a4G4rPY0hMcXVWHCw2';
    const userData = {
        role: 'admin',
        uid: userId
    };

    try {
        await db.collection('users').doc(userId).set(userData);
        console.log('User record created successfully');
    } catch (error) {
        console.error('Error creating user record:', error);
    }
}

createUser();