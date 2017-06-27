(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeModalCtrl', EmployeeModalCtrl);

    EmployeeModalCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseArray', '$firebaseAuth', 'ModalService'];

    function EmployeeModalCtrl($scope, $state, $stateParams, $firebaseArray, $firebaseAuth, ModalService) {
        $scope.employees;
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
            var authObj = $firebaseAuth($stateParams.id);
            var authData = authObj.$getAuth();
            console.log('authData=')
            console.log(authData);
            var uid;
            if(authData){
                uid = authData.uid;
                var employeesRef = firebase.database().ref().child(uid).child('employees'); 
                $scope.employees = $firebaseArray(employeesRef);
            }else{
                var employeesRef = firebase.database().ref().child("no-uid").child('employees'); 
                $scope.employees = $firebaseArray(employeesRef);
            }    
            $scope.employees.$loaded().then((data) => {
                $scope.employees = data;
            });
        }

        function submit(){
            var newEmployee = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                middle: $scope.middle,
                SSN: $scope.SSN,
                gender: $scope.gender,
                dateOfBirth: $scope.dateOfBirth,
                address1: $scope.address1,
                address2: $scope.address2,
                city: $scope.city,
                state: $scope.state,
                zipCode: $scope.zipCode,
                phoneNumber: $scope.phoneNumber,
                hourlyRate: $scope.hourlyRate
            }
            employees.$add(newEmployee);
            employees.$save();
        }
    }
})();