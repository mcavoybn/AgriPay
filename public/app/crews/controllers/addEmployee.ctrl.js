(function() {
    'use strict';

    angular
        .module('app')
        .controller('AddEmployeeCtrl', AddEmployeeCtrl);

    AddEmployeeCtrl.$inject = ['$scope', 'close'];

    function AddEmployeeCtrl($scope, close) {
         var vm = this;
        vm.employee = {};

        vm.submit = () => {close(vm.employee, 500);};
        vm.cancel = () => {close({}, 500);};
    }
})();