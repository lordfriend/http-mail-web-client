'use strict';

angular.module('httpMailWebClient')
  .controller('DomainEditCtrl', function($scope, Session, APIService, currentDomain) {
    var inviteCode = Session.code;

    $scope.currentDomain = currentDomain.result[0];

    $scope.userQuery = {
      email: ''
    };


    APIService.users({
      code: inviteCode,
      id: $scope.currentDomain.id
    }).$promise
      .then(function(data) {
        $scope.users = data.result;
      });
  });
