'use strict';

const functions = require('firebase-functions');
const DialogflowApp = require('actions-on-google').DialogflowApp;
const validUsers = ['Harry', 'hiten', 'Liu'];
const balances = {
	'Harry': 'You have $800 in your bank account!',
	'hiten': 'You have $1000 in your savings account ending with one four four four and $1200 in your savings account ending with six seven eight nine',
	'Liu': 'You have $1200 in your CBA bank account, $700 in NAB bank account and $900 in ANZ bank account',
};
const users = {
	'ABwppHHbUczQE7IbzOQ0RgiNi1A9yAPh9TC3Tna-04MjcRcXoFYPmN891NJXnIik75PyPH-09-j9': {
		'givenName': 'Harry'
	},
	'ABwppHEsBEwccCD1KKzw7zutnhLcTBIgVsAQ4iGAeAmgYYoJEjE_DAY8afVJyfJny1RHLFCXlpWl': {
		'givenName': 'hiten'
	},
	'ABwppHGTr6dwp5CKjbhwjxFEP-Ir2XFUu04Ft_cOFbPXj_mqvbdeI5L22YKUvQ55fHovYl4afU0w': {
		'givenName': 'Liu'
	}
};
var user;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    
	const app = new DialogflowApp({request: request, response: response});
	const REQUEST_PERMISSION_ACTION = 'input.welcome';
	const SAY_NAME_ACTION = 'input.welcome'; // 'get_name';
	const BALANCE_CHECK = 'account.balance.check';
	const userId = app.getUser().userId;


	function requestPermission (app) {
	  const permission = app.SupportedPermissions.NAME;
	  app.askForPermission('To know who you are', permission);
	}

	function sayName (app) {
  	console.log('Uer Id: ' + userId);
	  if (app.isPermissionGranted()) {
	  	user = app.getUserName().givenName;
	  } else {
	    // Response shows that user did not grant permission
	    // app.ask('Sorry, I could not get your name.');
	    user = users[userId].givenName;
	  }  	
    app.ask('Hi ' + user + ', welcome to CognoBot! What can I do for you?');
	}

	function sayBalance (app) {
		// var text = 'You have ' + balances[user] + ' in your bank account!';
		var text = balances[user];
		console.log(text);
		app.ask(text);
	}

	function sayTest (app) {
		app.ask("I'm here!");
	}

	const actionMap = new Map();
	// actionMap.set(REQUEST_PERMISSION_ACTION, requestPermission);
	actionMap.set(SAY_NAME_ACTION, sayName);
	actionMap.set(BALANCE_CHECK, sayBalance);
	actionMap.set('test.firebase', sayTest);
	app.handleRequest(actionMap);

});

