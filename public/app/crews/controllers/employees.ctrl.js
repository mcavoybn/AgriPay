(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$window', '$scope', '$state', '$firebaseArray', '$firebaseAuth', '$stateParams', 'ModalService'];

    function EmployeesCtrl($window, $scope, $state, $firebaseArray, $firebaseAuth, $stateParams, ModalService) {
        $scope.employees = [];
        $scope.addEmployee = addEmployee;
        activate();

        function activate(){ 
            var employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeesRef); 

            $scope.employees.$loaded().then((data) => {
                $scope.employees = data;
            });
        }

        function addEmployee(){
            ModalService.showModal({
                templateUrl: 'app/crews/templates/addEmployee.tpl.html',
                controller: 'AddEmployeeCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((employee) => {
                    $scope.employees.$add(employee);
                });
            });
        }
    }
})();