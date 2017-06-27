(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimeEntryCtrl', TimeEntryCtrl);

    TimeEntryCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$stateParams', 'ModalService'];

    function TimeEntryCtrl($scope, $state, $firebaseArray, $firebaseObject, $firebaseAuth, $stateParams, ModalService) {
        $scope.crews;
        $scope.employees;
        $scope.clockInCrew = clockInCrew;
        $scope.clockOutCrew = clockOutCrew;
        $scope.clockInEmployee = clockInEmployee;
        $scope.clockOutEmployee = clockOutEmployee;
        
        $scope.showCrewsTab = showCrewsTab;
        $scope.showEmployeesTab = showEmployeesTab;
        $scope.isShowingCrews = true;
        
        activate();
        
        function activate(){
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
        }
        
        function clockInCrew(crew){
            
        }
        
        function clockOutCrew(crew){
            
        }
        
        function clockInEmployee(employee){
            
        }
        
        function clockOutEmployee(employee){
                
        }
        
        function showCrewsTab(){
            $scope.isShowingCrews = true;
        }
        
        function showEmployeesTab(){
            $scope.isShowingCrews = false;
        }
        
    }
})();