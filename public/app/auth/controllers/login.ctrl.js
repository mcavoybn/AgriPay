(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$firebaseAuth'];

    function LoginCtrl($scope, $state, $firebaseAuth) {
        $scope.submit;
        $scope.email;
        $scope.password;
        $scope.message = "";
        
        function submit(){
            return $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password)
                .then( (data) => { 
                    $state.go('crews', { id: data.uid } ); 
                })
                .catch( (error) => { 
                    $scope.message = error.message; 
                });                                                                                                   
        }
        
        function forgottenPassword(){
//            return state.go('forgotPassword');
        }
    }
})();
