(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$window', '$scope', '$state', '$firebaseArray', '$firebaseAuth', 'ModalService'];

    function EmployeesCtrl($window, $scope, $state, $firebaseArray, $firebaseAuth, ModalService) {
        $scope.addEmployee = addEmployee;
        $scope.removeEmployee = removeEmployee;
        $scope.selectEmployee = selectEmployee;

        activate();

        function activate() {
            const employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeesRef);
            
            const crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }

        function addEmployee() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/modals/createEmployee.tpl.html',
                controller: 'CreateEmployeeCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then( employee => {
                    $scope.employees.$add(employee);   
                    console.log("employee.crew= "+employee.crew)
                    incrementCrewCount(employee.crew);
                });
            });
        }
        
        function incrementCrewCount(crew){
            $scope.crews.forEach( checkCrew => {
               if(crew.name == checkCrew.name){
                   crew.count++;
                   crew.$save();
               } 
            });
        }

        function removeEmployee(employee) {
            if (confirm("Delete employee?")) $scope.employees.$remove(employee);
        }

        function selectEmployee(employee) {
            $state.go('employee', {
                employeeId: employee.$id
            });
        }
    }
})();
