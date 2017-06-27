(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewCtrl', CrewCtrl);
    
    CrewCtrl.$inject = ['$scope', '$stateParams', '$firebaseObject', '$firebaseAuth'];
    
    function CrewCtrl($scope, $stateParams, $firebaseObject, $firebaseAuth) {
        $scope.isEditingCrew = false;
        $scope.editCrew = editCrew;
        $scope.saveCrew = saveCrew;
        $scope.deleteCrew = deleteCrew;
        $scope.addEmployeeToCrew = addEmployeeToCrew;
        
        activate();
        
        function activate() {
            var crewRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews').child($stateParams.id);
            $scope.crew = $firebaseObject(crewRef);
        }
        
        function editCrew() {
            $scope.isEditingCrew = true;
            
        }
        
        function addEmployeeToCrew() {
            
        }
        
        function saveCrew() {
            $scope.crew.$save().then((data) => {
                
            }).catch((error) => {
                console.log(error);
            });
            
           $scope.isEditingCrew = false;
        }
        
        function deleteCrew() {
            $scope.crew.$remove();
        }
    }
})();