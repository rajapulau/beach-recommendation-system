var lsa = (function(){
  var Data = function(promiseAdapter, apiClient){
    this.list = null;
    this.tags = null;
    this.promiseAdapter = promiseAdapter;
    this.apiClient = apiClient;
  }

  Data.prototype.loadData = function(){
    var _this    = this;
    var deferred = this.promiseAdapter.deferred();
    this.apiClient.loadData()
      .then(function(res){
        _this.list = res;
        deferred.resolve(res);
      }, function(err){
        deferred.reject(err);
      });
    return deferred.promise;
  }

  Data.prototype.loadTags = function(){
    var _this    = this;
    var deferred = this.promiseAdapter.deferred();
    this.apiClient.loadTags()
      .then(function(res){
        _this.tags = res;
        deferred.resolve(res);
      }, function(err){
        deferred.reject(err);
      });
    return deferred.promise;
  }

  return {
    Data : Data
  }

})();

if(typeof module !==  'undefined' && module.exports) {
  module.exports = lsa;
}
