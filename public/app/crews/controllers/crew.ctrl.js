(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewCtrl', CrewCtrl);
    
    CrewCtrl.$inject = ['$scope', '$stateParams', '$firebaseArray'];
    
    function CrewCtrl($scope, $stateParams, $firebaseArray) {
        
        activate();
        
        function activate() {
            var crewsRef = firebase.database().ref().child($stateParams.id).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }
        
        function editCrew() {
            
        }
        
        function addEmployeeToCrew() {
            
        }
    }
})();