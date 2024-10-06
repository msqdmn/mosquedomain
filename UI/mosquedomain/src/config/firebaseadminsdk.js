const admin = require('firebase-admin');
const fs = require('fs');
const csv = require('csv-parser');

const serviceAccount = require('./mosqueadmin-92021-firebase-adminsdk-6gd5v-1638ed19d1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const collectionName = 'transactions';

fs.createReadStream('./sanda b section - Sheet1.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.collection(collectionName).add(row)
      .then(() => {
        console.log('Document successfully written!', row);
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
