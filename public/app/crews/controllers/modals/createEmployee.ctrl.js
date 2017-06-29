(function() {
    'use strict';

    angular
        .module('app')
        .controller('CreateEmployeeCtrl', CreateEmployeeCtrl);

    CreateEmployeeCtrl.$inject = ['$scope', 'close', '$firebaseAuth', '$firebaseArray'];

    function CreateEmployeeCtrl($scope, close, $firebaseAuth, $firebaseArray) {
        let vm = this;
        vm.employee = {};

        vm.submit = () => {close(vm.employee, 500);};
        vm.cancel = () => {close({}, 500);};
        
        $scope.generateId = () => vm.employee.employeeId = '_' + Math.random().toString(36).substr(2,9);
        
        let crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
        $scope.crews = $firebaseArray(crewsRef);
    }
})();