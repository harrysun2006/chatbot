'use strict';

const functions = require('firebase-functions');
const DialogflowApp = require('actions-on-google').DialogflowApp;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    
	const app = new DialogflowApp({request: request, response: response});
	const REQUEST_PERMISSION_ACTION = 'request_permission';
	const SAY_NAME_ACTION = 'get_name';
	const userId = app.getUser().userId;

	function requestPermission (app) {
	  const permission = app.SupportedPermissions.NAME;
	  app.askForPermission('To know who you are', permission);
	}

	function sayName (app) {
	  if (app.isPermissionGranted()) {
	  	console.log('Uer Id: ' + userId);
	    app.tell('Welcome to Cognizant Bank, ' + app.getUserName().givenName);
	  } else {
	    // Response shows that user did not grant permission
	    app.tell('Sorry, I could not get your name.');
	  }
	}
	const actionMap = new Map();
	actionMap.set(REQUEST_PERMISSION_ACTION, requestPermission);
	actionMap.set(SAY_NAME_ACTION, sayName);
	app.handleRequest(actionMap);

});
