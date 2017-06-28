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
        activate();
        var crewsRef;
        var employeeRef;

        function activate(){
            employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees').child($stateParams.employeeId); 
            crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
            $scope.employee = $firebaseObject(employeeRef);
            $scope.employee.$loaded().then((data) => {
                $scope.employee = data;
            });            
        }   

        function editEmployee(){
            $scope.isEditing = true;
        }

        function saveEmployee(){
            $scope.isEditing = false;
            $scope.employee.$save();
//            var crewsSwitchRef = crewsRef.child('name').equalTo($scope.employee.crew);
//            console.log(crewsSwitchRef);
//            employeeRef.update({
//                "crewID": crewsSwitchRef.$id
//            });
        }
        
        function goBack(){
            $state.go('employees');
        }
    }
})();