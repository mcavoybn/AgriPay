(function () {
    'use strict';

    angular
        .module('app')
        .controller('CrewsCtrl', CrewsCtrl);

    CrewsCtrl.$inject = ['$scope', '$firebaseAuth', '$firebaseArray', 'ModalService'];

    function CrewsCtrl($scope, $firebaseAuth, $firebaseArray, ModalService) {
        $scope.createCrew = createCrew;
        activate();

        function activate() {
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }
        
        function createCrew() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/createCrewModal.tpl.html',
                controller: 'CreateCrewModalCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((crew) => {
                    $scope.crews.$add(crew);
                });
            });
        }
    }
})();
