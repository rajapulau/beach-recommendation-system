import "./scss/base.scss";
window.jQuery = require('jquery');
window.$ = window.jQuery;
angular       = require('angular');
require('angular-ui-router');
require('angular-leaflet-directive');
require('lodash');
window.moment = require('moment');
require('../bower_components/datetimepicker/jquery.datetimepicker');
require('../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min');
require('../bower_components/angular-canvas-ext/angular-canvas-ext');
require('angular-file-upload');
var app = angular.module('aadc',['ui.router','angularFileUpload']);

require('./modules/config/routing.js')
require('./modules/directives/index.js')
require('./modules/controllers/index.js')
