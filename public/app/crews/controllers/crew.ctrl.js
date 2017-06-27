(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewCtrl', CrewCtrl);
    
    CrewCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseObject', '$firebaseArray', '$firebaseAuth'];
    
    function CrewCtrl($scope, $state, $stateParams, $firebaseObject, $firebaseArray, $firebaseAuth) {
        $scope.isEditingCrew = false;
        $scope.editCrew = editCrew;
        $scope.saveCrew = saveCrew;
        $scope.deleteCrew = deleteCrew;
        $scope.addEmployeeToCrew = addEmployeeToCrew;
        
        activate();
        
        function activate() {
            var crewRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews').child($stateParams.id);
            $scope.crew = $firebaseObject(crewRef);
            var employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid);
            $scope.employees = $firebaseArray(employeeRef.child('employees').orderByChild('crewID').equalTo($scope.crew.$id));
        }
        
        function editCrew() {
            $scope.isEditingCrew = true;
            
        }
        
        function addEmployeeToCrew() {
            
        }
        
        function saveCrew() {
            $scope.crew.$save().then((data) => {
                
            }).catch((error) => {
                console.log(error);
            });
            
           $scope.isEditingCrew = false;
        }
        
        function deleteCrew() {
            $scope.crew.$remove().then((data) => {
                $state.go('crews');
            }).catch((error) => {
                console.log(error);
            });
            
        }
    }
})();