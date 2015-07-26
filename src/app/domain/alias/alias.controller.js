/**
 * Alias settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('AliasCtrl', function($scope, APIService, $modal) {
    var listAlias = function () {
      return APIService.listAlias({
        id: $scope.domain.id
      }).$promise
        .then(function (data) {
          return $scope.AliasList = data.result;
        });
    };

    listAlias();

    $scope.addAlias = function () {

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

      $scope.listPromise = modalInstance.result
        .then(function() {
          // delete user
          return APIService.deleteAlias({
            id: $scope.domain.id,
            uid: alias.id
          }).$promise;
        })
        .then(function() {
          return listAlias();
        });
    };
  });
