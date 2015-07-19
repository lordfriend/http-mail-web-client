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
          $scope.selector = data.selector;
          return $scope.dkim = data;
        });
    };


    $scope.updateDKIM = function () {
      $scope.dkimPromise = APIService.updateDKIM({
        selector: $scope.dkim.selector,
        private_key: $scope.private_key
      }).$promise
        .then(function() {
          return listDKIM();
        })
    };

    $scope.dkimPromise = listDKIM();
  });
