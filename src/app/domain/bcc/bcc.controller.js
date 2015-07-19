/**
 * BCC settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('BccCtrl', function($scope, APIService) {
    var listBCC = function() {
      return APIService.listBCC({
        id: $scope.domain.id
      }).$promise
        .then(function(data) {
          return $scope.bccList = data.result;
        });
    };



    listBCC();
  });
