/**
 * DKIM settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DkimCtrl', function($scope, APIService) {

    var listDKIM = function () {
      return APIService.getDKIM({
        id: $scope.domain.id
      }).$promise
        .then(function(data) {
          return $scope.currentDKIM = data;
        });
    };

    $scope.DKIM = {};

    $scope.updateDKIM = function () {
      $scope.dkimPromise = APIService.updateDKIM(angular.extend({
        id: $scope.domain.id
      }, $scope.DKIM)).$promise
        .then(function() {
          return listDKIM();
        })
    };

    $scope.dkimPromise = listDKIM();
  });
