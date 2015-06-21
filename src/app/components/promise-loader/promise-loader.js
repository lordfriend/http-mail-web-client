/**
 * An directive to create an loader base on promise
 */
'use strict';

angular.module('httpMailWebClient')
  .directive('promiseLoader', function($q) {
    return {
      restrict: 'E',
      scope: {
        promise: '=',
        backdrop: '=',
        minHeight: '@'
      },
      templateUrl: 'app/components/promise-loader/promise-loader.html',
      transclude: true,
      link: function($scope) {
        $scope.minHeight = $scope.minHeight || '300px';

        $scope.$watch('promise', function(newValue) {
          if(newValue) {
            $scope.isResolving = true;
            console.log('promise resolving', newValue);
            newValue
              .then(function(result) {
                console.log('promise resolved', result);
                $scope.isResolving = false;
                return result;
              }, function(reason){
                $scope.isResolving = false;
                return $q.reject(reason);
              });
          }
        });
      }
    }
  });
