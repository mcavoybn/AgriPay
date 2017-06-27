(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewCtrl', CrewCtrl);
    
    CrewCtrl.$inject = ['$scope', '$stateParams', '$firebaseObject', '$firebaseAuth'];
    
    function CrewCtrl($scope, $stateParams, $firebaseObject, $firebaseAuth) {
        
        activate();
        
        function activate() {
            var crewRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews').child($stateParams.id);
            $scope.crew = $firebaseObject(crewRef);
            console.log($scope.crew);
        }
        
        function editCrew() {
            
        }
        
        function addEmployeeToCrew() {
            
        }
    }
})();