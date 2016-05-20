app.dispatcher = (function(){
	"use strict";

	var callbacks = [];

	var setCallback = function(callback){
		callbacks.push(callback);
	};

	var sendAction = function(action){
		var i;

		for(i=0; i < callbacks.length; i++){
			callbacks[i](action);
		}
	};

	return {
		setCallback: setCallback,
		sendAction: sendAction
	};
})();