/**
 * Created by bob on 6/6/15.
 */
'use strict';
angular.module('httpMailWebClient')
  .controller('LoginCtrl', function($scope, APIService, $state) {
    $scope.invalidUserCredential = false;
    $scope.login = function () {
      if($scope.loginForm.$invalid) {
        return;
      }
      $scope.loginPromise = APIService.login($scope.user).$promise
        .then(function(data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('level', data.level);
          $state.go('home.overview');
        }, function(reason) {
          if(reason.status < 500 && reason.data) {
            $scope.loginForm.$setPristine();
            $scope.invalidUserCredential = true;
            $scope.errorMessage = reason.data.title;
          } else {
            $scope.loginForm.$setPristine();
            $scope.invalidUserCredential = true;
            $scope.errorMessage = "Network Error";
          }
          console.log(reason);
        });
    };
  });
