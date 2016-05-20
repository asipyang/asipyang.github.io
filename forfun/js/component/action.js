app.act = app.act || {};
app.act.ActionType = {
	ADD_IMG_WRAPPER: "ADD_IMG_WRAPPER"
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
		dispatcher.sendAction(new app.act.Action(ActionType.ADD_IMG_WRAPPER, ActionType.ADD_IMG_WRAPPER, event));
	};

	return {
		addImgWrapper: addImgWrapper
	};
})();