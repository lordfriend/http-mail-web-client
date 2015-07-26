/**
 * Created by bob on 6/8/15.
 */
'use strict';
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

    /**
     * Register
     */

    $httpBackend.whenPOST(/\/api\/register\?code=\S+/)
      .respond(200, '', resHeader, 'OK');


    /**
     * Login
     */
    $httpBackend.whenGET(/\/api\/login\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    $httpBackend.whenPOST(/\/api\/login/)
      .respond(function(method, url, data, headers) {
        var user = JSON.parse(data);

        return [200, {token: 'bd36d1ccb2884d6d', username: user.username, level: 5}, resHeader, 'ERROR'];
      });

    $httpBackend.whenPUT(/\/api\/login\?code=\S+/)
      .respond(200, '', resHeader, 'OK');

    $httpBackend.whenDELETE(/\/api\/login\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    /**
     * Domains
     */

    $httpBackend.whenGET(/^(?:\/api\/domain\?)token=\S+/)
      .respond(200, {result: domains}, resHeader, 'OK');

    $httpBackend.whenPOST(/^(?:\/api\/domain\?)token=\S+/)
      .respond(function(method, url, data, headers) {
        var id = domains.length;
        //console.log(data.domain);
        var requestBody = JSON.parse(data);
        var newDomain = {
          name: requestBody.domain,
          id: id
        };
        domains.push(newDomain);

        return [200, newDomain, resHeader, 'OK'];
      });

    $httpBackend.whenGET(/^(?:\/api\/domain\/)\d+\?token=\S+/)
      .respond(function(method, url, data, headers) {
        var id = url.match(/^(?:\/api\/domain\/)(\d+)/)[1];
        var domain = domains[id];
        return [200, {result: domain}, resHeader, 'OK'];
      });

    $httpBackend.whenDELETE(/^(?:\/api\/domain\/)\d+\?token=\S+/)
      .respond(function(method, url, data, headers) {
        var id = url.match(/^(?:\/api\/domain\/)(\d+)/)[1];
        domains.splice(id, 1);
        return [200, '', resHeader, 'OK'];
      });

    /**
     * Users
     */

    $httpBackend.whenGET(/^(?:\/api\/user\/)\d+\?token=\S+/)
      .respond(function(method, url, data, header) {
        var domainId = url.match(/^(?:\/api\/user\/)(\d+)\?token=\S+/)[1];
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

    $httpBackend.whenPOST(/^(?:\/api\/user\/)\d+\?token=\S+/)
      .respond(function(method, url, data, header) {
        return [200, '', resHeader, 'OK'];
      });

    $httpBackend.whenDELETE(/^(?:\/api\/user\/)\d+\/\d+\?token=\S+/)
      .respond(function(method, url, data, header) {
        var match = url.match(/^(?:\/api\/user\/)(\d+)\/(\d+)\?token=\S+/);
        console.log(match);
        //var domainId = match[1];
        var userId = match[2];
        //users.splice(userId, 1);
        return [200, '', resHeader, 'OK'];
      });

    $httpBackend.whenPUT(/^(?:\/api\/user\/)\d+\/\d+\?token=\S+/)
      .respond(function(method, url, data, header) {
        return [200, '', resHeader, 'OK'];
      });

    /**
     * Servers
     */
    $httpBackend.whenGET(/\/api\/server\?token=\S+/)
      .respond(200, {result: [
        {default_mark: '0default', server_mark: 'CNAL', domain_name: 'a.b.com', region_mark: '3CN'},
        {default_mark: 'SG', server_mark: 'SGDO', domain_name: 'b.b.com', region_mark: 'SG'},
        {default_mark: 'JP', server_mark: 'JPLIN', domain_name: 'c.b.com', region_mark: 'JP'},
        {default_mark: 'US', server_mark: 'USDO', domain_name: 'd.b.com', region_mark: 'US'},
      ]});

    /**
     * DKIM
     */

    $httpBackend.whenGET(/\/api\/dkim\/\d+\?token=\S+/)
      .respond(200, {"key_sha512": "17979e1de7dc2574cc2113a452871e155c78997bd90ae4d03e86ee3d1b210938bc8f0c4f046e0fd715140d026d59c093e6e28a89f2dbed11b1fc3a426e1e832f", "domain": "a.com", "selector": "tau"}, resHeader, 'OK');

    $httpBackend.whenPUT(/\/dkim\/\d+\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    /**
     * BCC
     */
    $httpBackend.whenGET(/\/api\/bcc\/\d+\?token=\S+/)
      .respond(200, {"result": [{"source": "r@aaa.com", "region": "SFDO", "destination": "r+relaycn@aaa.com", "id": 1}]}, resHeader, 'OK');

    $httpBackend.whenPOST(/\/api\/bcc\/\d+\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    $httpBackend.whenGET(/\/api\/bcc\/\d+\?token=\S+/)
      .respond(200, {"result": {"source": "abc@aaa.com", "region": "SFDO", "destination": "bb@gmail.com", "id": 4}}, resHeader, 'OK');

    $httpBackend.whenDELETE(/\/api\/bcc\/\d+\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    /**
     * Alias
     */
    $httpBackend.whenGET(/\/api\/alias\/\d+\?token=\S+/)
      .respond(200, {"result": [{"source": "sdf@aaa.com", "destination": "haha@gmail.com", "id": 8}]}, resHeader, 'OK');

    $httpBackend.whenPOST(/\/api\/alias\/\d+\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    $httpBackend.whenGET(/\/api\/alias\/\d+\?token=\S+/)
      .respond(200, {"result": {"source": "sdf@aaa.com", "destination": "haha@gmail.com", "id": 8}}, resHeader, 'OK');

    $httpBackend.whenDELETE(/\/api\/alias\/\d+\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    /**
     * Transport
     */
    $httpBackend.whenGET(/\/api\/transport\/\d+\?token=\S+/)
      .respond(200, {"result": [{"source": "aaa.com", "region": "SFDO", "destination": "lmtp:unix:private/dovecot-lmtp", "id": 4}, {"source": "aaa.com", "region": "0default", "destination": "smtp:[xxx.domain.tld]", "id": 5}]}, resHeader, 'OK');

    $httpBackend.whenPOST(/\/api\/transport\/\d+\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    $httpBackend.whenGET(/\/api\/transport\/\d+\?token=\S+/)
      .respond(200, {"result": {"source": "k@aaa.com", "region": "0default", "destination": "smtp:[smtp.google.com]", "id": 14}}, resHeader, 'OK');

    $httpBackend.whenDELETE(/\/api\/transport\/\d+\?token=\S+/)
      .respond(200, '', resHeader, 'OK');

    /**
     * Default Transport Settings
     */
    //$httpBackend.whenGET()

    /**
     *  pass through
     */
    $httpBackend.whenGET(/^(?:app|template)\/\S*/).passThrough();
  });
