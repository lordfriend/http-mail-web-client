/**
 * Created by bob on 6/13/15.
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('AddUserDialogCtrl', function($scope, domain, APIService, $modalInstance) {
    var vm = this;
    vm.step = 0;

    vm.stepTitle = [
      'Add User',
      'Configure POP3/IMAP',
      'Configure SMTP'
    ];

    vm.domain = domain;

    APIService.servers().$promise
      .then(function (data) {
        vm.serverList = data.result;
      });
    vm.addUser = function () {
      if(vm.addUserForm.$invalid) {
        return;
      }
      var user = {
        username: vm.userName,
        password: vm.password
      };

      vm.addUserPromise = APIService.addUser(angular.extend({
        id: domain.id
      }, user)).$promise
        .then(function() {
          vm.step++;
        });
    };

    vm.next = function () {
      if(vm.step === 0) {
        vm.addUser();
      } else {
        vm.step++;
      }
    };

    vm.finish = function () {
      if(vm.step === 0) {
        $modalInstance.dismiss();
      } else {
        $modalInstance.close();
      }
    };
  });
