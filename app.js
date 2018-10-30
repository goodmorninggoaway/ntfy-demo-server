const admin = require('firebase-admin');
const express = require('express');

const messaging = require('./messaging');

// read Firebase Admin SDK credentials from json file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://notification-demo-server.firebaseio.com'
});

// create http server
const server = express();

// http server routes
server.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

server.get('/send', async (req, res) => {
  try {
    const response = await messaging.sendMessage('test001', {
      score: '850',
      time: '2:33',
    });
    res.status(200).send('message sent.').end();
  } catch (err) {
    res.status(500).send('Error when sending message').end();
  }
});

// start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
