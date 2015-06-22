/**
 * Created by bob on 6/9/15.
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DeleteConfirmDialogCtrl', function($scope, content, confirmText, APIService, Session, domainId, $state, $modalInstance) {
    var inviteCode = Session.code;
    $scope.content = content;

    /**
     * Confirm text is object used for check user input to confirm operation
     * @type {name,text}
     */
    $scope.confirmText = confirmText;
    $scope.deleteDomain = function () {
      $scope.deleteDomainPromise = APIService.deleteDomain({
        id: domainId,
        code: inviteCode
      }).$promise
        .then(function() {
          $modalInstance.close();
          return $state.go('home.domain.list');
        });
    };

  });
