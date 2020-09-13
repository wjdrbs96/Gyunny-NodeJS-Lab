// This registration token comes from the client FCM SDKs.
var admin = require("firebase-admin");
const firebaseConfig = require('../config/firebase.json');
var registrationToken = 'cOFBlyizlEVhoNz21YkAer:APA91bFJ255rQZEs7pwQBBi0rBDHKP3DD-L_fzoKBK1Sxvr1rLf32rbq9KqyLvhPb7XJq5xVfDZBuvfXRd38T8K-ePawJX-BkOH7y4DZAZHfT-53niJ78e1_gtQYDOEW6H0pgah2MEle';

const testFCM = {
    FCM : async() => {
       admin.initializeApp({
         credential: admin.credential.cert(firebaseConfig),
         databaseURL: "https://maru-edb55.firebaseio.com"
       });
        var message = {
            data: {
              score: '850',
              time: '2:45'
            },
            token: registrationToken
          };
          
          // Send a message to the device corresponding to the provided
          // registration token.
          admin.messaging().send(message)
            .then((response) => {
              // Response is a message ID string.
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });
    }
}

module.exports = testFCM;