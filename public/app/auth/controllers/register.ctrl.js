(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', '$state', '$firebaseAuth'];

    function RegisterCtrl($scope, $state, $firebaseAuth) {
        $scope.submit = submit;
        $scope.email;
        $scope.password;
        $scope.confirmPassword = '';
        $scope.message = '';
        $scope.clickedRegister = false;
        
        function submit(){
            if($scope.password == $scope.confirmPassword){
                $scope.message = '';
                $scope.clickedRegister = true;
                return $firebaseAuth().$createUserWithEmailAndPassword($scope.email, $scope.password)
                    .then( (data) => {
                        $state.go('crews', { id: data.uid } );
                    })
                    .catch( (error) => {
                        $scope.message = error.message;        
                    });
            }else{
                $scope.message = "Passwords did not match!"
            }
        }
    }
})();