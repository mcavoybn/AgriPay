(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewsCtrl', CrewsCtrl);
    
    CrewsCtrl.$inject = ['$scope', '$stateParams', '$firebaseArray'];
    
    function CrewsCtrl($scope, $stateParams, $firebaseArray) {
        activate();
        
        function activate() {
            var CrewsRef = firebase.database().ref().child($stateParams.id).child('crews');
            $scope.crews = $firebaseArray(CrewsRef);
        }
    }
})();