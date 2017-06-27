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
            controller: 'CrewsCtrl'
        }).state('crew', {
            url: '/crews/{id}',
            templateUrl: 'app/crews/templates/crew.tpl.html',
            controller: 'CrewsCtrl'
        }).state('employees', {
            url: '/employees',
            templateUrl: 'app/crews/templates/employees.tpl.html',
            controller: 'EmployeesCtrl'
        }).state('employee', {
            url: '/employees/{id}',
            templateUrl: 'app/crews/templates/employees.tpl.html',
            controller: 'EmployeesCtrl'
        });
    }
})();