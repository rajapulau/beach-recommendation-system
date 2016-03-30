var lsaApiClient = lsaApiClient || {};
var lsa = typeof require != undefined ? require('./rec-lsa') : lsa;

lsaApiClient.generateDataUrl = function(baseUrl) {
      return baseUrl +'/beach/list';
};

lsaApiClient.generategetDataUrl = function(baseUrl, id) {
      return baseUrl +'beach?id='+id;
};

lsaApiClient.generateFoursquareUrl = function(id) {
      return 'https://api.foursquare.com/v2/venues/'+id+'?oauth_token=DR2FJ5TOITKPUPWLC1EBJHKGCJSV5UMX425ALNKLGM1XX0P2&v=20160306';
};


lsaApiClient.generateTagsUrl = function(baseUrl) {
  return baseUrl +'/tagging/list';
}

if (typeof module !== 'undefined' && module.exports) {
      module.exports = lsaApiClient;
}
