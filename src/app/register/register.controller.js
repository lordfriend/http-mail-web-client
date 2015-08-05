/**
 * Register controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('RegisterCtrl', function($scope, APIService, $q, $state) {
    $scope.user = {};
    $scope.register = function() {
      if($scope.registerForm.$invalid) {
        return;
      }
      $scope.registerPromise = APIService.register($scope.user).$promise
        .then(function() {
          return APIService.login({
            username: $scope.user.username,
            password: $scope.user.password
          }).$promise;
        })
        .then(function(data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('level', data.level);
          $state.go('home.overview');
        }, function(reason) {
          return $q.reject(reason);
        });
    }
  });
