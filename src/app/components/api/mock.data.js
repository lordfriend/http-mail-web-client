/**
 * Created by bob on 6/8/15.
 */

angular.module('httpMailWebClient')
  .run(function($httpBackend) {
    var resHeader = {
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json;charset=utf-8'
    };

    $httpBackend.whenGET(/^(?:\/api\/invites\?)code=\S+/)
      .respond(200, '', resHeader, 'OK');

    var domains = [];
    for(var i = 0; i < 50; i++) {
      domains.push({
        id: i,
        name: 'domain' + i + '.com'
      });
    }

    $httpBackend.whenGET(/^(?:\/api\/domain\?)code=\S+/)
      .respond(200, {result: domains}, resHeader, 'OK');

    $httpBackend.whenPOST(/^(?:\/api\/domain\?)code=\S+/)
      .respond(function(method, url, data, headers) {
        var id = domains.length;
        domains.push(data);
        data.id = id;
        return [200, data, resHeader, 'OK'];
      });

    $httpBackend.whenGET(/^(?:\/api\/domain\/)\d+\?code=\S+/)
      .respond(function(method, url, data, headers) {
        var id = url.match(/^(?:\/api\/domain\/)(\d+)/)[1];
        var domain = domains[id];
        return [200, {result: [domain]}, resHeader, 'OK'];
      });

    $httpBackend.whenGET(/^(?:\/api\/user\/)\d+\?code=\S+/)
      .respond(function(method, url, data, header) {
        var domainId = url.match(/^(?:\/api\/user\/)(\d+)\?code=\S+/)[1];
        var users = [];
        for(var j = 0; j < 50; j++) {
          users.push({
            id: j,
            email: 'user' + j + '@domain' + domainId + '.com',
            domain: domainId
          });
        }

        return [200, {result: users}, resHeader, 'OK'];
      });

    $httpBackend.whenGET(/^(?:app\/)\S*/).passThrough();
  });
