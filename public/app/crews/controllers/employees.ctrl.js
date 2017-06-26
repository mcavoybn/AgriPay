(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$stateParams', 'ModalService'];

    function EmployeesCtrl($scope, $state, $firebaseArray, $stateParams, ModalService) {
        $scope.employees;
        activate();
        
        function activate(){
            var employeesRef = firebase.database().ref().child($stateParams.id).child('employees'); 
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
                modal.close;
            });
        }       
    }
})();