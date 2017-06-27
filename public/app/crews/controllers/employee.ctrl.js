(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeCtrl', EmployeeCtrl);

    EmployeeCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$stateParams', 'ModalService'];

    function EmployeeCtrl($scope, $state, $firebaseArray, $stateParams, ModalService) {
        $scope.employee;
        $scope.editEmployee = editEmployee;
        $scope.saveEmployee = saveEmployee;
        $scope.isEditing = false;
        activate();

        $scope.firstName;
        $scope.lastName;
        $scope.middle;
        $scope.SSN;
        $scope.gender;
        $scope.dateOfBirth;
        $scope.address1;
        $scope.address2;
        $scope.city;
        $scope.state;
        $scope.zipCode;
        $scope.phoneNumber;
        $scope.hourlyRate;

        function activate(){
            var employeeRef = firebase.database().ref().child($stateParams.id).child('employees').child($stateParams.employeeId); 
            $scope.employee = $firebaseObject(employeeRef);

            $scope.employee.$loaded().then((data) => {
                $scope.employee = data;
            });
        }   

        function editEmployee(){
            $scope.isEditing = true;
        }

        function saveEmployee(){
            $scope.isEditing = false;
        }
    }
})();