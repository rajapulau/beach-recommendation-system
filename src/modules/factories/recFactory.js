'use strict'
var lsa= require('../libs/rec-lsa.js');
var lsaPromises          = require('../libs/rec-lsa-promise-angular.js');
var lsaApiClient         = require('../libs/rec-lsa-api-client.js');
lsaApiClient.Angular = require('../libs/rec-lsa-api-client-angular.js');
var app                      = require('angular').module('aadc');


app.factory('promises', ['$q',
        function($q) {
                return new lsaPromises.Angular($q);
                    }
                    ]);

app.factory('apiClient', apiClientFactory);
apiClientFactory.$inject = ['$http', 'promises']
function apiClientFactory($http, promises){
        var baseUrl = 'http://localhost:3000';
        return new lsaApiClient.Angular(
                  $http, baseUrl, promises
                        );
}

app.factory('Data', UserFactory);
UserFactory.$inject = ['promises', 'apiClient'];
function UserFactory(promiseAdapter, apiClient) {
    return new lsa.Data(promiseAdapter, apiClient);
}

