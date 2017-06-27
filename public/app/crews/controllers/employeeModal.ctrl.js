(function() {
    'use strict';

    angular
        .module('app')
        .controller('EmployeeModalCtrl', EmployeeModalCtrl);

    EmployeeModalCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseArray', '$firebaseAuth', 'ModalService'];

    function EmployeeModalCtrl($scope, $state, $stateParams, $firebaseArray, $firebaseAuth, ModalService) {
        $scope.employees;
        $scope.employee;
        activate();

        function activate(){
            var authObj = $firebaseAuth($stateParams.id);
            var authData = authObj.$getAuth();
            console.log('authData=')
            console.log(authData);
            var uid;
            if(authData){
                uid = authData.uid;
                var employeesRef = firebase.database().ref().child(uid).child('employees'); 
                $scope.employees = $firebaseArray(employeesRef);
            }else{
                var employeesRef = firebase.database().ref().child("no-uid").child('employees'); 
                $scope.employees = $firebaseArray(employeesRef);
            }    
            $scope.employees.$loaded().then((data) => {
                $scope.employees = data;
            });
        }

        function submit(){
            $scope.employees.$add($scope.employee);
            $scope.employees.$save();
        }
    }
})();