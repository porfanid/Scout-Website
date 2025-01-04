import {defineString} from "firebase-functions/params";
import nodemailer from "nodemailer";

const email_user_name = defineString('EMAIL_USER_NAME');
const email_password = defineString('EMAIL_PASSWORD');

export const sendMail=async (to, from, subject, message)=>{
    const auth = {
        user: email_user_name.value(),
        pass: email_password.value(),
    }

    // Configure nodemailer with your SMTP credentials
    const transporter = nodemailer.createTransport({
        host: 'webmail.ioannina-scouts.gr', // Replace with your SMTP server
        port: 587, // Replace with your SMTP port
        secure: false, // Use true for 465, false for other ports
        auth: auth,
    });


    const mailOptions = {
        from: `noreply<noreply@ioannina-scouts.gr>`,
        to: to, // Replace with your recipient email
        subject: subject,
        replyTo: from,
        text: message,
    };

    return await transporter.sendMail(mailOptions);
}