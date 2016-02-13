var lsaPromises = lsaPromises || {};

/**
 *  *  * Promises/A+ adapter for Angular's $q.
 *   *   */
lsaPromises.Angular = function($q) {
  return {
    all:      $q.all,
    when:     $q.when,
    resolved: $q.resolve,
    rejected: $q.reject,
    deferred: function() {
      var deferred = $q.defer();

      return {
        promise: deferred.promise,
        resolve: deferred.resolve,
        reject:  deferred.reject
      };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = lsaPromises;
}

