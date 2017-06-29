(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateCrewCtrl', CreateCrewCtrl);

    CreateCrewCtrl.$inject = ['close'];

    function CreateCrewCtrl(close) {
        var vm = this;
        vm.crew = {};
        
        vm.submit = () => {close(vm.crew, 500);};
        vm.cancel = () => {close({}, 500);};
    }
})();