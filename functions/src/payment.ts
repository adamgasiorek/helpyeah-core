import * as functions from "firebase-functions";
const stripe = require('stripe')(functions.config().stripe.testkey);

exports.createIntent = functions.firestore.document('payments_intent/{customerId}')
    .onCreate(async (snap, context) => {
        try {
            const idempotencyKey = context.params.pushId;
            const intent = await stripe.paymentIntents.create({
                    amount: 1099,
                    currency: 'pln',
                    // Verify your integration in this guide by including this parameter
                    metadata: {integration_check: 'accept_a_payment'},
                },
                { idempotencyKey });
            console.log(snap.ref, snap.id, snap.data(), intent);
            // await admin.firestore().collection('payments_intent').set({original: original})
            return await snap.ref.set(intent);
        } catch (e) {
            console.log(e);
            return;
        }

        // const data = snapshot.data();
        // const objectID = snapshot.id;
        //
        // return index.saveObject({ ...data, objectID });

    })
