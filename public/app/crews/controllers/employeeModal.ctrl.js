(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeModalCtrl', EmployeeModalCtrl);

    EmployeeModalCtrl.$inject = ['$scope', '$state', '$firebaseArray', 'ModalService'];

    function EmployeeModalCtrl($scope, $state, $firebaseArray, ModalService) {
        $scope.employees;
        activate();

        function activate(){
            var employeesRef = firebase.database().ref().child($stateParams.id).child('employees'); 
            $scope.employees = $firebaseArray(employeesRef);

            $scope.employees.$loaded().then((data) => {
                $scope.employees = data;
            });
        }
    }
})();