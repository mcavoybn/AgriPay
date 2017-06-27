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
        activate();

        function activate(){
            var authObj = $firebaseAuth($stateParams.id);
            var authData = authObj.$getAuth();
            console.log('authData=')
            console.log(authData);
            var uid;
            if(authData){
                uid = authData.uid;
                console.log(uid)
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

        function addEmployee(){
            showAddEmployeeModal();
        }

        function showAddEmployeeModal(){
            ModalService.showModal({
                templateUrl: 'app/crews/templates/addEmployeeModal.tpl.html',
                controller: 'EmployeeModalCtrl'
            }).then(function(modal){
                modal.element.modal();
                modal.close;
            });
        }

        function selectEmployee(employee){
            $state.go('employee', {id:$stateParams.id, employeeId: employee.$id} );
        }
    }
})();