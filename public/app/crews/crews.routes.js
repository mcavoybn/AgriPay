(function() {
    'use strict'
    
    angular
    .module('app')
    .config(config);
    
    config.$inject = ['$stateProvider', '$scope'];
    
    function config($stateProvider, $scope) {
        $stateProvider
            .state('crews', {
            url: '/crews/' + $scope.uid,
            templateUrl: 'app/crews/templates/crews.tpl.html',
            controller: 'CrewsCtrl'
        })
        .state('employees', {
            url: '/employees/' + $scope.uid,
            templateUrl: 'app/crews/templates/employees.tpl.html',
            controller: 'EmployeesCtrl'
        });
    }
})();