(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewsCtrl', CrewsCtrl);
    
    CrewsCtrl.$inject = ['$scope', '$stateParams', '$firebaseArray', 'ModalService'];
    
    function CrewsCtrl($scope, $stateParams, $firebaseArray, ModalService) {
        $scope.showCreateCrewForm = showCreateCrewForm;
        
        activate();
        
        function activate() {
            var crewsRef = firebase.database().ref().child($stateParams.id).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }
        
        function showCreateCrewForm() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/createCrewModal.tpl.html',
                controller: 'ModalCtrl'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((result) => {
                    console.log('Closed ' + result);
                });
            });
        }
    }
})();