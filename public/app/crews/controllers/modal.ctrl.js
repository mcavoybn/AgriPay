(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalCtrl', ModalCtrl);

    ModalCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseAuth','$firebaseArray', 'close'];

    function ModalCtrl ($scope, $state, $stateParams, $firebaseAuth, $firebaseArray, close) {
        $scope.createCrew = createCrew;
        $scope.close = function(result) {
            console.log("Result: " + result);
            close(result, 400);
        }

        activate();

        function activate() {
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }

        function createCrew() {
            var name = $('#name').val();
            var manager = $('#manager').val();
            var photo = $('#photo').val();

            /* MAKE IF NAME EXISTS DONT CREATE */
            $scope.crews.$add({
                name: name,
                manager: manager,
                photo: photo,
                count: 0
            }).then((err) => {
                           
            });
            /*$scope.employeeCount.length++;*/
        }
    }
})();