const admin = require('firebase-admin');

// Send messages using Firebase Cloud Messaging (FCM) Admin API
//
// https://firebase.google.com/docs/cloud-messaging/admin/send-messages

const sendMessage = async function(topic, data) {
  const message = {
    data: data,
    topic: topic,
    android: {
      // priority must be set high, see:
      // https://rnfirebase.io/docs/v5.x.x/messaging/receiving-messages#4)-(Optional)(Android-only)-Listen-for-FCM-messages-in-the-background
      priority: 'high',
    },
  };

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (err) {
    console.error('Could not send message through FCM', err);
    throw err;
  }
  return response;
};

module.exports = {
  sendMessage: sendMessage,
};
