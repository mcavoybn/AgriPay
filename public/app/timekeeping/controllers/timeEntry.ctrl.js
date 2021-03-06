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

        $scope.isCrewClockedIn = isCrewClockedIn;
        $scope.isCrewEmpty = isCrewEmpty;
        $scope.isEmployeeClockedIn = isEmployeeClockedIn;

        $scope.scannerResult = "";

        $scope.showCrewsTab = () => $scope.isShowingCrews = true;
        $scope.showEmployeesTab = () => {
            $scope.isShowingCrews = false; /* Update input with scannerResult $('#searchText').val(scannerResult); */
        }
        $scope.isShowingCrews = true;

        $scope.showTimeCardModal = showTimeCardModal;

        $scope.showingScanner = false;
        $scope.scanResultEmployee = {};
        $scope.startBarcodeScanner = startBarcodeScanner;
        $scope.stopBarcodeScanner = () => {
            $scope.showingScanner = false;
            Quagga.stop();
        }

        activate();

        /////////////////////

        function activate() {
            const crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);

            const employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeesRef);

            const timeEntriesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('timeEntries');
            $scope.timeEntries = $firebaseArray(timeEntriesRef);

            const timeCardsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('timeCards');
            $scope.timeCards = $firebaseArray(timeCardsRef);

        }

        function addTimeCard(timeCard) {
            let timeEntries = _.filter($scope.timeEntries, (entry) => {
                return entry.hasOwnProperty('timeCardId')
            });

            $scope.timeCards.$add(timeCard).then(timeCard => {
                timeEntries.forEach(entry => {
                    entry.timeCardId = timeCard.key;
                    $scope.timeEntries.$save(entry);
                });
            });
        }

        function clockInCrew(crew) {
            let crewEmployees = _.filter($scope.employees, (employee) => {
                return employee.crewID === crew.$id
            });
            crewEmployees.forEach(employee => clockInEmployee(employee));
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
            let newTimeEntry = {
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

        function isCrewClockedIn(crew) {
            let crewCount = getCrewCount(crew);
            $scope.timeEntries.forEach(entry => {
                if (entry.employee.crew == crew.name &&
                    entry.hasOwnProperty('timeIn') &&
                    !entry.hasOwnProperty('timeOut')) {
                    crewCount--;
                }
            });
            return crewCount == 0;
        }

        function isCrewEmpty(crew) {
            return getCrewCount(crew) == 0 ? "Can't clock in, this crew is Empty!" : "";
        }

        function isEmployeeClockedIn(employee) {
            let result = false;
            $scope.timeEntries.forEach(entry => {
                if (entry.employee.id == employee.$id &&
                    entry.hasOwnProperty('timeIn') &&
                    !entry.hasOwnProperty('timeOut')) {
                    result = true;
                }
            });
            return result;
        }

        function showTimeCardModal() {
            ModalService.showModal({
                templateUrl: 'app/timekeeping/templates/timeCard.tpl.html',
                controller: 'TimeCardCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((timeCard) => addTimeCard(timeCard));
            })
        };

        function startBarcodeScanner() {
            $scope.showingScanner = true;
            Quagga.init({
                inputStream: {
                    name: "Barcode Scanner",
                    type: "LiveStream",
                    target: document.querySelector('#barcodeScanner')
                },
                decoder: {
                    readers: ["code_128_reader"]
                }
            }, scannerError);
        }

        function scannerError(err) {
            if (err) {
                console.log(err);
                return;
            }
            Quagga.start();
            Quagga.onDetected(data => {
                $('#scannerIndicator').css('color', 'green');
                console.log("Barcode Detected! Scan result: ", data.codeResult.code);
                $scope.employees.forEach(employee => {
                    if (employee.employeeId == data.codeResult.code) {
                        $('#scanResultEmployeeName').text(employee.firstName + ' ' + employee.lastName);
                        $scope.scanResultEmployee = employee;
                    }
                });
            });
            Quagga.onProcessed(data => {
                $('#scannerIndicator').css('color', 'red');
            });
        }

        function getCurrentDateAndTime() {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let hours = today.getHours();
            let min = today.getMinutes();
            let sec = today.getSeconds();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            return mm + '/' + dd + '/' + yyyy + ' ' + hours + ':' + min + ':' + sec;
        }

        function getCrewCount(crew) {
            let count = 0;
            $scope.employees.forEach(employee => {
                if (crew.$id == employee.crewID) {
                    count++;
                }
            });
            return count;
        }
    }



})();
