(function () {
    'use strict';

    angular
        .module('app')
        .controller('TimeEntryCtrl', TimeEntryCtrl);

    TimeEntryCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseObject', '$firebaseAuth', 'ModalService'];

    function TimeEntryCtrl($scope, $state, $firebaseArray, $firebaseObject, $firebaseAuth, ModalService) {
        $scope.clockInCrew = clockInCrew;
        $scope.clockOutCrew = clockOutCrew;
        $scope.clockInEmployee = clockInEmployee;
        $scope.clockOutEmployee = clockOutEmployee;

        $scope.showCrewsTab = showCrewsTab;
        $scope.showEmployeesTab = showEmployeesTab;
        $scope.isShowingCrews = true;

        $scope.showTimeCardModal = showTimeCardModal;

        activate();

        function activate() {
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
            $scope.crews.$loaded().then((data) => {
                $scope.crews = data;
            });

            var employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeesRef);
            $scope.employees.$loaded().then((data) => {
                $scope.employees = data;
            });

            var timeEntriesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('timeEntries');
            $scope.timeEntries = $firebaseArray(timeEntriesRef);
            $scope.timeEntries.$loaded().then((data) => {
                $scope.timeEntries = data;
            });

            var timeCardsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('timeCards');
            $scope.timeCards = $firebaseArray(timeCardsRef);
            $scope.timeCards.$loaded().then((data) => {
                $scope.timeCards = data;
            });
        }

        function clockInCrew(crew) {
            $scope.employees.forEach(employee => {
                if (employee.crew == crew.name) {
                    console.log(employee);
                    clockInEmployee(employee);
                }
            });

        }

        function clockOutCrew(crew) {
            $scope.timeEntries.forEach(entry => {
                if (entry.employee.crew == crew.name) {
                    entry.timeOut = getCurrentDateAndTime();
                    $scope.timeEntries.$save(entry);
                }
            });
        }

        function clockInEmployee(employee) {
            var newTimeEntry = {
                timeIn: getCurrentDateAndTime(),
                timeOut: null,
                timeCardId: null,
                employee: {
                    id: employee.$id,
                    employeeId: employee.employeeId,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    crew: employee.crew
                }
            };
            $scope.timeEntries.$add(newTimeEntry);
        }

        function clockOutEmployee(employee) {
            $scope.timeEntries.forEach(entry => {
                if (entry.employee.id == employee.$id) {
                    entry.timeOut = getCurrentDateAndTime();
                    $scope.timeEntries.$save(entry);
                }
            });
        }

        function showCrewsTab() {
            $scope.isShowingCrews = true;
        }

        function showEmployeesTab() {
            $scope.isShowingCrews = false;
        }

        function showTimeCardModal() {
            ModalService.showModal({
                templateUrl: 'app/timekeeping/templates/timeCard.tpl.html',
                controller: 'TimeCardCtrl',
                controllerAs: 'vm2'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((timeCard) => {
                    addTimeCard(timeCard);
                });
            })
        };

        function addTimeCard(timeCard) {
            $scope.timeCards.$add(timeCard).then(function (ref) {
                for (var i = 0; i < $scope.timeEntries.length; i++) {
                    if (!$scope.timeEntries[i].hasOwnProperty('timeCardId')) {
                        $scope.timeEntries[i].timeCardId = ref.key;
                        $scope.timeEntries.$save($scope.timeEntries[i]);
                    }
                }
            });
        }


        //-- Helper Functions --//

        function getCurrentDateAndTime() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            var hours = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            return mm + '/' + dd + '/' + yyyy + ' ' + hours + ':' + min + ':' + sec;
        }
    }
})();
