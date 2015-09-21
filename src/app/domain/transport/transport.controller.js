/**
 * Transport settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('TransportCtrl', function($scope, APIService, $modal, PromiseErrorHandler) {

    var listTransport = function () {
      return APIService.listTransport({
        id: $scope.domain.id
      }).$promise
        .then(function (data) {
          return $scope.transportList = data.result;
        });
    };

    $scope.listPromise = listTransport()
      .catch(PromiseErrorHandler.network);

    $scope.isAddTransport = false;
    $scope.addTransport = function () {
      $scope.isAddTransport = true;
      $scope.newTransport = {};
    };

    $scope.saveTransport = function () {
      if($scope.newTransportForm.$invalid) {
        return;
      }
      var reqParams = angular.extend({
        id: $scope.domain.id
      }, $scope.newTransport);
      if(reqParams.source) {
        reqParams.source += '@';
      } else {
        reqParams.source = '';
      }

      $scope.listPromise = APIService.addTransport(reqParams).$promise
        .then(function () {
          $scope.isAddTransport = false;
          return listTransport();
        })
        .catch(PromiseErrorHandler.network);
    };

    $scope.cancel = function () {
      $scope.isAddTransport = false;
    };

    $scope.deleteTransport = function (transport) {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          content: function() {
            return 'Are your sure to delete this Transport setting? <br/> <strong>Source:</strong> ' + transport.source + ' <strong>Destination:</strong> ' + transport.destination;
          },
          confirmText: function() {
            return null;
          },
          title: function () {
            return 'Confirm Delete Transport Setting'
          }
        }
      });

      modalInstance.result
        .then(function() {
          // delete user
          $scope.listPromise = APIService.deleteTransport({
            id: $scope.domain.id,
            uid: transport.id
          }).$promise
            .then(function() {
              return listTransport();
            })
            .catch(PromiseErrorHandler.network);
        });

    };


  });
