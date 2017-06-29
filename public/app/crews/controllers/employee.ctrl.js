(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeCtrl', EmployeeCtrl);

    EmployeeCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$stateParams', 'ModalService'];

    function EmployeeCtrl($scope, $state, $firebaseArray, $firebaseObject, $firebaseAuth, $stateParams, ModalService) {
        $scope.assignCrew = assignCrew;
        
        $scope.clickedShow = false;
        $scope.clickShow = clickShow;
        
        $scope.isEditing = false;
        $scope.editEmployee = editEmployee;
        
        $scope.goBack = goBack;        
        $scope.saveEmployee = saveEmployee;
        

        activate();

        function activate() {
            var employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees').child($stateParams.employeeId);
            $scope.employee = $firebaseObject(employeeRef);

            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }

        function assignCrew(crew) {
            $scope.employee.crew = crew;
        }

        function clickShow() {
            if ($scope.clickedShow == false) {
                $scope.clickedShow = true;
            } else {
                $scope.clickedShow = false;
            }
        }

        function editEmployee() {
            $scope.isEditing = true;
        }

        function goBack() {
            $state.go('employees');
        }

        function saveEmployee() {
            $scope.isEditing = false;
            $scope.employee.$save();
        }
    }
})();
