var app = app || {};
app.init = function(){
	"use strict";

	var dispatcher = app.dispatcher;
	var listeners = app.controller.getListeners();
	var ActionType = app.act.ActionType;

	var container = new app.store.MainContainer(dispatcher, listeners, ActionType);
	app.controller.getMainListeners().forEach(function(listener){
		listener(container);
	});

};
