(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$firebaseAuth'];

    function LoginCtrl($scope, $state, $firebaseAuth) {
        $scope.submit = submit;
        $scope.email;
        $scope.password;
        $scope.message = "";
        $scope.uid;
        
        function submit(){
           $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password)
                .then( (data) => { 
                    $scope.uid = data.uid;
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
