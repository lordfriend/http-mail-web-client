/**
 * Created by bob on 6/19/15.
 */

'use strict';

angular.module('httpMailWebClient')
  .controller('EditUserDialogCtrl', function($scope, user, domain, APIService, Session, $modalInstance) {
    $scope.user = user;
    var inviteCode = Session.code;
    $scope.updateUser = function () {

      APIService.updateUser({
        code: inviteCode,
        id: domain.id,
        uid: user.id,
        password: $scope.password
      }).$promise
        .then(function() {
          $modalInstance.close();
        });
    };
  });
