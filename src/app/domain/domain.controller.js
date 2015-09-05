/**
 * domain controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DomainCtrl', function($scope, APIService, domain) {

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
        var regionMap = {};
        data.result.forEach(function (value) {
          regionMap[value.region_mark] = true;
        });

        $scope.selectorList = [
          {
            group: 'Default',
            id: '0default'
          }
        ];

        Object.keys(regionMap).sort().forEach(function (value) {
          $scope.selectorList.push({
            group: 'By Region',
            id: value
          });
        });

        $scope.serverList.forEach(function (value) {
          $scope.selectorList.push({
            group: 'By Server',
            id: value.server_mark
          })
        });

      });

  });
