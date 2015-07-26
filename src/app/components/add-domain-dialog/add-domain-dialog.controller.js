/**
 * Created by bob on 6/11/15.
 */
'use strict';
angular.module('httpMailWebClient')
  .controller('AddDomainDialogCtrl', function($scope, $modalInstance, APIService) {

    var vm = this;

    vm.stepTitle = [
      'Add New Domain',
      'Configure DNS',
      'Add Spf Record'
    ];

    vm.step = 0;

    vm.addDomain = function() {
      vm.addDomainPromise = APIService.createDomain({
        domain: vm.domainName.trim()
      }).$promise
        .then(function() {
          vm.step++;
        }, function() {
          console.log('Failed to add domain');
        });
    };

    var getServerList = function () {
      vm.serverListPromise = APIService.servers().$promise
        .then(function(data) {
          vm.serverList = data.result;
        }, function() {

        });
    };

    getServerList();

    vm.next = function () {
      if(vm.step === 0) {
        vm.addDomain();
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
