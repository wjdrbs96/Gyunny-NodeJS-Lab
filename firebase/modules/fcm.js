var FCM = require('fcm-node');

/** Firebase(구글 개발자 사이트)에서 발급받은 서버키 */

var serverKey = 'AAAAOP5A1II:APA91bHDayo6X7yCLc7kzVtVuOGytyrlsE9RI7JReJfIbD9MGRUfQxS3o07fJOt21OiBImSOAZx0LQBcFlp0LD6bU2vG__moHR4mSjWwvc6E-wOO-mIrWy_ghdwerKo8tE171to1wTg1';

/** 안드로이드 단말에서 추출한 token값 */
// 안드로이드 App이 적절한 구현절차를 통해서 생성해야 하는 값이다.
// 안드로이드 단말에서 Node server로 POST방식 전송 후,
// Node서버는 이 값을 DB에 보관하고 있으면 된다.
var client_token = 'cOFBlyizlEVhoNz21YkAer:APA91bFJ255rQZEs7pwQBBi0rBDHKP3DD-L_fzoKBK1Sxvr1rLf32rbq9KqyLvhPb7XJq5xVfDZBuvfXRd38T8K-ePawJX-BkOH7y4DZAZHfT-53niJ78e1_gtQYDOEW6H0pgah2MEle'; //클라이언트에서 토큰주면 끝 

/** 발송할 Push 메시지 내용 */
var push_data = {
    // 수신대상
    to: client_token,

    notification: {
        title: "N-OUR",
        body: "test",
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "pushicon.png"
    },
    // 메시지 중요도
    // "to":"/topics/all",
    priority: "high",
    // App 패키지 이름
    restricted_package_name: "com.x.x", //config.xml 의 id
    // App에게 전달할 데이터
    "data": {
        "title": "Notification title", //Any value 
    }
};
/** 아래는 푸시메시지 발송절차 */
var fcm = new FCM(serverKey);

fcm.send(push_data, function (err, response) {
    if (err) {
        console.error('Push메시지 발송에 실패했습니다.');
        console.error(err);
        return;
    }

    console.log('Push메시지가 발송되었습니다.');
    console.log(response);
});