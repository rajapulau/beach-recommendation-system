'use strict';

MainController.$inject = ['$rootScope', '$state', '$scope','FileUploader','Data'];
function MainController($rootScope, $state, $scope, FileUploader, Data){
  var vm      = this;
  vm.hide     = true;
  vm.openMenu = openMenu;
  vm.goRecommendation = goRecommendation;

  function goRecommendation(){
    if(vm.form.search){
        var search = _.map(vm.form.search,'text');
        var data = Data.list;
        var allTags = Data.tags;
        var gSearch = {};
        var length_vector_per_object= {};
        var total_wdi_per_object= {};
        var totalq = {};
        var cos={};
        var matrix={};
        var matrix_wdi ={};

        var dataTF = data.reduce(function (results, item) {
            var beachName = item.name.replace(/ /g, '-').toLowerCase();
            var beachTag = _.reduce(item.tags, function (res, tag) {
            var ret = res.concat(tag.name.split('-'));
                return ret;
            }, [])

            debugger

            var titleTags = item.name.split(" ");
            var titleJoin = _.join(titleTags,'-').toLowerCase();
            var tags = _.concat(beachTag, titleTags);

            allTags.push({name:titleJoin});

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
                // res[key.toLocaleLowerCase()] = parseFloat((value / tagsLength).toFixed(3));
                var sdf = _.reduce(searchCount, function (dfRes, dfValue, dfKey) {
                  // console.info('load tagsCount3', key, dfKey)
                  if(key.toLocaleLowerCase() == dfKey.toLocaleLowerCase()){
                    dfRes[dfKey.toLocaleLowerCase()] = dfValue;
                  }else{
                    dfRes[dfKey.toLocaleLowerCase()] = 0;
                  }
                  return dfRes;
                }, {});
                if(typeof sdf[key.toLocaleLowerCase()] === 'undefined') sdf[key.toLocaleLowerCase()] = 0;
                res[key.toLocaleLowerCase()] = sdf[key.toLocaleLowerCase()];
                return res;
            }, {});

            results[beachName] = {
                tags: tagsCount3,
            };

            var df = _.reduce(tagsCount, function (dfRes, dfValue, dfKey) {
                console.info('load df', dfKey)
                dfRes[dfKey.toLocaleLowerCase()] = dfValue;
                return dfRes;
            }, {});

            var temp = _.reduce(allTags, function(tRes, tVal, tKey){
                var tRes = tRes.concat(tVal.name.split('-'));
                return tRes;

            },[]);

            var tagDF = _.reduce(temp, function (gRes, gValue, gKey) {
                if(typeof df[gValue] === 'undefined') df[gValue] = 0;
                var sdf = _.reduce(searchCount, function (dfRes, dfValue, dfKey) {
                  if(dfKey.toLocaleLowerCase() == gValue.toLocaleLowerCase()){
                    dfRes[dfKey.toLocaleLowerCase()] = dfValue;
                  }else{
                    dfRes[dfKey.toLocaleLowerCase()] = 0;
                  }
                  return dfRes;
                }, {});
                if(typeof sdf[gValue.toLocaleLowerCase()] === 'undefined') sdf[gValue.toLocaleLowerCase()] = 0;
                gRes[gValue.toLocaleLowerCase()] = sdf[gValue.toLocaleLowerCase()];
                return gRes;
            }, {});

            // console.info('nilai df dan tmp', df, temp, tagDF)
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
            results[tag.toLocaleLowerCase()] = v;
            return results;
        },{});

        var varTagBeach = _.reduce(unionTags, function(results, tag){
            var v = _.reduce(dataTF, function(tRes, tVal, tKey){
              if(_.has(dataTF[tKey].df, tag.toLocaleLowerCase())){
                return tRes.concat(tKey);
              }else{
                return tRes;
              }
            },[]);

            results[tag] = {
              'pantai': v
            };

            var z = _.reduce(results[tag].pantai, function(tRes, tVal, tKey){
              tRes[tVal] = dataTF[tVal].df[tag.toLocaleLowerCase()];
              return tRes;
            },{});

          var val = _(z)
            .countBy(function(res){ return res > 0 })
            .value().true;
          var df = (val != undefined) ? val : 0;
          var resLog = parseFloat(Math.log10(_.size(dataTF)/df).toFixed(3));

            results[tag] = {
              'beach': v,
              'tagofbeach': z,
              'idf': (_.isFinite(resLog))? resLog : 0
            };
            return results;
        },{});

        var objTags = _.reduce(unionTags, function (results, tag) {
            // var idf = _.reduce(dataTF, function(res, value, key){
            //     var aa = dataTF[key].df;
            //     var val = _(aa)
            //       .countBy(function(res){ return res > 0 })
            //       .value().true;
            //     var df = (val != undefined) ? val : 0;
            //     var resLog = parseFloat(Math.log10(_.size(dataTF)/df).toFixed(3));
            //       res[key] = (_.isFinite(resLog))? resLog : 0;
            //     return res;
            // },{})

            var searchText = _.reduce(search, function(result, value, key){
                var search = result.concat(value.split('-'));
                    return search;
            }, [])

            var searchLength = searchText.length;
            var searchCount  = _.countBy(searchText);

            var tidf = _.reduce(varTag, function(fRes, fVal, fKey){
                var sizeTags = _.size(_.filter(fVal, function(o) { return o>0; }))
                var total = Data.list.length+1;

                if (tag.toLocaleLowerCase() === fKey.toLocaleLowerCase()) {
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
                tidf: varTagBeach[tag].idf,
                idf: varTagBeach[tag].idf
            };

            var wdt = _.reduce(dataTF, function(res, value, key){
                // console.info('load wdt', key, tag, varTagBeach[tag].tagofbeach)
                var vWdt = parseFloat(results[tag].tidf * varTagBeach[tag].tagofbeach[key]);
                res[key] = _.isNaN(vWdt)? 0 : vWdt;
                return res;
            },{});

            results[tag] = {
                tidf: varTagBeach[tag].idf,
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
                    if (sKey.toLocaleLowerCase() === tag.toLocaleLowerCase()) {
                        var wdt = _.isNaN(results[tag].wdt[key])?0:results[tag].wdt[key];
                        // console.info('load key', sKey, key, wdt)
                          
                        sRes[key] = parseFloat((results[tag].tidf*wdt).toFixed(3));
                        sRes['q'] = results[tag].tidf;
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
                idf:varTagBeach[tag].idf,
                tidf:varTagBeach[tag].idf,
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
                        // results[tag].wdi['q']*results[tag].tidf[tag]
                        Math.pow(results[tag].tidf, 2)
                        );
                if(tag === 'ATV' && key === 'pantai-depok'){
                  // debugger
                }
                    return sRes
                },{});

                if(typeof total_wdi_per_object[key] === 'undefined') total_wdi_per_object[key] = 0;
                if(!matrix_wdi[key]) matrix_wdi[key]=0;
                // matrix[key][tag] = results[tag].vector[key]
                matrix_wdi[key] += results[tag].wdi[key]
                // console.info('load wdi', wdt[key])

                total_wdi_per_object[key] += +wdt[key]
                res['q'] = sResults['q'];
                res[key] = sResults[key];
                return res;
            },{});

            results[tag] = {
                idf: varTagBeach[tag].idf,
                tidf: varTagBeach[tag].idf,
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
            
            // console.info('loooadd idf', idf, tag)
            results[tag] = {
                idf: varTagBeach[tag].idf,
                tidf: varTagBeach[tag].idf,
                wdt: wdt,
                wdi: wdi,
                sqrt_total_vector_per_object: sqrt_total_vector_per_object,
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

            var vector_q = parseFloat(Math.sqrt(parseFloat(matrix['q'].toFixed(3))).toFixed(3));
            var vector_object = parseFloat(Math.sqrt(parseFloat(matrix[beachName].toFixed(3))).toFixed(3));
            var wdi_object = parseFloat(matrix_wdi[beachName].toFixed(3));
            var val_cosinus = parseFloat((wdi_object /(vector_q*vector_object)).toFixed(3));

            // console.info('load cosinus', beachName, wdi_object, vector_q, vector_object)
            if(beachName === 'pantai-depok'){
              // debugger
            }

            cRes[beachName] = {
                id: cItem.id,
                total_q: parseFloat(matrix['q'].toFixed(3)),
                total_wdi: wdi_object,
                total_vector: parseFloat(matrix[beachName].toFixed(3)),
                sqrt_total_vector_q: vector_q,
                sqrt_total_vector: vector_object,
                cosinus: _.isNaN(val_cosinus)? 0 : val_cosinus
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

        console.info('load dataTF', dataTF);
        console.log('load objTags',objTags);
        console.info('load matrix',matrix);
        console.log('load cosinus',cosinus);
        console.log('load cosinus ordered',vm.cosinusOrdered);
        $state.go('main.home.recommendation');
    }
  }

  function openMenu(menu){
    if(menu != vm.listMenu){
      vm.hide = false;
    }else{
      vm.hide = !vm.hide;
    }

    if(menu == 'poster'){
      vm.menu = ['menu 1','menu 2']
    }

    if(menu == 'foto'){
      vm.menu = ['foto 1','foto 2']
    }

    if(menu == 'quote'){
      vm.menu = ['quote 1','quote 2']
    }
    vm.listMenu = menu;
  }

  vm.characters= [
    { value: "1", label: "Pasir Halus" },
    { value: "2", label: "Pasir Hitam" },
    { value: "3", label: "Berenang" },
    { value: "4", label: "Karang" },
    { value: "5", label: "Pemandangan" },
    { value: "5", label: "Berenang" }
  ];

  (function(){
    Data.loadData();
    Data.loadTags();
  })();

}

module.exports = MainController;

