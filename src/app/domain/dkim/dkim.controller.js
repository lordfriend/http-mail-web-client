/**
 * DKIM settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DkimCtrl', function($scope, APIService, PromiseErrorHandler) {


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
      if($scope.dkimForm.$invalid) {
        return;
      }

      $scope.dkimForm.$setPristine();

      $scope.dkimPromise = APIService.updateDKIM(angular.extend({
        id: $scope.domain.id
      }, $scope.DKIM)).$promise
        .then(function() {
          return listDKIM();
        }, function (reason) {
          $scope.dkimForm.$setDirty();
          return $q.reject(reason);
        })
        .catch(PromiseErrorHandler.network);
    };

    $scope.dkimPromise = listDKIM()
      .catch(PromiseErrorHandler.network);
  });
