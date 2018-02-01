'use strict';


const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library

function sayName (app) {
  if (app.isPermissionGranted()) {
    app.tell('Your name is ' + app.getUserName().displayName);
  } else {
    // Response shows that user did not grant permission
    app.tell('Sorry, I could not get your name.');
  }
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  const app = new DialogflowApp({request: request, response: response});
  sayName(app);
});
