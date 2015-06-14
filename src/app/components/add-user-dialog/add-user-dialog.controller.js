/**
 * Created by bob on 6/13/15.
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('AddUserDialogCtrl', function($scope, domain) {
    $scope.domain = domain;
  });
