(function () {
    'use strict';

    angular
        .module('app')
        .controller('TimeCardCtrl', TimeCardCtrl);

    TimeCardCtrl.$inject = ['$scope', 'close', '$firebaseAuth', '$firebaseArray'];

    function TimeCardCtrl($scope, close, $firebaseAuth, $firebaseArray) {
        let vm2 = this;

        let crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
        $scope.crews = $firebaseArray(crewsRef);

        vm2.submit = () => {
            close(vm2.timeCard, 500);
        };
        vm2.cancel = () => {
            close({}, 500);
        };

        $scope.setTimeCardCrew = crew => vm2.timeCard.crew = crew;
    }
})();
