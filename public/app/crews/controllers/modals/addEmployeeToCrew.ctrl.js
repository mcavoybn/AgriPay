(function() {
    'use strict'
    
    angular
        .module('app')
        .controller('AddEmployeeToCrewCtrl', AddEmployeeToCrewCtrl);
    
    AddEmployeeToCrewCtrl.$inject = ['close', '$firebaseArray', '$firebaseAuth'];
    
    function AddEmployeeToCrewCtrl(close, $firebaseArray, $firebaseAuth) {
        let vm = this;
        vm.employeeList = [];
        vm.crewEmployees = [];
        
        vm.submit = () => {close(vm.crewEmployees, 500);};
        vm.cancel = () => {close([], 500);};
        
        activate();
        
        function activate() {
            let employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
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