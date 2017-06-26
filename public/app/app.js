(function() {
	'use strict';

    var config = {
        apiKey: "AIzaSyCA_3dhMskvBT_o59XFnnsiWECrFtmylN4",
        authDomain: "agripay-p.firebaseapp.com",
        databaseURL: "https://agripay-p.firebaseio.com",
        projectId: "agripay-p",
        storageBucket: "agripay-p.appspot.com",
        messagingSenderId: "30210508168"
    };
    firebase.initializeApp(config);

	angular
		.module('app', ['ui.router', 'firebase']);
})();