/**
 * DKIM settings controller
 */
'use strict';

angular.module('httpWebMailClient')
  .controller('DkimCtrl', function($scope, APIService) {

    var listDkim = function () {
      return APIService.listDkim({
        id: $scope.domain.id
      }).$promise
        .then(function(data) {
          $scope.selector = data.selector;
          return $scope.dkim = data;
        });
    };


    $scope.modifyDkim = function () {
      $scope.dkimPromise = APIService.modifyDkim({
        selector: $scope.dkim.selector,
        private_key: $scope.private_key
      }).$promise
        .then(function(data) {
          return listDkim();
        })
    };

    $scope.dkimPromise = listDkim();
  });
