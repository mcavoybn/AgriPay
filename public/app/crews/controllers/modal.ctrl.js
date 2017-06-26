(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalCtrl', ModalCtrl);

    ModalCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseArray', 'close'];

    function ModalCtrl ($scope, $state, $stateParams, $firebaseArray, close) {
        $scope.createCrew = createCrew;
        $scope.close = close;

        activate();

        function activate() {
            var crewsRef = firebase.database().ref().child($stateParams.id).child('crews');
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
                $('.modal').remove();
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();                
            });
            /*$scope.employeeCount.length++;*/
        }

        function close() {
            /* FIX THE MODAL CLOSING */
        }
    }
})();