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

// Configure nodemailer with your SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'webmail.ioannina-scouts.gr', // Replace with your SMTP server
    port: 587, // Replace with your SMTP port
    secure: false, // Use true for 465, false for other ports
    auth: {
        user: functions.config().email.user,
        pass: functions.config().email.pass,
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
        to: 'pavlos@orfanidis.net.gr', // Replace with your recipient email
        subject: `New Contact Message from ${name} <${email}>`,
        replyTo: `${email}`,
        text: `
        You have received a new contact message!

        **Sender Information:**
        - **Name:** ${name}
        - **Email:** ${email}

        **Message:**
        ${message}

        Please reply directly to the sender if you wish to respond.
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