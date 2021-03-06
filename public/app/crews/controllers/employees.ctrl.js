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
                modal.close.then(employee => {
                    employee.crewID = getCrewId(employee.crew);
                    $scope.employees.$add(employee);
                });
            });
        }

        function getCrewId(crewName) {
            let crewId = "";
            $scope.crews.forEach(checkCrew => {
                if (crewName == checkCrew.name) {
                    crewId = checkCrew.$id;
                }
            });
            return crewId;
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
