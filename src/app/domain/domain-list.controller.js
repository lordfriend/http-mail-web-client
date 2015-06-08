'use strict';

angular.module('httpMailWebClient')
  .controller('DomainListCtrl', function($scope, Session, APIService) {
    var inviteCode = Session.code;
    APIService.domains({
      code: inviteCode
    }).$promise
      .then(function(data) {
        $scope.domains = data.result;
      });
  });
