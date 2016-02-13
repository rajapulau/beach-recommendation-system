var lsaApiClient = lsaApiClient || {};
var lsa = typeof require != undefined ? require('./rec-lsa') : lsa;

lsaApiClient.generateDataUrl = function(baseUrl) {
      return baseUrl +'/beach/list';
};

lsaApiClient.generateTagsUrl = function(baseUrl) {
  return baseUrl +'/tagging/list';
}

if (typeof module !== 'undefined' && module.exports) {
      module.exports = lsaApiClient;
}
