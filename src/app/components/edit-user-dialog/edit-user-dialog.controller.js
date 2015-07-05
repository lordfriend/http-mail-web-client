/**
 * Created by bob on 6/19/15.
 */

'use strict';

angular.module('httpMailWebClient')
  .controller('EditUserDialogCtrl', function($scope, user, domain, APIService, $modalInstance) {
    $scope.user = user;
    $scope.updateUser = function () {

      $scope.editUserPromise = APIService.updateUser({
        id: domain.id,
        uid: user.id,
        password: $scope.password
      }).$promise
        .then(function() {
          $modalInstance.close();
        });
    };
  });
