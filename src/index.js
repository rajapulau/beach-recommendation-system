import "./scss/base.scss";
window.jQuery = require('jquery');
window.$ = window.jQuery;
angular       = require('angular');
require('angular-ui-router');
require('angular-leaflet-directive');
require('lodash');
window.moment = require('moment');
var ngTouch = require('angular-touch');
var carousel  = require('angular-carousel');
require('angular-ui-bootstrap');
require('../bower_components/angular-selector/dist/angular-selector.min');
require('../bower_components/datetimepicker/jquery.datetimepicker');
require('../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min');
require('../node_modules/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min');
require('../bower_components/angular-canvas-ext/angular-canvas-ext');
require('angular-file-upload');
require('angular-leaflet-directive');
require('leaflet');
var app = angular.module('aadc',['ui.router','leaflet-directive','angularFileUpload','selector',
    'angular-carousel','bootstrapLightbox']);

require('./modules/config/routing.js')
require('./modules/directives/index.js')
require('./modules/controllers/index.js')
