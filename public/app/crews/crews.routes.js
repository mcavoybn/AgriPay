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
        });
    }
})();