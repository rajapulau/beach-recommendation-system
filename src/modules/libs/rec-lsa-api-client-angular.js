var lsaApiClient = typeof require != undefined ? require('./rec-lsa-api-client.js') : lsaApiClient || {};

lsaApiClient.Angular = (function(){
  'use strict'
    var lsaApiClientAngular = function($http, baseUrl, promiseAdapter, role, roleName){
      this.$http          = $http;
      this.baseUrl        = baseUrl;
      this.promiseAdapter = promiseAdapter;
    }

    lsaApiClientAngular.prototype.loadData = function(){
      var _this = this;
      var url = lsaApiClient.generateDataUrl(this.baseUrl);
      var deferred = this.promiseAdapter.deferred();
      this.$http({
        method: 'GET',
        url: url
      })
      .success(function(response){
        deferred.resolve(response.data);
      })
      .error(function(error){
        deferred.reject(err);
      })
      return deferred.promise;
    }

    lsaApiClientAngular.prototype.loadTags = function(){
      var _this = this;
      var url = lsaApiClient.generateTagsUrl(this.baseUrl);
      var deferred = this.promiseAdapter.deferred();
      this.$http({
        method: 'GET',
        url: url
      })
      .success(function(response){
        deferred.resolve(response.data);
      })
      .error(function(error){
        deferred.reject(err);
      })
      return deferred.promise;
    }

    return lsaApiClientAngular;
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = lsaApiClient.Angular;
}
