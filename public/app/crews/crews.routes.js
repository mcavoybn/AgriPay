(function() {
    'use strict'
    
    angular
    .module('app')
    .config(config);
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider) {
        $stateProvider
        .state('crews', {
            url: '/crews',
            templateUrl: 'app/crews/templates/crews.tpl.html',
            controller: 'CrewsCtrl',
            resolve: {
                "currentAuth": ["$firebaseAuth", ($firebaseAuth) => {
                    return $firebaseAuth().$waitForSignIn();
                }]
            }
        }).state('crew', {
            url: '/crews/{id}',
            templateUrl: 'app/crews/templates/crew.tpl.html',
            controller: 'CrewsCtrl',
            resolve: {
                "currentAuth": ["$firebaseAuth", ($firebaseAuth) => {
                    return $firebaseAuth().$waitForSignIn();
                }]
            }
        }).state('employees', {
            url: '/employees',
            templateUrl: 'app/crews/templates/employees.tpl.html',
            controller: 'EmployeesCtrl',
            resolve: {
                "currentAuth": ["$firebaseAuth", ($firebaseAuth) => {
                    return $firebaseAuth().$waitForSignIn();
                }]
            }
        }).state('employee', {
            url: '/employees/{employeeId}',
            templateUrl: 'app/crews/templates/employee.tpl.html',
            controller: 'EmployeeCtrl',
            resolve: {
                "currentAuth": ["$firebaseAuth", ($firebaseAuth) => {
                    return $firebaseAuth().$waitForSignIn();
                }]
            }
        });
    }
})();