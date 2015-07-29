/**
 * BCC settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('BccCtrl', function($scope, APIService, $modal) {

    var listBCC = function() {
      return APIService.listBCC({
        id: $scope.domain.id
      }).$promise
        .then(function(data) {
          return $scope.bccList = data.result;
        });
    };

    $scope.isAddBCC = false;

    $scope.AddBCC = function () {
      $scope.isAddBCC = true;
      $scope.newBCC = {};
    };

    $scope.saveBCC = function () {
      if($scope.newBCCForm.$invalid) {
        return;
      }
      $scope.listPromise = APIService.addBCC(angular.extend({
        id: $scope.domain.id
      }, $scope.newBCC)).$promise
        .then(function () {
          $scope.isAddBCC = false;
          return listBCC();
        });
    };

    $scope.cancel = function () {
      $scope.isAddBCC = false;
    };

    $scope.deleteBCC = function (bcc) {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          content: function() {
            return 'Are your sure to delete this BCC setting? <br/> <strong>Source:</strong> ' + bcc.source + ' <strong>Destination:</strong> ' + bcc.destination;
          },
          confirmText: function() {
            return null;
          },
          title: function () {
            return 'Confirm Delete BCC Setting'
          }
        }
      });

      $scope.listPromise = modalInstance.result
        .then(function() {
          // delete user
          return APIService.deleteBCC({
            id: $scope.domain.id,
            uid: bcc.id
          }).$promise;
        })
        .then(function() {
          return listBCC();
        });
    };

    listBCC();
  });
