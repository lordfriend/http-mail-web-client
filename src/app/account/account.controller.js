/**
 * account controller
 */
angular.module('httpMailWebClient')
  .controller('AccountCtrl', function($scope, APIService, $state, $q) {
    'use strict';

    $scope.setActionBarTitle('Account Settings');
    $scope.pass = {};
    $scope.hideAlert = true;

    $scope.changePassword = function () {
      if($scope.changePasswordForm.$invalid) {
        return;
      }
      $scope.changePasswordProimse = APIService.updatePassword({
        password: $scope.pass.password,
        code: $scope.pass.inviteCode
      }).$promise
        .then(function() {
          $state.go('login');
        }, function(resp) {
          if(resp.data && resp.data.title) {
            $scope.errorMessage = resp.data.title;
          } else {
            $scope.errorMessage = resp.statusText;
          }
          $scope.hideAlert = false;
          //resp.errorMessage = $scope.errorMessage;
          //return $q.reject(resp);
        });
    };
  });
