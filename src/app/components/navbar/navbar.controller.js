'use strict';

angular.module('httpMailWebClient')
  .controller('NavbarCtrl', function ($scope, $state, APIService, $q) {
    $scope.username = localStorage.getItem('username');

    $scope.logout = function () {
      APIService.logout({}).$promise
        .then(function(){
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('level');
          $state.go('login');
        }, function(reason) {
          return $q.reject(reason);
        });

    }
  });
