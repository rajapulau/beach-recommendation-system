'use strict';

MainController.$inject = ['$rootScope', '$state', '$scope','FileUploader','Data'];
function MainController($rootScope, $state, $scope, FileUploader, Data){
  var vm      = this;
  vm.hide     = true;
  vm.openMenu = openMenu;
  vm.goRecommendation = goRecommendation;

  console.info('show Data', Data);

  function goRecommendation(){
    if(vm.form.search){
        var search = _.map(vm.form.search,'text');
        var data = Data.list;
        var allTags = Data.tags;
        var gSearch = {};
        var totalVector= {};
        var totalAll= {};
        var cos={};

        

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

            var arrTF = []

            var tagsCount3 = _.reduce(tagsCount, function (res, value, key) {

                var sResults = _.reduce(searchCount, function(sRes, sValue, sKey){
                    if (sKey === key) {
                        res[key] = sValue*value;
                        arrTF.push({[key]:sValue*value})
                    }else{
                        if (res[key] > 0) {
                            res[key] = res[key]
                        }else{
                            res[key] = 0;
                        }
                    }
                    return res;

                },{});

                return sResults;
            }, {});

            results[beachName] = {
                tags: tagsCount3,
            };

            var df = _.reduce(tagsCount3, function (dfRes, dfValue, dfKey) {
                var sizeTags = _.size(_.filter(results[beachName].tags, function(o) { return o>0; }));
                if (dfValue > 0) {
                    dfRes[dfKey] = sizeTags;
                }else{
                    dfRes[dfKey] = 0
                }
                return dfRes;
            }, {});
            results[beachName] = {
                tags: tagsCount3,
                df: df
            };

            return results;
        }, {});


        var tags = _.reduce(allTags, function (res, tag) {  
            var ret = res.concat(tag.name.split('-'));
            return ret;
            }, []);

        var unionTags = _.union(tags);

        var objTags = _.reduce(unionTags, function (results, tag) {

            var idf = _.reduce(dataTF, function(res, value, key){
                var valDF = (value.df[tag])?value.df[tag]:0;
                var total = Data.list.length+1;
                var sizeTags = _.size(_.filter(dataTF[key].tags, function(o) { return o>0; }));

                var resLog = parseFloat(Math.log10(total/sizeTags).toFixed(3));
                res[key] = (_.isFinite(resLog))? resLog : 0;
                return res;
            },{});

            var searchText = _.reduce(search, function(result, value, key){
                var search = result.concat(value.split('-'));
                    return search;
            }, [])

            var searchLength = searchText.length;
            var searchCount  = _.countBy(searchText);

            

            results[tag] = {
                idf: idf,

            };

            var tidf = _.reduce(searchCount, function(sRes, sValue, sKey){
                    if (sKey === tag) {
                        var valDF = (results[tag])?results[tag]:0;
                        var total = Data.list.length+1;
                        var sizeTags = _.size(_.filter(results[sKey].idf, function(o) { return o>0; }));
                        sRes[sKey] = parseFloat(Math.log10(total/sizeTags).toFixed(3));
                    }else{
                        if (sRes[sKey] > 0) {
                            sRes[sKey] = sRes[sKey]
                        }else{
                            sRes[sKey] = 0;
                        }
                    }
                    return sRes
            },{});

            results[tag] = {
                tidf: (tidf[tag])?tidf[tag]:0,
                idf: idf,

            };

            var wdt = _.reduce(dataTF, function(res, value, key){
                var valDF = (value.df[tag])?value.df[tag]:0;
                var valIDF = (results[tag].tidf)?results[tag].tidf:0;

                res[key] = parseFloat((valDF*valIDF).toFixed(3));
                    return res;
            },{});

            results[tag] = {
                tidf: (tidf[tag])?tidf[tag]:0,
                idf: idf,
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
                        sRes[key] = parseFloat((results[tag].tidf*wdt).toFixed(3));
                    }else{
                        if (sRes[key] > 0) {
                            sRes[key] = sRes[key]
                        }else{
                            sRes[key] = 0;
                        }
                    }
                    return sRes
                },{});

                res[key] = sResults[key];
                
                return res;
            },{});

            results[tag] = {
                idf: idf,
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
                    sRes['q'] = 0;
                    if (sKey === tag) {
                        var wdi = _.isNaN(results[tag].wdi[key])?0:results[tag].wdi[key];
                        sRes[key] = (Math.pow(wdi, 2)).toFixed(3);
                    }else{
                        if (sRes[key] > 0) {
                            sRes[key] = sRes[key]
                        }else{
                            sRes[key] = 0;
                        }
                    }
                    return sRes
                },{});

                if(typeof totalAll[key] === 'undefined') totalAll[key] = 0;
                
                totalAll[key] += +wdi[key]
                res[key] = sResults[key];
                return res;
            },{});

            results[tag] = {
                tidf: (tidf[tag])?tidf[tag]:0,
                idf: idf,
                wdt: wdt,
                wdi: wdi,
                totalWdi: totalAll,
                vector: vector
            };

            var tVector = _.reduce(dataTF, function(res, value, key){
                if(typeof totalVector[key] === 'undefined') totalVector[key] = 0;
                res[key] = +vector[key]
                return res;
            },{})

            var sqrtVector = _.reduce(dataTF, function(res, value, key){
                if(typeof res[key] === 'undefined') res[key] = 0;
                res[key] += Math.sqrt(parseFloat(vector[key]))
                return res;
            },{})
            
            // console.info('looooo', totalAll);
            results[tag] = {
                tidf: (tidf[tag])?tidf[tag]:0,
                idf: idf,
                wdt: wdt,
                wdi: wdi,
                totalWdi: totalAll,
                vector: vector,
                tVector: tVector,
                sqrtVector: sqrtVector
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

            var total_wdi = _.reduce(objTags, function(wRes, wVal, wKey){
                wRes = objTags['ATV'].totalWdi
                return wRes;
            },{})

            var total_vector = _.reduce(objTags, function(vRes, vVal, vKey){
                vRes = objTags['ATV'].tVector
                return vRes;
            },{})

            var sqrt_total_vector = _.reduce(objTags, function(oRes, oVal, oKey){
                oRes = objTags['ATV'].sqrtVector
                return oRes;
            },{})
            // debugger
            cRes[beachName] = {
                total_wdi: total_wdi[beachName],
                total_vector: total_vector[beachName],
                sqrt_total_vector: sqrt_total_vector[beachName]
            };

            return cRes;
        },{})

        console.info('load dataTF', dataTF);
        console.log('load objTags',objTags);
        console.log('load cosinus',cosinus);
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

