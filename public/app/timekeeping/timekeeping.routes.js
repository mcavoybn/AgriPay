(function() {
    'use strict'

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('timeEntry', {
            url: '/timeEntry/',
            templateUrl: 'app/timekeeping/templates/timeEntry.tpl.html',
            controller: 'TimeEntryCtrl',
            resolve: {
                "currentAuth": ["$firebaseAuth", ($firebaseAuth) => {
                    return $firebaseAuth().$waitForSignIn();
                }]
            }
        });            
    }
})();
