(function() {
    'use strict';
    
    angular
    .module('app')
    .controller('CrewCtrl', CrewCtrl);
    
    CrewCtrl.$inject = ['$scope', '$state', '$stateParams', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'ModalService'];
    
    function CrewCtrl($scope, $state, $stateParams, $firebaseObject, $firebaseArray, $firebaseAuth, ModalService) {
        $scope.isEditingCrew = false;

        $scope.addEmployeeToCrew = addEmployeeToCrew;
        $scope.deleteCrew = deleteCrew;
        $scope.editCrew = editCrew;
        $scope.removeEmployeeFromCrew = removeEmployeeFromCrew;
        $scope.saveCrew = saveCrew;    
        
        activate();

        //////////////////////
        var employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees'); 
        function activate() {
            const crewRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('crews').child($stateParams.id);
            $scope.crew = $firebaseObject(crewRef); 
            
            const employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees'); 
            $scope.allEmployees = $firebaseArray(employeesRef);
            $scope.crewEmployees = $firebaseArray(employeesRef.orderByChild('crewID').equalTo($scope.crew.$id));
        }   

        function addEmployeesById(employeeKeys) {
            console.log("adding employees by id!")
            const employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees'); 
            employeeKeys.forEach( (key) => {
//                let employee = $firebaseObject(employeesRef.child(key));
                let employeeRef = employeesRef.child(key);
                employeeRef.update({
                   "crewID"  : $scope.crew.$id,
                    "crew" : $scope.crew.name
                });
                $scope.crew.count++;
                $scope.crew.$save();
            });            
        }
        
        function addEmployeeToCrew() {
            ModalService.showModal({
                templateUrl: 'app/crews/templates/modals/addEmployeeToCrew.tpl.html',
                controller: 'AddEmployeeToCrewCtrl',
                controllerAs: 'vm'
            }).then((modal) => {
                modal.element.modal();
                modal.close.then((employeeKeys) => { 
                    addEmployeesById(employeeKeys)
                });
            });
        }
        
        function deleteCrew() {
            $scope.crew.$remove()
            .then( data => $state.go('crews') )
            .catch( console.log );
            
        }
        
        function editCrew() {
            $scope.isEditingCrew = true;
        }        
        
        function removeEmployeeFromCrew(employee) {
            let ref = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees').child(employee.$id);
            ref.update({ "crewID" : null });            
            $scope.crew.count--;
        }

        function saveCrew() {
            $scope.crew.$save();            
            $scope.isEditingCrew = false;
        }
    }
})();