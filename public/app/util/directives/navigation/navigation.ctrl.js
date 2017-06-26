(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('NavigationCtrl', NavigationCtrl);
    
    NavigationCtrl.$inject = ['$scope', '$stateParams'];
        
    function NavigationCtrl($scope, $stateParams) {        
        activate();
        
        /////////////////////
        
        function activate() {
            $scope.uid = $stateParams.id;
        }
    }
})();