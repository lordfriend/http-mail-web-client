/**
 * An directive to create an loader base on promise
 */
'use strict';

angular.module('httpMailWebClient')
  .directive('promiseLoader', function($q) {
    return {
      restrict: 'E',
      scope: {
        promise: '='
      },
      templateUrl: 'app/components/promise-loader/promise-loader.html',
      transclude: true,
      link: function($scope, $element, $attrs) {
        $scope.$watch('promise', function(newValue, oldValue) {
          if(newValue!== oldValue && newValue)
          newValue.promise
            .then(function(result) {
              return result;
            }, function(reason){
              return $q.reject(reason);
            });
        });
      }
    }
  });
