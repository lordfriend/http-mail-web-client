/**
 * Created by bob on 8/8/15.
 */
'use strict';
angular.moduel('httpMailWebClient')
  .directive('groupSelectable', function () {
    return {
      restrict: 'EA',
      scope: {
        ngModelCtrl: '=ngModel',
        regionList: '='
      },
      templateUrl: 'app/components/group-selectable/group-selectable.js',
      link: function ($scope, $element, $attrs) {
        $scope.expanded = false;
        $scope.pickRegion = function (region) {
          $scope.ngModelCtrl.$setViewValue(region.id);
        };

        $scope.pickServer = function (server) {
          $scope.ngModelCtrl.$setViewValue(server.id);
        };
        
      }
    };
  });
