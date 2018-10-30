const admin = require('firebase-admin');

// Send messages using Firebase Cloud Messaging (FCM) Admin API
//
// https://firebase.google.com/docs/cloud-messaging/admin/send-messages

const sendMessage = async function(topic, data) {
  const message = {
    data: data,
    topic: topic,
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
