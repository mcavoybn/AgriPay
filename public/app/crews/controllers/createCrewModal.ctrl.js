(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateCrewModalCtrl', CreateCrewModalCtrl);

    CreateCrewModalCtrl.$inject = ['$scope', 'close'];

    function CreateCrewModalCtrl($scope, close) {
        var vm = this;
        vm.crew = {};
        
        vm.submit = () => {close(vm.crew, 500);};
        vm.cancel = () => {close({}, 500);};
    }
})();