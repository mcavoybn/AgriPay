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
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);

            var employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeesRef);

            var timeEntriesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('timeEntries');
            $scope.timeEntries = $firebaseArray(timeEntriesRef);

            var timeCardsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('timeCards');
            $scope.timeCards = $firebaseArray(timeCardsRef);           
        }
        
        
        function startBarcodeScanner(){
            $scope.showingScanner = true;
            Quagga.init({
                inputStream : {
                    name : "Barcode Scanner",
                    type : "LiveStream",
                    target: document.querySelector('#barcodeScanner')    // Or '#yourElement' (optional)
                },
                decoder : {
                    readers : ["code_128_reader"]
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();           

                Quagga.onProcessed( data => {
                    $('#barcodeScanner').css('border', '10px solid red');
                });
                
                Quagga.onDetected( data => {
                    $('#barcodeScanner').css('border', '10px solid green');
                    $scope.employees.forEach( employee => {
                        if(employee.firstName == data.codeResult.code){
                            console.log('Found Match!');
                            $scope.searchText = data.codeResult.code;
                        } 
                    });
                });
                
                Quagga.offDetected( data => {
                    $('#barcodeScanner').css('border', '10px solid red');
                })
            }); 
        }
        
        function stopBarcodeScanner(){
            $scope.showingScanner = false;
            Quagga.stop();
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
