/**
 * DKIM settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DkimCtrl', function($scope, APIService) {

    var listDkim = function () {
      return APIService.getDkim({
        id: $scope.domain.id
      }).$promise
        .then(function(data) {
          $scope.selector = data.selector;
          return $scope.dkim = data;
        });
    };


    $scope.updateDkim = function () {
      $scope.dkimPromise = APIService.updateDkim({
        selector: $scope.dkim.selector,
        private_key: $scope.private_key
      }).$promise
        .then(function() {
          return listDkim();
        })
    };

    $scope.dkimPromise = listDkim();
  });
