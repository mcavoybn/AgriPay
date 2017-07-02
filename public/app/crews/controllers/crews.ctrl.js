(function () {
    'use strict';

    angular
        .module('app')
        .controller('CrewsCtrl', CrewsCtrl);

    CrewsCtrl.$inject = ['$scope', '$firebaseAuth', '$firebaseArray', 'ModalService'];

    function CrewsCtrl($scope, $firebaseAuth, $firebaseArray, ModalService) {
        $scope.createCrew = createCrew;
        $scope.getCrewCount = getCrewCount;
        activate();

        function activate() {
            const crewsRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews');
            $scope.crews = $firebaseArray(crewsRef);
            
            const employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeesRef);
        }
        
        function getCrewCount(crew){
            let count = 0;
            $scope.employees.forEach( employee => {
               if(crew.$id == employee.crewID){
                   count++;
               } 
            });
            return count;
        }
        
        function createCrew() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/modals/createCrew.tpl.html',
                controller: 'CreateCrewCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((crew) => { 
                    if(!crew.hasOwnProperty('photo')){
                        crew.photo="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-group-512.png";
                    }
                    $scope.crews.$add(crew);
                });
            });
        }
    }
})();