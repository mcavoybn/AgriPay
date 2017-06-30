(function () {
    'use strict';

    angular
    .module('app')
    .controller('TimeCardCtrl', TimeCardCtrl);

    TimeCardCtrl.$inject = ['close', '$firebaseAuth', '$firebaseArray'];

    function TimeCardCtrl(close, $firebaseAuth, $firebaseArray) {
        let vm = this;

        vm.cancel = () =>  close({}, 500);
        vm.setTimeCardCrew = crew => vm.timeCard.crew = crew;
        vm.submit = () => close(vm.timeCard, 500);

        activate();

        /////////////////////

        function activate() {
            const crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }

    }
})();
