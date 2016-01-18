'use strict';
var app                 = require('angular').module('aadc');
var MainCtrl            = require('./main.ctrl.js');
var HomeCtrl            = require('./home.ctrl.js');
var HowCtrl            = require('./how.ctrl.js');
var GalleryCtrl         = require('./gallery.ctrl.js');
var DetailCtrl         = require('./detail.ctrl.js');
var QuestionerCtrl         = require('./questioner.ctrl.js');
var RecommendationCtrl         = require('./recommendation.ctrl.js');

app
    .controller('MainController', MainCtrl)
    .controller('HomeController', HomeCtrl)
    .controller('HowController', HowCtrl)
    .controller('DetailController', DetailCtrl)
    .controller('GalleryController', GalleryCtrl)
    .controller('QuestionerController', QuestionerCtrl)
    .controller('RecommendationController', RecommendationCtrl)
