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
		$scope.dialog = {
			open: false,
			title: "",
			tmpUrl: "",
			data: {}
		};

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
			$scope.dialog.open = false;
		};
		$rootScope.$on('openDialog', function(event, args) {
			$scope.dialog.open = true;
			$scope.dialog.title = args.title;
			$scope.dialog.tmpUrl = args.tmplUrl;
			$scope.dialog.data = args.data;
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
		$rootScope.$on('closeDialog', function(event, args) {
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