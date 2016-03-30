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
        deferred.reject(error);
      })
      return deferred.promise;
    }

    lsaApiClientAngular.prototype.getData = function(id){
      var _this = this;
      var url = lsaApiClient.generategetDataUrl(this.baseUrl, id);
      var deferred = this.promiseAdapter.deferred();
      this.$http({
        method: 'GET',
        url: url
      })
      .success(function(response){
        deferred.resolve(response.data);
      })
      .error(function(error){
        deferred.reject(error);
      })
      return deferred.promise;
    }

    lsaApiClientAngular.prototype.getForusquareData = function(id){
      var _this = this;
      var url = lsaApiClient.generateFoursquareUrl(id);
      var deferred = this.promiseAdapter.deferred();
      this.$http({
        method: 'GET',
        url: url
      })
      .success(function(response){
        var data = {
          name : response.response.venue.name,
          location: response.response.venue.location,
          photos: response.response.venue.photos
        }
        deferred.resolve(data);
      })
      .error(function(error){
        deferred.reject(error);
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
        deferred.reject(error);
      })
      return deferred.promise;
    }

    return lsaApiClientAngular;
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = lsaApiClient.Angular;
}
