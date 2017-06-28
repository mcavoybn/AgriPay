(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimeCardCtrl', TimeCardCtrl);

    TimeCardCtrl.$inject = ['$scope', 'close'];

    function TimeCardCtrl($scope, close) {
        var vm2 = this;
        vm2.employee = {};

        vm2.submit = () => {close(vm2.timeCard, 500);};
        vm2.cancel = () => {close({}, 500);};
        
        $scope.setTimeCardCrew = crew => vm2.timeCard.crew = crew;
    }
})();