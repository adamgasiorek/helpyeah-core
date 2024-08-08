exports.payment = require('./payment');
exports.email = require('./sendgrid');

// import * as functions from 'firebase-functions';
// import * as algoliasearch from 'algoliasearch';
// import * as admin from 'firebase-admin';
// // const algoliasearch = require('algoliasearch');
// //
// // const APP_ID = functions.config().algolia.app;
// // const ADMIN_KEY = functions.config().algolia.key;
// //
//
// const APP_ID = functions.config().algolia.app;
// const ADMIN_KEY = functions.config().algolia.key;
//
// const client = algoliasearch(APP_ID, ADMIN_KEY);
// const index = client.initIndex('customers');

// admin.initializeApp();
//
// exports.addAdminRole = functions.https.onCall((data, context) => {
//     return admin.auth().getUserByEmail(data.email).then((user: { uid: string; }) => {
//         return admin.auth().setCustomUserClaims(user.uid, {
//             admin: true,
//             supervisior: true
//         });
//     }).then(() => {
//         return {
//             message: `Success ${data.email} has been made an admin`
//         }
//     }).catch((err: any) => {
//         return err;
//     })
// })
//
// exports.getAllUsers = functions.https.onCall((data, context) => {
//     return admin.auth().verifyIdToken(data).then(() => {
//         return admin.auth().listUsers(1000, data?.nextPageToken)
//             .then( (listUsersResult) => {
//                 return listUsersResult.users.map((userRecord) => userRecord.toJSON());
//             })
//             .catch((err) => {
//                 return err;
//             });
//     });
// });
//

// exports.paymentUpdate = functions.firestore.document('payments_intent/{customerId}')
//     .onUpdate(async (snap, context) => {
//         try {
//             const idempotencyKey = context.params.pushId;
//             const intent = await stripe.paymentIntents.create({
//                 amount: 1099,
//                 currency: 'pln',
//                 // Verify your integration in this guide by including this parameter
//                 metadata: {integration_check: 'accept_a_payment'},
//             },
//                 { idempotencyKey });
//             // console.log(snap.after.ref, snap.after.id, snap.data(), intent);
//             // await admin.firestore().collection('payments_intent').set({original: original})
//             return await snap.after.ref.set(intent);
//         } catch (e) {
//             console.log(e);
//             return;
//         }
//
//         // const data = snapshot.data();
//         // const objectID = snapshot.id;
//         //
//         // return index.saveObject({ ...data, objectID });
//
//     })


//
// exports.pay = functions.https.onCall( (data, context) => {
//     return stripe.paymentIntents.create({
//         amount: 1099,
//         currency: 'pln',
//         // Verify your integration in this guide by including this parameter
//         metadata: {integration_check: 'accept_a_payment'},
//     });
//
//     // const data = snapshot.data();
//     // const objectID = snapshot.id;
//     //
//     // return index.saveObject({ ...data, objectID });
//
// });
//
// exports.addToIndex = functions.firestore.document('customers/{customerId}')
//
//     .onCreate((snapshot) => {
//
//         const data = snapshot.data();
//         const objectID = snapshot.id;
//
//         return index.saveObject({ ...data, objectID });
//
//     });
//
// exports.updateIndex = functions.firestore.document('customers/{customerId}')
//
//     .onUpdate((change) => {
//         const newData = change.after.data();
//         const objectID = change.after.id;
//         return index.saveObject({ ...newData, objectID });
//     });
//
// exports.deleteFromIndex = functions.firestore.document('customers/{customerId}')
//
//     .onDelete(snapshot =>
//         index.deleteObject(snapshot.id)
//     );
