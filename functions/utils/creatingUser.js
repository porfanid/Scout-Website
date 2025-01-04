import * as functions from "firebase-functions";
import admin from "firebase-admin";

export const setDefaultRole = functions.identity.beforeUserCreated(async (user) => {
    try {
        const uid = user.data.uid;
        const email = user.data.email;

        // Set the 'role' to 'viewer' for new user in Firestore
        await admin.firestore().collection('users').doc(uid).set({
            role: ['viewer'],
            email: email
        });

        console.log(`Successfully added role 'viewer' to user ${uid}`);
    } catch (error) {
        console.error('Error assigning role to new user:', error);
    }
})