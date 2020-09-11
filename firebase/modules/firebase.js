const admin = require("firebase-admin");
const firebaseConfig = require('../config/firebase.json');

// admin.initializeApp({
//   credential: admin.credential.cert(firebaseConfig),
//   databaseURL: "https://maru-edb55.firebaseio.com"
// });

const alarm = {
  message: async (registerToken) => {
    var title = "얼리버디";

    admin.initializeApp(firebaseConfig);
    var options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24 * 2
    };

    var payload = {
        notification: {
            title: title,
            sound: "default",
            click_action: "FCM_PLUGIN_ACTIVITY",
            icon: "fcm_push_icon"
        },

        data: {
            test: "test가 성공적이네요 ~~ "
        }
    };

    admin.messaging().sendToDevice(registerToken, payload, options).then(function (response) {
        console.log('성공 메세지!' + response);
        return response
    })
    .catch(function (error) {
        console.log('보내기 실패 : ', error);
    });

},
}

module.exports = alarm;