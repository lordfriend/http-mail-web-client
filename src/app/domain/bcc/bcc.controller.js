/**
 * BCC settings controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('BccCtrl', function($scope, APIService) {
    var listBcc = function() {
      return APIService.listBcc({
        id: $scope.domain.id
      }).$promise
        .then(function(data) {
          return $scope.bccList = data.result;
        });
    };



    listBcc();
  });
