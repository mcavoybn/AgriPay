(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeCtrl', EmployeeCtrl);

    EmployeeCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseArray', '$firebaseAuth', '$firebaseObject'];

    function EmployeeCtrl($scope, $state, $stateParams, $firebaseArray, $firebaseAuth, $firebaseObject) {
        
        $scope.clickedShow = false;        
        $scope.isEditing = false;

        $scope.assignCrew = assignCrew;
        $scope.clickShow = () => $scope.clickedShow ? false : true; 
        $scope.editEmployee = () => $scope.isEditing = true;
        $scope.goBack = () => $state.go('employees');        
        $scope.saveEmployee = () => { $scope.isEditing = false; $scope.employee.$save(); }
        
        
        activate();

        /////////////////////

        function activate(){
            const employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees').child($stateParams.employeeId); 
            $scope.employee = $firebaseObject(employeeRef);

            const crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }
        
        function assignCrew(crew) {
            $scope.crews.forEach(checkCrew => {
                if (checkCrew.$id == $scope.employee.crewID) {
                    checkCrew.count--;
                    checkCrew.$save();
                }
            });
            $scope.employee.crew = crew;
            $scope.employee.crewID = crew.$id;
            $scope.crews.forEach(checkCrew => {
                if (checkCrew.$id == $scope.employee.crewID) {
                    checkCrew.count++;
                    checkCrew.$save();
                }
            });
        }
    }
})();