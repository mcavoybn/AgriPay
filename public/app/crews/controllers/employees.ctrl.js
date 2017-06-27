(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseAuth', '$stateParams', 'ModalService'];

    function EmployeesCtrl($scope, $state, $firebaseArray, $firebaseAuth, $stateParams, ModalService) {
        $scope.employees;
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
            showAddEmployeeModal();
        }

        function showAddEmployeeModal(){
            ModalService.showModal({
                templateUrl: 'app/crews/templates/addEmployeeModal.tpl.html',
                controller: 'EmployeeModalCtrl'
            }).then(function(modal){
                modal.element.modal();
                modal.close.then((result) => {
                    $('.modal-backdrop').remove();
                    console.log('Closed ' + result);
                });
            });
        }
        
        function removeEmployee(employee){
            $scope.employees.forEach( (checkEmployee) => {
                if(checkEmployee.$id == employee.$id) employees.$remoove(checkEmployee);
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