/**
 * Created by bob on 6/6/15.
 */
'use strict';
angular.module('httpMailWebClient')
  .controller('LoginCtrl', function($scope, APIService, Session, $state) {
    $scope.login = function () {
      var code = $scope.inviteCode;
      APIService.testInviteCode({
        code: code
      }).$promise
        .then(function() {
          Session.updateInviteCode(code);
          $state.go('home');
        });
    };
  });
