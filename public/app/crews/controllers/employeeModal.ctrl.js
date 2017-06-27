(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeModalCtrl', EmployeeModalCtrl);

    EmployeeModalCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseArray', '$firebaseAuth', 'ModalService', 'close'];

    function EmployeeModalCtrl($scope, $state, $stateParams, $firebaseArray, $firebaseAuth, ModalService, close) {
        $scope.employees;
        $scope.employee;
        $scope.submit = submit;
        activate();
        
        $scope.close = function(result) {
            console.log("Result: " + result);
            close(result, 400);
        }

        function activate(){
            var employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees'); 
            $scope.employees = $firebaseArray(employeesRef);
            $scope.employees.$loaded().then((data) => {
                $scope.employees = data;
            });
        }

        function submit(){
            $scope.employees.$add($scope.employee);
            $scope.employees.forEach((employee) => {                
                $scope.employees.$save(employee); 
            });
        }
    }
})();