(function() {
    'use strict';

    angular
        .module('app')
        .controller('CreateEmployeeCtrl', CreateEmployeeCtrl);

    CreateEmployeeCtrl.$inject = ['$scope', 'close', '$firebaseAuth', '$firebaseArray'];

    function CreateEmployeeCtrl($scope, close, $firebaseAuth, $firebaseArray) {
        var vm = this;
        vm.employee = {};

        vm.submit = () => {close(vm.employee, 500);};
        vm.cancel = () => {close({}, 500);};

        var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
        $scope.crews = $firebaseArray(crewsRef);
        $scope.crews.$loaded().then((data) => {
           $scope.crews = data; 
        });
    }
})();