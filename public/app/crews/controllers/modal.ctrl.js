(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalCtrl', ModalCtrl);

    ModalCtrl.$inject = ['$scope', '$state', '$firebaseAuth', '$firebaseArray', 'close'];

    function ModalCtrl ($scope, $state, $firebaseAuth, $firebaseArray, close) {
        $scope.createCrew = createCrew;
        $scope.close = function(result) {
            close(result, 400);
        }

        activate();

        function activate() {
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }

        function createCrew() {
            /* MAKE IF NAME EXISTS DONT CREATE */
            $scope.crews.$add({
                name: $('#name').val(),
                manager: $('#manager').val(),
                photo: $('#photo').val(),
                count: 0
            }).then((err) => {
                console.log(err);  
            });
            /*$scope.employeeCount.length++;*/
        }
    }
})();