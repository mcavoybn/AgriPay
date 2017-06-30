(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseAuth', 'ModalService'];

    function EmployeesCtrl($scope, $state, $firebaseArray, $firebaseAuth, ModalService) {
        $scope.createEmployee = createEmployee;
        $scope.removeEmployee = removeEmployee;
        $scope.selectEmployee = selectEmployee;

        activate();

        function activate() {
            const employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeesRef);

            const crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }

        function createEmployee() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/modals/createEmployee.tpl.html',
                controller: 'CreateEmployeeCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
<<<<<<< HEAD
                modal.close.then(employee => {
                    $scope.employees.$add(employee);
                    $scope.crews.forEach(checkCrew => {
                        if (checkCrew.$id == employee.crewID) {
                            checkCrew.count++;
                            checkCrew.$save();
                        }
                    });
                });
            });
        }
=======
                modal.close.then( employee => {
                    $scope.employees.$add(employee);   
                    console.log("employee.crew: ", employee.crew)
                    incrementCrewCount(employee.crew);
                });
            });
        }
        
        function incrementCrewCount(crew){
            $scope.crews.forEach( checkCrew => {
               if(crew.name == checkCrew.name) {
                   crew.count++;
                   crew.$save();
               } 
            });
        }
>>>>>>> 632420683cb96c0d86df71ce83dba3e0cdb1cd04

        function removeEmployee(employee) {
            if (confirm("Delete employee?")) $scope.employees.$remove(employee);
        }

        function selectEmployee(employee) {
            $state.go('employee', { employeeId: employee.$id });
        }
    }
})();
