import {setDefaultRole} from './utils/creatingUser.js';
import {HttpsError, onCall} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import admin from 'firebase-admin';
import {sendMail} from "./utils/sendMail.js";
import {sendSMS} from "./utils/sendSMS/sendSMS.js";
import getWeekOfMonth from "./utils/sendChores.js";
import {onRequest} from "firebase-functions/v2/https";

admin.initializeApp();

const db = admin.firestore();

export const sendChores = onSchedule('every friday 12:00', async (context) => {
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
});

const resetChores=async (choresRef, choresData)=>{
    for (const choreId in choresData) {
        const updatedTasks = choresData[choreId].map(task => ({
            ...task,
            completed: false,  // Resetting the completed status
        }));

        // Update Firestore with the reset tasks
        await choresRef.update({
            [choreId]: updatedTasks,
        });
    }
}

export const manualResetChores = onCall(async (request, context) => {
    const choresRef = db.collection('cleaning').doc('chores');
    const choresDoc = await choresRef.get();
    await resetChores(choresRef, choresDoc.data());
    return { success: true, message: 'Chores have been reset' };
});


export const checkChoresAndReset = onSchedule('every monday 00:00', async (context) => {
        console.log('Scheduled function triggered - Checking chores status...');

        // Get the chores data from Firestore
        const choresRef = db.collection('cleaning').doc('chores');
        const choresDoc = await choresRef.get();

        if (!choresDoc.exists) {
            console.log('No chores document found!');
            return;
        }

        const choresData = choresDoc.data();
        let allChoresCompleted = true;

        // Check if all tasks are completed
        for (const choreId in choresData) {
            const tasks = choresData[choreId];
            if (tasks.some(task => !task.completed)) {
                allChoresCompleted = false;
                break;
            }
        }

        // If all chores are completed, reset them
        if (allChoresCompleted) {
            console.log('All chores are completed. Resetting them for the next week.');
            await resetChores(choresRef, choresData);
            console.log('Chores have been reset for the next week.');
        } else {
            sendSMS("+306986989523", "Δεν ολοκληρώθηκαν οι καθαριότητες").then(()=>{
                console.log('Not all chores are completed, so no reset was performed.');
            });
        }
    });


export const setDefaultROle = setDefaultRole;

export const sendSMSFunction = onCall(async (request, context)=> {
    const {to, message} = request.data;
    await sendSMS(to, message);
})

export const markChoreCompleted = onRequest(async (req, res) => {
    const choreId = req.query.choreId;
    const choreSet = req.query.choreSet;

    if (!choreId) {
        return res.status(400).send('Chore ID is required.');
    }

    if (!choreSet) {
        return res.status(400).send('Chore Set is required.');
    }

    const choreDocRef = admin.firestore().doc(`cleaning/chores`);
    const choreDoc = await choreDocRef.get();

    if (!choreDoc.exists) {
        return res.status(404).send('Chore not found.');
    }

    const choreData = choreDoc.data();
    choreData[choreSet][choreId].completed = true;

    await choreDocRef.update(choreData);

    // Optionally, send a confirmation message back to the user (this can be an email, SMS, or just a success message).
    return res.status(200).send(`${choreData[choreSet][choreId].name}: Ολοκληρώθηκε`);
});

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
