import {setDefaultRole} from './utils/creatingUser.js';
import {HttpsError, onCall} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import admin from 'firebase-admin';
import {sendMail} from "./utils/sendMail.js";
import {sendSMS} from "./utils/sendSMS/sendSMS.js";
import getWeekOfMonth from "./utils/sendChores.js";

admin.initializeApp();

const db = admin.firestore();

//const sendChores = onSchedule('every minute', async (context) => {
export const testChores = onCall(async (request, context) => {
    db.doc("/cleaning/chores").get().then((doc) => {
        const chores = doc.data();
        db.doc("/cleaning/departents").get().then((doc) => {
            const departments =  Object.values(doc.data());
            const weekOfMonth = getWeekOfMonth(new Date())-1;
            departments.forEach((department) => {
                if(department.chores.length<1){
                    return;
                }
                const choresOfDepartment = department.chores.map((chore) => {
                    return chores[chore]; // Retrieves the array of chores for key '04'
                }).filter(Boolean); // Filters out undefined values



                if(department.phone){
                    const phonesToSendSMS = department.phone[weekOfMonth];
                    const coresAsString = choresOfDepartment[0].map((chore) => {
                        return chore.name
                    }).join(",\n\t");
                    const message = `Καλημέρα! Σήμερα έχετε τα εξής καθήκοντα:\n\t${coresAsString}`;
                    phonesToSendSMS.forEach((phone) => {
                        sendSMS(phone, message).then(()=>{
                            console.log("SMS sent to", phone, "with message", message);
                        });
                    })
                }
            })
        })
    })
})


export const setDefaultROle = setDefaultRole;

export const sendSMSFunction = onCall(async (request, context)=> {
    const {to, message} = request.data;
    await sendSMS(to, message);
})

export const sendContactMessage = onCall(async (request, context) => {

    const { name, email, message } = request.data;
    // Validate user input
    if (!name || !email || !message) {
        throw new HttpsError('invalid-argument', 'All fields are required');
    }

    const mail_message= `
        Λάβατε νέο μήνυμα!

        **Sender Information:**
        - **Όνομα:** ${name}
        - **Email:** ${email}

        **Μήνυμα:**
        ${message}

        Σε περίπτωση που θέλετε να απαντήσετε, μπορείτε να απαντήσετε κατευθείαν σε αυτό το μήνυμα.
    `
    const to= 'pavlos@orfanidis.net.gr';
    const subject = `Νέο Μήνυμα από ${name} <${email}>`
    try {
        await sendMail(to, email, subject, mail_message);
        //sendSMS("+306946624436", "Κάποιος έστειλε μήνυμα στην φόρμα. Δες το").then();
        return { success: true, message: 'Message sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new HttpsError('internal', 'Failed to send message. Please try again later.');
    }
});
