/**
 * domain controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DomainCtrl', function($scope, domain, APIService) {
    $scope.domain = domain;
    $scope.setActionBarTitle(domain.name);

    $scope.setActionMenu([
      {
        icon: 'fa-trash',
        name: 'Delete Domain',
        action: function () {
          $scope.deleteDomain($scope.domain);
        }
      }
    ]);
    $scope.level = localStorage.level || 1;

    APIService.servers().$promise
      .then(function (data) {
        $scope.serverList = data.result;
      });

  });
