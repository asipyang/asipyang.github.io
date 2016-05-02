var app = angular.module('asip.demo', [
	'ngRoute',
	'ngMessages',
	'ngMaterial',
	'ngAnimate',
	'highcharts-ng'
]);

app.config(function($routeProvider, $mdThemingProvider, $provide, highchartsNGProvider) {
	'use strict';
	$routeProvider
		.when('/user-info', {
			templateUrl: 'template/_user_info.html'
		})
		.when('/products', {
			templateUrl: 'template/_products.html',
			controller: 'ProductsCtrl'
		})
		.when('/orders', {
			templateUrl: 'template/_orders.html',
			controller: 'OrdersCtrl'
		})
		.when('/dashboard', {
			templateUrl: 'template/_dashboard.html',
			controller: 'DashboardCtrl'
		})
		.otherwise({
			redirectTo: '/user-info'
		});

	// defind the theme of the Angular Material
	$mdThemingProvider.theme('default')
		.primaryPalette('light-green', {
			'default': '500',
			'hue-1': '200',
			'hue-2': '400',
			'hue-3': '300'
		})
		.accentPalette('orange', {
			'default': '600',
			'hue-1': '200',
			'hue-2': '100',
			'hue-3': '400'
		})
		.warnPalette('red');

	$mdThemingProvider.theme('side-menu')
		.primaryPalette('light-green', {
			'default': '700',
			'hue-1': '200',
			'hue-2': '400',
			'hue-3': '500'
		})
		.accentPalette('orange', {
			'default': '600'
		})
		.warnPalette('red')
		.backgroundPalette('light-green', {
			'default': '300'
		});

	// append '.json' to every rest api for getting the demo data
	$provide.decorator("BasicApi", function($delegate){
		var origGet = $delegate.doGet;
		$delegate.doGet = function(_uri, _params, _callbacks) {
			return origGet(_uri+".json", _params, _callbacks);
		};

		return $delegate;
	});

	highchartsNGProvider.lazyLoad();
});