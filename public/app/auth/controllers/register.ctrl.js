(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', '$state', '$firebaseAuth'];

    function RegisterCtrl($scope, $state, $firebaseAuth) {
        $scope.submit = submit;
        $scope.clickedRegister = false;
        
        function submit() {
            $scope.clickedRegister = false;

            $firebaseAuth().$createUserWithEmailAndPassword($scope.email, $scope.password)
            .then((data) => {
                $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password)
                .then((data) => { $state.go('crews'); })
            })
            .catch( (error) => { $scope.message = error.message; });
        }
    }
})();