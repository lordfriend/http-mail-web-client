/**
 * Created by bob on 6/13/15.
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('AddUserDialogCtrl', function($scope, domain, APIService, $modalInstance) {
    $scope.domain = domain;
    $scope.addUser = function () {
      var user = {
        user: $scope.userName,
        password: $scope.password
      };

      $scope.addUserPromise = APIService.addUser(angular.extend({
        id: domain.id
      }, user)).$promise
        .then(function() {
          $modalInstance.close();
        });
    };
  });
