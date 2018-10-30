const admin = require('firebase-admin');
const express = require('express');
const path = require('path');
const messaging = require('./messaging');

// read Firebase Admin SDK credentials from json file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://notification-demo-server.firebaseio.com'
});

// create http server
const app = express();

// http server routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/send', async (req, res) => {
  // create notification object
  var notification = {
    title: req.query.title || 'Empty Title',
    body: req.query.body || 'Empty body text.',
  };

  try {
    const topic = 'test001';
    // see messaging.js
    const response = await messaging.sendMessage(topic, notification);
    res.status(200).send('Message sent.').end();
  } catch (err) {
    res.status(500).send('Error when sending message').end();
  }
});

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
