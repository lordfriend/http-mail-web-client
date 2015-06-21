/**
 * Created by bob on 6/6/15.
 */
'use strict';
angular.module('httpMailWebClient')
  .controller('LoginCtrl', function($scope, APIService, Session, $state) {
    $scope.login = function (code) {
      $scope.loginPromise = APIService.testInviteCode({
        code: code
      }).$promise
        .then(function() {
          Session.updateInviteCode(code);
          $state.go('home');
        });
    };
  });
