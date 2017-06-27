(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewsCtrl', CrewsCtrl);
    
    CrewsCtrl.$inject = ['$scope', '$firebaseAuth', '$firebaseArray'];
    
    function CrewsCtrl($scope, $firebaseAuth, $firebaseArray) {
        console.log($firebaseAuth().$getAuth());

        activate();
        
        function activate() {
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }
    }
})();