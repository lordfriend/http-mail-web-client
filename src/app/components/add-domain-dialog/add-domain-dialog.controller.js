/**
 * Created by bob on 6/11/15.
 */
'use strict';
angular.module('httpMailWebClient')
  .controller('AddDomainDialogCtrl', function($scope, $modalInstance, APIService, Session) {
    var inviteCode = Session.code;
    $scope.addDomain = function() {
      $scope.addDomainPromise = APIService.createDomain({
        code: inviteCode,
        domain: $scope.domainName.trim()
      }).$promise
        .then(function() {
          $modalInstance.close();
        }, function() {
          console.log('Failed to add domain');
        });
    };
  });
