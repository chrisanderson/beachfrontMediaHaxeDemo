(function (console, $hx_exports) { "use strict";
$hx_exports.client = $hx_exports.client || {};
var client_Main = $hx_exports.client.Main = function() {
	this._init();
};
client_Main.main = function() {
	client_Main.COMPILE_TARGET = "js";
	var mainInstance = new client_Main();
};
client_Main.prototype = {
	_init: function() {
		var tempFlashVars = { };
		var tempSwfParams = { bgcolor : "#eeeeee"};
		var tempSwfContainer = window.document.querySelector("#swfContainer");
		var tempSwfObject = swfobject.embedSWF("swf/main.swf", tempSwfContainer, 400, 300, 10, null, tempFlashVars, tempSwfParams);
		window.console.log("this will only appear in the debug version of the js output");
		var tempValue = 1;
		tempValue++;
		var tempJsLog = window.document.querySelector("#jsLog");
		tempJsLog.innerText += "tempValue: " + tempValue;
	}
};
client_Main.COMPILE_TARGET = "unkown hinson";
client_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
