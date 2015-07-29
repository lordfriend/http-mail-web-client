/**
 * domain controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DomainCtrl', function($scope, domain, APIService) {
    $scope.domain = domain;
    $scope.setActionBarTitle(domain.name);
    $scope.level = localStorage.level || 1;

    APIService.servers().$promise
      .then(function (data) {
        $scope.serverList = data.result;
      });

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
