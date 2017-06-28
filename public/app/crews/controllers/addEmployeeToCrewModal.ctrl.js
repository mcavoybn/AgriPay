(function() {
    'use strict'
    
    angular
        .module('app')
        .controller('AddEmployeeToCrewModalCtrl', AddEmployeeToCrewModalCtrl);
    
    AddEmployeeToCrewModalCtrl.$inject = ['close', '$firebaseArray', '$firebaseAuth'];
    
    function AddEmployeeToCrewModalCtrl(close, $firebaseArray, $firebaseAuth) {
        var vm = this;
        vm.employeeList = [];
        vm.crewEmployees = [];
        
        vm.submit = () => {close(vm.crewEmployees, 500);};
        vm.cancel = () => {close([], 500);};
        
        activate();
        
        function activate() {
            var employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            vm.employeeList = $firebaseArray(employeeRef);
        }
        
        vm.saveResults = () => {
            $("input:checkbox[name=employeeList]:checked").each(function() {
                vm.crewEmployees.push($(this).val());
            });
            
            vm.submit();
        }
    }
})();