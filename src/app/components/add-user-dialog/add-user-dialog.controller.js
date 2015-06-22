/**
 * Created by bob on 6/13/15.
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('AddUserDialogCtrl', function($scope, domain, APIService, Session, $modalInstance) {
    $scope.domain = domain;
    var inviteCode = Session.code;
    $scope.addUser = function () {
      var user = {
        user: $scope.userName,
        password: $scope.password
      };

      $scope.addUserPromise = APIService.addUser(angular.extend({
        code: inviteCode,
        id: domain.id
      }, user)).$promise
        .then(function() {
          $modalInstance.close();
        });
    };
  });
