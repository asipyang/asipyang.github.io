app.act = app.act || {};
app.act.ActionType = {
	ADD_IMG_WRAPPER: "ADD_IMG_WRAPPER",
	DISPLAY_ALL_IMG_WRAPPER: "DISPLAY_ALL_IMG_WRAPPER",
	UPDATE_IMG_WRAPPER: "UPDATE_IMG_WRAPPER",
	UPDATE_MAIN_CONTAINER: "UPDATE_MAIN_CONTAINER",
	UPDATE_TIMER: "UPDATE_TIMER",
	AUTO_MOVE: "AUTO_MOVE"
};
app.act.Action = function(type, title, data){
	"use strict";

	this.type = type;
	this.title = title;
	this.data = data;
};

app.actionCreator = (function(){
	"use strict";
	var dispatcher = app.dispatcher;
	var ActionType = app.act.ActionType;

	var addImgWrapper = function(data){
		dispatcher.sendAction(new app.act.Action(ActionType.ADD_IMG_WRAPPER, ActionType.ADD_IMG_WRAPPER, data));
	};

	var clickToAddImgWrapper = function(event){
		var data = {
			initX: event.layerX,
			initY: event.layerY
		};

		dispatcher.sendAction(new app.act.Action(ActionType.ADD_IMG_WRAPPER, ActionType.ADD_IMG_WRAPPER, data));
	};

	var displayAllImgWrapper = function(data){
		dispatcher.sendAction(new app.act.Action(ActionType.DISPLAY_ALL_IMG_WRAPPER, ActionType.DISPLAY_ALL_IMG_WRAPPER, data));
	};

	var updateImgWrapper = function(data){
		dispatcher.sendAction(new app.act.Action(ActionType.UPDATE_IMG_WRAPPER, ActionType.UPDATE_IMG_WRAPPER, data));
	};

	var updateMainContainer = function(data){
		dispatcher.sendAction(new app.act.Action(ActionType.UPDATE_MAIN_CONTAINER, ActionType.UPDATE_MAIN_CONTAINER, data));
	};

	var updateTimer = function(data){
		dispatcher.sendAction(new app.act.Action(ActionType.UPDATE_TIMER, ActionType.UPDATE_TIMER, data));
	};

	var autoMove = function(data){
		dispatcher.sendAction(new app.act.Action(ActionType.AUTO_MOVE, ActionType.AUTO_MOVE, data));
	};

	return {
		addImgWrapper: addImgWrapper,
		clickToAddImgWrapper: clickToAddImgWrapper,
		displayAllImgWrapper: displayAllImgWrapper,
		updateImgWrapper: updateImgWrapper,
		updateMainContainer: updateMainContainer,
		updateTimer: updateTimer,
		autoMove: autoMove
	};
})();