(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeModalCtrl', EmployeeModalCtrl);

    EmployeeModalCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseArray', '$firebaseAuth', 'ModalService'];

    function EmployeeModalCtrl($scope, $state, $stateParams, $firebaseArray, $firebaseAuth, ModalService) {
        $scope.employees;
        $scope.submit = submit;
        activate();
               
        $scope.lastName = null;
        $scope.middle = null;
        $scope.SSN = null;
        $scope.gender = null;
        $scope.dateOfBirth = null;
        $scope.address1 = null;
        $scope.address2 = null;
        $scope.city= null;
        $scope.state= null;
        $scope.zipCode= null;
        $scope.phoneNumber= null;
        $scope.hourlyRate= null;
        $scope.crew = {
          id: null,
          name: "Crew Not Assigned!",
          photo: null
        };

        function activate(){
            var employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees'); 
            $scope.employees = $firebaseArray(employeesRef);
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
            $scope.employees.$add(newEmployee);
            saveEmployees();
        }
        
        function saveEmployees(){
            $scope.employees.forEach((employee) => {                
                $scope.employees.$save(employees); 
            });
        }
    }
})();