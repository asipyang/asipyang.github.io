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
angular.module("asip.demo").factory('RightDialogServ', function($rootScope) {
	'use strict';

	var __openDialog = function(_title, _tmplUrl, _data){
		$rootScope.$emit("openDialog", {
			title: _title,
			tmplUrl: _tmplUrl,
			data: _data
		});
	};

	return {
		openDialog: __openDialog
	};
});
angular.module('asip.demo').controller('FrameCtrl', function(
	$scope,
	$rootScope,
	$location,
	$mdSidenav) {
	"use strict";

	var menu = [
		// {name: "Cat1", icon: "text_fields", subMenu: [{name: "Item1", link:""},{name: "Item2", link:""}]},
		{name: "Dashboard", icon: "show_chart", link: "/dashboard"},
		{name: "Products", icon: "card_giftcard", link: "/products"},
		{name: "Orders", icon: "content_paste", link: ""}
	];

	var __initScope = function(){
		$scope.menu = menu;
		$scope.menuSelected = __getSelectedMenu();
		$scope.title = __getTitle($scope.menuSelected);
		$scope.dialogOpen = false;

		$scope.toggleSideNav = function() {
			$mdSidenav('side-menu').toggle();
		};
		$scope.navigateTo = function(link, $index, $event) {
			$location.path(link);

			$scope.menuSelected = $index;
			$scope.title = __getTitle($scope.menuSelected);

			//$scope.dlgOpen = false;
			$mdSidenav('side-menu').close();
		};

		$scope.closeDialog = function(){
			$scope.dialogOpen = false;
		};
		$rootScope.$on('openDialog', function(event, args) {
			$scope.dialogOpen = true;
			$scope.dialogTitle = args.title;
			// if ($scope.dlgOpen) {
			// 	$scope.$broadcast('refreshDialog', {
			// 		data: args.data,
			// 	});
			// } else {
			// 	$scope.dlgOpen = true;
			// 	$scope.dlgData = args.data;
			// 	$scope.dlgUrl = args.url;
			// }
			// $scope.dlgTitle = args.title;
		});
		$scope.$on('closeDialog', function(event, args) {
			$scope.closeDialog();
			// if (args.refresh) {
			// 	$scope.$broadcast('refreshView', {});
			// }
		});
	};

	var __getSelectedMenu = function(){
		var i;
		var currentPath = $location.path();

		for(i=0; i<menu.length; i++){
			if(currentPath === menu[i].link){
				return i;
			}
		}
		return -1;
	};

	var __getTitle = function(index){
		return index > -1 && index < menu.length? menu[index].name: "";
	};

	__initScope();
});
angular.module('asip.demo').controller('ProductsCtrl', function(
	$scope,
	$rootScope,
	RightDialogServ) {
	"use strict";

	var __initScope = function(){
		$scope.openDialog = __openDialog;
	};

	var __openDialog = function(){
		RightDialogServ.openDialog("Edit");
	};
	__initScope();

});