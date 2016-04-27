import "./scss/base.scss";
window.jQuery = require('jquery');
window.$ = window.jQuery;
angular       = require('angular');
require('angular-ui-router');
require('angular-sanitize');
require('angular-leaflet-directive');
require('lodash');
window.moment = require('moment');
var ngTouch = require('angular-touch');
var carousel  = require('angular-carousel');
require('angular-ui-bootstrap');
require('ng-tags-input');
require('../bower_components/angular-selector/dist/angular-selector.min');
require('../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min');
require('../node_modules/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min');
require('angular-file-upload');
require('angular-leaflet-directive');
require('leaflet');
var app = angular.module('aadc',['ui.router','ngSanitize','leaflet-directive','angularFileUpload','selector',
    'angular-carousel','bootstrapLightbox','ngTagsInput']);

require('./modules/factories/recFactory.js');
require('./modules/config/routing.js')
require('./modules/directives/index.js')
require('./modules/controllers/index.js')
