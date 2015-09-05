/**
 * Alias settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('AliasCtrl', function($scope, APIService, $modal, PromiseErrorHandler) {
    var listAlias = function () {
      return APIService.listAlias({
        id: $scope.domain.id
      }).$promise
        .then(function (data) {
          return $scope.aliasList = data.result;
        });
    };

    $scope.listPromise = listAlias()
      .catch(PromiseErrorHandler.network);

    $scope.isAddBCC = false;

    $scope.addAlias = function () {
      $scope.isAddAlias = true;
      $scope.newAlias = {};
    };

    $scope.saveAlias = function () {
      if($scope.newAliasForm.$invalid) {
        return;
      }

      $scope.listPromise = APIService.addAlias(angular.extend({
        id: $scope.domain.id
      }, $scope.newAlias)).$promise
        .then(function () {
          $scope.isAddAlias = false;
          return listAlias();
        })
        .catch(PromiseErrorHandler.network);
    };

    $scope.cancel = function () {
      $scope.isAddAlias = false;
    };

    $scope.deleteAlias = function (alias) {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          content: function() {
            return 'Are your sure to delete this Alias setting? <br/> <strong>Source:</strong> ' + alias.source + ' <strong>Destination:</strong> ' + alias.destination;
          },
          confirmText: function() {
            return null;
          },
          title: function () {
            return 'Confirm Delete Alias Setting'
          }
        }
      });

      modalInstance.result
        .then(function() {
          // delete user
          $scope.listPromise = APIService.deleteAlias({
            id: $scope.domain.id,
            uid: alias.id
          }).$promise
            .then(function() {
              return listAlias();
            })
            .catch(PromiseErrorHandler.network);
        });
    };
  });
