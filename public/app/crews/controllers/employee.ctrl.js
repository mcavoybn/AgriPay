(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeCtrl', EmployeeCtrl);

    EmployeeCtrl.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$stateParams', 'ModalService'];

    function EmployeeCtrl($scope, $state, $firebaseArray, $firebaseObject, $firebaseAuth, $stateParams, ModalService) {
        $scope.editEmployee = editEmployee;
        $scope.saveEmployee = saveEmployee;
        $scope.goBack = goBack;
        $scope.isEditing = false;
        $scope.employee;
        $scope.assignCrew = assignCrew;
        $scope.clickedShow = false;
        $scope.clickShow = clickShow;
        
        activate();

        function activate(){
            var employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees').child($stateParams.employeeId); 
            $scope.employee = $firebaseObject(employeeRef);
            $scope.employee.$loaded().then((data) => {
                $scope.employee = data;
            });            
            console.log("employee=")
            console.log($scope.employee)
            
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
            $scope.crews.$loaded().then((data) => {
               $scope.crews = data; 
            });
        }   
        
        function assignCrew(crew){
            $scope.employee.crew = crew;
        }

        function editEmployee(){
            $scope.isEditing = true;
        }

        function saveEmployee(){
            $scope.isEditing = false;
            $scope.employee.$save();
        }
        
        function goBack(){
            $state.go('employees');
        }

        function clickShow(){
            if($scope.clickedShow == false){
                $scope.clickedShow = true;
            }else{
                $scope.clickedShow = false;
            }
        }
    }
})();