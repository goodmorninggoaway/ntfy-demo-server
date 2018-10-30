import * as admin from 'firebase-admin';
import express from 'express';

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

// start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
