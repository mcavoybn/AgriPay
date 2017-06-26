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
<<<<<<< HEAD
        $scope.uid;
        
        function submit(){
           $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password)
=======
        $scope.clickedLogin = false;
        
        function submit(){
            $scope.clickedLogin = true;
            return $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password)
>>>>>>> 5d3b5705151de3774075c7d18091651adb3d51dd
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
