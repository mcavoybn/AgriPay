(function() {
    
    angular
    .module('app')
    .config(config);
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider) {
        $stateProvider
        .state('crews', {
            url: '/crews/{id}',
            templateUrl: 'app/crews/templates/crews.tpl.html',
            controller: 'CrewsCtrl'
        }).state('crewDetail', {
            url: '/crewDetail',
            templateUrl: 'app/crews/templates/crew.tpl.html',
            controller: 'CrewCtrl'
        });
    }
})();