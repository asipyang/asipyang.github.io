app.act = app.act || {};
app.act.ActionType = {
	ADD_IMG_WRAPPER: "ADD_IMG_WRAPPER",
	DISPLAY_ALL_IMG_WRAPPER: "DISPLAY_ALL_IMG_WRAPPER",
	UPDATE_IMG_WRAPPER: "UPDATE_IMG_WRAPPER",
	UPDATE_MAIN_CONTAINER: "UPDATE_MAIN_CONTAINER"
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

	return {
		addImgWrapper: addImgWrapper,
		clickToAddImgWrapper: clickToAddImgWrapper,
		displayAllImgWrapper: displayAllImgWrapper,
		updateImgWrapper: updateImgWrapper,
		updateMainContainer: updateMainContainer
	};
})();