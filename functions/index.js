/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const functions = require('firebase-functions');

const nodemailer = require('nodemailer');
const { defineInt, defineString } = require('firebase-functions/params');

const email_user_name = defineString('EMAIL_USER_NAME');
const email_password = defineString('EMAIL_PASSWORD');

// Configure nodemailer with your SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'webmail.ioannina-scouts.gr', // Replace with your SMTP server
    port: 587, // Replace with your SMTP port
    secure: false, // Use true for 465, false for other ports
    auth: {
        user: email_user_name,
        pass: email_password,
    },
});





exports.sendContactMessage = onCall(async (request, context) => {
    const { name, email, message } = request.data;

    console.log("Sending contact message:", { name, email, message });

    // Validate user input
    if (!name || !email || !message) {
        throw new HttpsError('invalid-argument', 'All fields are required');
    }

    const mailOptions = {
        from: `noreply<noreply@ioannina-scouts.gr>`,
        to: '1ioaninon@sep.org.gr', // Replace with your recipient email
        subject: `Νέο Μήνυμα από ${name} <${email}>`,
        replyTo: `${email}`,
        text: `
        Λάβατε νέο μήνυμα!

        **Sender Information:**
        - **Όνομα:** ${name}
        - **Email:** ${email}

        **Μήνυμα:**
        ${message}

        Σε περίπτωση που θέλετε να απαντήσετε, μπορείτε να απαντήσετε κατευθείαν σε αυτό το μήνυμα.
    `,
    };


    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Message sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new HttpsError('internal', 'Failed to send message. Please try again later.');
    }
});