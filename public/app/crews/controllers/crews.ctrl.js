(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewsCtrl', CrewsCtrl);
    
    CrewsCtrl.$inject = ['$scope', '$firebaseAuth', '$firebaseArray', 'ModalService'];
    
    function CrewsCtrl($scope, $firebaseAuth, $firebaseArray, ModalService) {
        $scope.showCreateCrewForm = showCreateCrewForm;
        
        activate();
        
        function activate() {
            var crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
        }
        
        function showCreateCrewForm() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/createCrewModal.tpl.html',
                controller: 'ModalCtrl'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((result) => {
                    $('.modal-backdrop').remove();
                    console.log('Closed ' + result);
                });
            });
        }
    }
})();