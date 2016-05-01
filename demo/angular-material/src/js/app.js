var app = angular.module('asip.demo', [
	'ngRoute',
	'ngMessages',
	'ngMaterial',
	'ngAnimate'
	// 'highcharts-ng'
]);

app.config(function($routeProvider, $mdThemingProvider) {
	'use strict';
	$routeProvider
		.when('/dashboard', {
			templateUrl: 'template/_dashboard.html',
			// controller: 'CodeGenController'
		})
		.when('/products', {
			templateUrl: 'template/_products.html',
			controller: 'ProductsCtrl'
		})
		.otherwise({
			redirectTo: '/dashboard'
		});

	// defind the theme of the Angular Material
	// $mdThemingProvider.theme('default')
	// 	.primaryPalette('light-green', {
	// 		'default': '700',
	// 		'hue-1': '300',
	// 		'hue-2': '400'
	// 	})
	// 	.accentPalette('orange', {
	// 		'default': '600'
	// 	})
	// 	.warnPalette('red');

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
});