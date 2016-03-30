'use strict';

DetailController.$inject = ['Data','$rootScope', '$state', '$scope','FileUploader','leafletData','Lightbox'];
function DetailController(Data, $rootScope, $state, $scope, FileUploader, leafletData, Lightbox){
  var vm      = this;
  vm.hide     = true;
  vm.detail   = detail;
  vm.idPantai = $state.params.idPantai;
  $scope.images   = [];
  var data = Data.list;

  // debugger

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };

  angular.extend($scope, {
        center: {
          lat: 0,
          lng: 0,
          zoom: 14,
        },
        tiles: {
          name: 'Mapbox Park',
          url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
          type: 'xyz',
          options: {
            apikey: 'pk.eyJ1IjoicmFqYXB1bGF1IiwiYSI6IkFtdzYtanMifQ.kjDE091qu3CQPFnPkUxDGA',
            mapid: 'rajapulau.jfj9m19c'
          }
        }
      });

  Data.getData(vm.idPantai)
  .then(function(res){
    vm.pantai = res;
    Data.getForusquareData(vm.pantai.id_foursquare)
    .then(function(r){
      vm.foursquare = r;

      vm.images = _.map(vm.foursquare.photos.groups, function(r){
            _.map(r.items, function (res, value, key) {
                var dres = {
                 'url': res.prefix+'width960'+res.suffix,
                 'thumbUrl': res.prefix+'width40'+res.suffix,
                }
                // return res;
                $scope.images.push(dres);
            });
        })

      var mainMarker = {
        lat: vm.foursquare.location.lat,
        lng: vm.foursquare.location.lng,
        message: vm.foursquare.name,
        focus: true,
        draggable: false
      }

      angular.extend($scope, {
          center: {
            lat: vm.foursquare.location.lat,
            lng: vm.foursquare.location.lng,
            zoom: 14,
          },
          markers: {
            mainMarker:angular.copy(mainMarker)
          }
      });

      var search = _.map(vm.pantai.tags, function(re){
        return re.name
      });

  

   console.info("loadData", Data);
            var data = Data.list;
            var allTags = Data.tags;
            var gSearch = {};
            var length_vector_per_object= {};
            var total_wdi_per_object= {};
            var totalq = {};
            var cos={};
            var matrix={};
            var matrix_wdi ={};


///////////  start ////////////////////

            var dataTF = data.reduce(function (results, item) {
            var beachName = item.name.replace(/ /g, '-').toLowerCase();
            var tags = _.reduce(item.tags, function (res, tag) {
                  
            var ret = res.concat(tag.name.split('-'));
                return ret;
            }, [])

            var searchText = _.reduce(search, function(result, value, key){
                var search = result.concat(value.split('-'));
                    return search;
            }, [])

            var searchLength = searchText.length;
            var searchCount  = _.countBy(searchText);
            var gSearch = searchCount;
            var tagsLength = tags.length;
            var tagsCount  = _.countBy(tags);

            var tagsCount3 = _.reduce(tagsCount, function (res, value, key) {
                res[key] = parseFloat((value / tagsLength).toFixed(3));
                return res;
            }, {});

            results[beachName] = {
                tags: tagsCount3,
            };

            var df = _.reduce(tagsCount, function (dfRes, dfValue, dfKey) {
                dfRes[dfKey] = dfValue;
                return dfRes;
            }, {});

            var temp = _.reduce(allTags, function(tRes, tVal, tKey){
                var tRes = tRes.concat(tVal.name.split('-'));
                return tRes;

            },[]);

            var tagDF = _.reduce(temp, function (gRes, gValue, gKey) {
                if(typeof df[gValue] === 'undefined') df[gValue] = 0;
                gRes[gValue] = df[gValue];
                return gRes;
            }, {});

            results[beachName] = {
                df: tagsCount3,
                tags: tagDF
            };

            return results;
        }, {});
        

        var tags = _.reduce(allTags, function (res, tag) {  
            var ret = res.concat(tag.name.split('-'));
            return ret;
            }, []);

        var unionTags = _.union(tags);

        //menggabungkan tag dan beach
        var varTag = _.reduce(unionTags, function(results, tag){
            var v = _.reduce(dataTF, function(tRes, tVal, tKey){
                if (dataTF[tKey].tags[tag] > 0) {
                    tRes[tKey] = tVal.tags[tag]
                }
                else{
                    if (tRes[tKey] > 0) {
                        tRes[tKey] = sRes[key]
                    }else{
                        tRes[tKey] = 0;
                    }
                }
                return tRes;
            },{});
            results[tag] = v;
            return results;
        },{});

        var objTags = _.reduce(unionTags, function (results, tag) {
            var idf = _.reduce(dataTF, function(res, value, key){
                var resLog = parseFloat(Math.log10( dataTF[key].df[tag]).toFixed(3));
                res[key] = (_.isFinite(resLog))? resLog : 0;
                return res;
            },{});

            var searchText = _.reduce(search, function(result, value, key){
                var search = result.concat(value.split('-'));
                    return search;
            }, [])

            var searchLength = searchText.length;
            var searchCount  = _.countBy(searchText);

            var tidf = _.reduce(varTag, function(fRes, fVal, fKey){
                var sizeTags = _.size(_.filter(fVal, function(o) { return o>0; }))
                var total = Data.list.length+1;

                if (tag === fKey) {
                    fRes[fKey] = parseFloat(Math.log10(total/sizeTags).toFixed(3))
                }
                else{
                    if (fRes[fKey] > 0) {
                        fRes[fKey] = fRes[fKey]
                    }else{
                        fRes[fKey] = 0;
                    }
                }
                return fRes
            },{});

            results[tag] = {
                tidf: tidf,
                idf: idf
            };

            var wdt = _.reduce(dataTF, function(res, value, key){
                res[key] = parseFloat(results[tag].tidf[tag]*varTag[tag][key]);
                    return res;
            },{});

            results[tag] = {
                tidf: tidf,
                wdt: wdt
            };

            var wdi = _.reduce(dataTF, function(res, value, key){
                var searchText = _.reduce(search, function(result, value, key){
                    var search = result.concat(value.split('-'));
                        return search;
                }, [])

                var searchLength = searchText.length;
                var searchCount  = _.countBy(searchText);

                var sResults = _.reduce(searchCount, function(sRes, sValue, sKey){
                    if (sKey === tag) {
                        var wdt = _.isNaN(results[tag].wdt[key])?0:results[tag].wdt[key];
                        sRes[key] = parseFloat((results[tag].tidf[sKey]*wdt).toFixed(3));
                        sRes['q'] = results[tag].tidf[tag];
                    }else{
                        if (sRes[key] > 0) {
                            sRes['q'] = sRes['q']
                            sRes[key] = sRes[key]
                        }else{
                            sRes['q'] = 0;
                            sRes[key] = 0;
                        }
                    }
                    return sRes
                },{});
                res['q'] = sResults['q'];
                res[key] = sResults[key];
                
                return res;
            },{});
            results[tag] = {
                tidf: tidf,
                wdt: wdt,
                wdi: wdi
            };

            var vector = _.reduce(dataTF, function(res, value, key){
                var searchText = _.reduce(search, function(result, value, key){
                    var search = result.concat(value.split('-'));
                        return search;
                }, [])

                var searchLength = searchText.length;
                var searchCount  = _.countBy(searchText);

                var sResults = _.reduce(searchCount, function(sRes, sValue, sKey){
                    var wdt = _.isNaN(results[tag].wdt[key])?0:results[tag].wdt[key];
                    sRes[key] = parseFloat((Math.pow(wdt, 2)).toFixed(3));
                    sRes['q'] = parseFloat(
                        results[tag].wdi['q']*results[tag].tidf[tag]
                        );
                    return sRes
                },{});

                if(typeof total_wdi_per_object[key] === 'undefined') total_wdi_per_object[key] = 0;
                if(!matrix_wdi[key]) matrix_wdi[key]=0;
                // matrix[key][tag] = results[tag].vector[key]
                matrix_wdi[key] += results[tag].wdi[key]

                total_wdi_per_object[key] += +wdt[key]
                res['q'] = sResults['q'];
                res[key] = sResults[key];
                return res;
            },{});

            results[tag] = {
                tidf: tidf,
                wdt: wdt,
                wdi: wdi,
                total_wdi_per_object: total_wdi_per_object,
                vector: vector
            };

            var total_length_vector_per_object = _.reduce(dataTF, function(res, value, key){
                if(typeof length_vector_per_object[key] === 'undefined') length_vector_per_object[key] = 0;
                if(!matrix[key]) matrix[key]=0;
                if(!matrix['q']) matrix['q']=0;
                matrix['q'] += (_.isNaN(results[tag].vector['q']))?0:+results[tag].vector['q']
                matrix[key] += results[tag].vector[key]
                res[key] = +vector[key]
                return res;
            },{})

            var sqrt_total_vector_per_object = _.reduce(dataTF, function(res, value, key){
                if(typeof res[key] === 'undefined') res[key] = 0;
                res[key] += Math.sqrt(parseFloat(vector[key]))
                return res;
            },{})
            
            results[tag] = {
                tidf: (tidf[tag])?tidf[tag]:0,
                wdt: wdt,
                wdi: wdi,
                total_wdi_per_object: total_wdi_per_object,
                vector: vector
            };

            return results;
        }, {});

        var totalTidf = _.sum(_.map(objTags, function(sRes, sValue, sKey){
            var total =0;
            var toV = _.isUndefined(sRes.tidf)?0:sRes.tidf;
           total += parseFloat(toV)            
           return total
        }));

        var totalTags = _.reduce(data, function(tRes, tValue, tKey){
            var beachName = tValue.name.replace(/ /g, '-').toLowerCase();
            return tRes
        },{});

        var cosinus = _.reduce(data, function(cRes, cItem){
            var beachName = cItem.name.replace(/ /g, '-').toLowerCase();

            var total_q = _.reduce(objTags, function(qRes, qVal, qKey){
                if (objTags[qKey].vector['q']) {
                    if(typeof objTags[qKey].vector['q'] === 'undefined') objTags[qKey].vector['q'] = 0;
                    qRes += objTags[qKey].vector['q']
                };
                return qRes;
            },{})

            var total_wdi = _.reduce(objTags, function(wRes, wVal, wKey){
                wRes = objTags['ATV'].total_wdi_per_object
                return wRes;
            },{})

            var sqrt_total_vector = _.reduce(objTags, function(oRes, oVal, oKey){
                oRes = objTags['ATV'].sqrt_total_vector_per_object
                return oRes;
            },{})

            // debugger

            var vector_q = parseFloat(Math.sqrt(parseFloat(matrix['q'].toFixed(3))).toFixed(3));
            var vector_object = parseFloat(Math.sqrt(parseFloat(matrix[beachName].toFixed(3))).toFixed(3));
            var wdi_object = parseFloat(matrix_wdi[beachName].toFixed(3));

            cRes[beachName] = {
                id: cItem.id,
                total_q: parseFloat(matrix['q'].toFixed(3)),
                total_wdi: wdi_object,
                total_vector: parseFloat(matrix[beachName].toFixed(3)),
                sqrt_total_vector_q: vector_q,
                sqrt_total_vector: vector_object,
                cosinus: parseFloat((wdi_object /(vector_q*vector_object)).toFixed(3))
            };

            return cRes;
        },{})
        
        var cosinusMergered = _.reduce(cosinus, function(cRes, cVal, cKey){
          var cdata = _.reduce(data, function(dRes, dVal, dKey){
            if (cVal.id == dVal.id) {
                dRes[cKey] = {
                    data: dVal,
                    cosinus: cVal.cosinus
                }
            };
            return dRes;
          },{})

        cRes[cKey] = cdata[cKey]
        return cRes;
        },{});

        vm.cosinusOrdered = _.orderBy(cosinusMergered, ['cosinus'], ['desc']);

        
        // console.info('load dataTF', dataTF);
        console.log('load objTags',objTags);
        console.info('load matrix',matrix);
        console.log('load cosinus',cosinus);
        console.log('load cosinus ordered',vm.cosinusOrdered);
   ////////// END /////////////////////////////

    })
  });


   


  function detail(){
    console.info('go to details');
  }

  (function(){
    Data.loadData();
    Data.loadTags();
  })();
}

module.exports = DetailController;

