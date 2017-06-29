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
        $scope.isEmployeeClockedIn = isEmployeeClockedIn;

        $scope.searchText = "";

        $scope.showCrewsTab = showCrewsTab;
        $scope.showEmployeesTab = showEmployeesTab;
        $scope.isShowingCrews = true;

        $scope.showTimeCardModal = showTimeCardModal;

        $scope.showingScanner = false;
        $scope.startBarcodeScanner = startBarcodeScanner;
        $scope.stopBarcodeScanner = stopBarcodeScanner;

        activate();

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
            $scope.timeCards.$add(timeCard).then(function (ref) {
                for (let i = 0; i < $scope.timeEntries.length; i++) {
                    if (!$scope.timeEntries[i].hasOwnProperty('timeCardId')) {
                        $scope.timeEntries[i].timeCardId = ref.key;
                        $scope.timeEntries.$save($scope.timeEntries[i]);
                    }
                }
            });
        }

        function clockInCrew(crew) {
            $scope.employees.forEach(employee => {
                if (employee.crew == crew.name) {
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
            let count = crew.count;
            $scope.timeEntries.forEach(entry => {
                if (entry.employee.crew == crew.name &&
                    entry.hasOwnProperty('timeIn') &&
                    !entry.hasOwnProperty('timeOut')) {
                    count--;
                    console.log("Employee " + entry.employee.lastName + " " + entry.employee.firstName + "is clocked in");
                }
            });
            return count == 0;
        }

        function isEmployeeClockedIn(employee) {
            let result = false;
            $scope.timeEntries.forEach(entry => {
                if (entry.employee.id == employee.$id &&
                    entry.hasOwnProperty('timeIn') &&
                    !entry.hasOwnProperty('timeOut')) {
                    console.log("Employee " + employee.lastName + " " + employee.firstName + "is clocked in");
                    result = true;
                }
            });
            return result;
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
            }, function (err) {
                if (err) { console.log(err); return; }                
                Quagga.start();
                Quagga.onDetected(data => {
                    $('#barcodeScanner').css('border', '10px solid green');
                    console.log("Scan result=" + data.codeResult.code);
                    $scope.employees.forEach(employee => {
                        if (employee.employeeId == data.codeResult.code) {
                            console.log('Found Match!');
                            $scope.searchText = employee.lastName;
                        }
                    });
                });
                Quagga.onProcessed(data => {
                    $('#barcodeScanner').css('border', '10px solid red');
                    console.log("Scanning for barcode")
                });
            });          
        }

        function stopBarcodeScanner() {
            $scope.showingScanner = false;
            Quagga.stop();
        }

        //-- Helper Functions --//

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
    }
})();
