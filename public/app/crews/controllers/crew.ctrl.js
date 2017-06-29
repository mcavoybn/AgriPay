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
            
            var employeesRef = firebase.database().ref().child($firebaseAuth().$getAuth().uid).child('employees'); 
            $scope.allEmployees = $firebaseArray(employeesRef);
            $scope.crewEmployees = $firebaseArray(employeesRef.orderByChild('crewID').equalTo($scope.crew.$id));
        }

        function addEmployeesById(employeeKeys) {
            employeeKeys.forEach( (key) => {
                const employee = $firebaseObject(employeesRef.child(key));

                employee.$bindTo($scope, 'employee').then((ref) => {                    
                    $scope.employee.crewID = $scope.crew.$id;
                    $scope.employee.crew = $scope.crew.name;
                });

                $scope.crew.count += 1;
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
            employee.crewID = null;
            $scope.crewEmployees.$save(employee);

            $scope.crew.count--;
            $scope.crew.$save();
        }

        function saveCrew() {
            $scope.crew.$save();            
            $scope.isEditingCrew = false;
        }
    }
})();