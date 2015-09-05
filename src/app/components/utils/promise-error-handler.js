/**
 * Created by bob on 9/5/15.
 */
angular.module('httpMailWebClient')
  .service('PromiseErrorHandler', function($q) {
    this.network = function(reason) {
      if(reason.data && reason.data.title) {
        return $q.reject(new Error(reason.data.title));
      } else {
        return $q.reject(new Error('Network Error!'));
      }
    }
  });
