'use strict';
/**
 * Created by bob on 9/5/15.
 */
angular.module('httpMailWebClient')
  .service('DomainService', function(APIService) {

    var self = this;

    var getDomain = function(domains, id) {
      for(var i = 0; i < domains.length; i++) {
        if(domains[i].id === id) {
          return domains[i];
        }
      }
      return null;
    };

    self.getDomainList = function(refresh) {
      if(!self.domainPromise || refresh) {
        self.domainPromise = APIService.domains({}).$promise
          .then(function(data) {
            return data.result;
          });
      }
      return self.domainPromise;
    };

    self.getDomainById = function(id) {
      if(self.domainPromise) {
        return self.domainPromise
          .then(function(domains) {
            return getDomain(domains, parseInt(id));
          });
      } else {
        return self.getDomainList()
          .then(function(domains) {
            return getDomain(domains, parseInt(id));
          })
      }

    }
  });
