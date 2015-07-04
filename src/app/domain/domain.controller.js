/**
 * domain controller
 */
'use strict';

angular.module('httpWebMailClient')
  .controller('DomainCtrl', function($scope) {

    $scope.level = localStorage.level || 1;

    $scope.deleteDomain = function () {
      $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          content: function() {
            return 'This action <strong>CANNOT</strong> be undone. This will permanently delete the domain <strong>' +
              $scope.currentDomain.name + '</strong> and all users, emails under the domain.';
          },
          confirmText: function() {
            return {
              name: 'domain',
              text: $scope.currentDomain.name
            };
          },
          domainId: function() {
            return $scope.currentDomain.id;
          }
        }
      });

    };


  });
