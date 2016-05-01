angular.module("asip.demo").factory('RightDialogServ', function($rootScope) {
	'use strict';

	var __openDialog = function(_title, _tmplUrl, _data){
		$rootScope.$emit("openDialog", {
			title: _title,
			tmplUrl: _tmplUrl,
			data: _data
		});
	};

	var __closeDialog = function(){
		$rootScope.$emit("closeDialog");
	};

	return {
		openDialog: __openDialog,
		closeDialog: __closeDialog
	};
});