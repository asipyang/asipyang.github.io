app.act = app.act || {};
app.act.ActionType = {
	ADD_IMG_WRAPPER: "ADD_IMG_WRAPPER",
	UPDATE_IMG_WRAPPER: "UPDATE_IMG_WRAPPER"
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

	var addImgWrapper = function(event){
		var data = {
			initX: event.offsetX,
			initY: event.offsetY
		};

		dispatcher.sendAction(new app.act.Action(ActionType.ADD_IMG_WRAPPER, ActionType.ADD_IMG_WRAPPER, data));
	};

	var updateImgWrapper = function(data){
		dispatcher.sendAction(new app.act.Action(ActionType.UPDATE_IMG_WRAPPER, ActionType.UPDATE_IMG_WRAPPER, data));
	};

	return {
		addImgWrapper: addImgWrapper,
		updateImgWrapper: updateImgWrapper
	};
})();