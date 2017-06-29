(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('login', {
            url: '/login',
            templateUrl:'app/auth/templates/login.tpl.html',
            controller: 'LoginCtrl'
        })
            .state('register', {
            url: '/register',
            templateUrl:'app/auth/templates/register.tpl.html',
            controller: 'RegisterCtrl'
        });
    }
})();