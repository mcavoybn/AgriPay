(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewCtrl', CrewCtrl);
    
    CrewCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'ModalService'];
    
    function CrewCtrl($scope, $state, $stateParams, $firebaseObject, $firebaseArray, $firebaseAuth, ModalService) {
        $scope.isEditingCrew = false;
        $scope.editCrew = editCrew;
        $scope.saveCrew = saveCrew;
        $scope.deleteCrew = deleteCrew;
        $scope.addEmployeeToCrew = addEmployeeToCrew;
        $scope.removeEmployeeFromCrew = removeEmployeeFromCrew;
        var employeeRef;
        var crewRef;
        
        activate();
        
        function activate() {
            crewRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews').child($stateParams.id);
            $scope.crew = $firebaseObject(crewRef);
            employeeRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees');
            $scope.employees = $firebaseArray(employeeRef.orderByChild('crewID').equalTo($scope.crew.$id));
            $scope.allEmployees = $firebaseArray(employeeRef);
        }
        
        function editCrew() {
            $scope.isEditingCrew = true;
            
        }
        
        function addEmployeeToCrew() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/addEmployeeToCrewModal.tpl.html',
                controller: 'AddEmployeeToCrewModalCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((crewEmployeeIDList) => {
                    for(var id in crewEmployeeIDList) {
                        var empRef = employeeRef.child(crewEmployeeIDList[id]);
                        var crewCountRef = crewRef.child('count');
                        crewCountRef.transaction((currentCount) => {
                            return currentCount + 1;
                        });
                        empRef.update({
                            "crewID": $scope.crew.$id,
                            "crew" : $scope.crew.name
                        });
                    }
                });
            });
        }
        
        function saveCrew() {
            $scope.crew.$save().then((data) => {
                
            }).catch((error) => {
                console.log(error);
            });
            
           $scope.isEditingCrew = false;
        }
        
        function deleteCrew() {
            $scope.crew.$remove().then((data) => {
                $state.go('crews');
            }).catch((error) => {
                console.log(error);
            });
            
        }
        
        function removeEmployeeFromCrew(employee) {
            employeeRef.child(employee.$id).update({
                "crewID": null
            });
            $scope.crew.count--;
        }
    }
})();