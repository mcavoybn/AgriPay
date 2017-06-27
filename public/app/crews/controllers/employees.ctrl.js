(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$window', '$scope', '$state', '$firebaseArray', '$firebaseAuth', '$stateParams', 'ModalService'];

    function EmployeesCtrl($window, $scope, $state, $firebaseArray, $firebaseAuth, $stateParams, ModalService) {
        $scope.employees = [];
        $scope.addEmployee = addEmployee;
        $scope.showAddEmployeeModal = showAddEmployeeModal;
        $scope.selectEmployee = selectEmployee;
        $scope.removeEmployee = removeEmployee;
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

        function addEmployee(){
            ModalService.showModal({
                templateUrl: 'app/crews/templates/addEmployee.tpl.html',
                controller: 'AddEmployeeCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
        }
        
        function removeEmployee(employee){
            $scope.employees.forEach( (checkEmployee) => {
                if(checkEmployee.$id == employee.$id) employees.$remoove(checkEmployee);
                modal.close.then((employee) => {
                    $scope.employees.$add(employee);
                });
            });
            saveEmployees();
        }

        function selectEmployee(employee){
            console.log(employee.$id);
            $state.go('employee', { employeeId: employee.$id} );
        }
        
        function saveEmployees(){
            $scope.employees.forEach((employee) => {                
                $scope.employees.$save(employees); 
            });
        }
    }
})();