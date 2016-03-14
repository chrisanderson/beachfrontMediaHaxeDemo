(function (console, $hx_exports) { "use strict";
$hx_exports.client = $hx_exports.client || {};
var CompileTime = function() { };
var HxOverrides = function() { };
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
var client_Main = $hx_exports.client.Main = function() {
	this._init();
};
client_Main.main = function() {
	client_Main._COMPILE_TARGET = "js";
	var mainInstance = new client_Main();
};
client_Main.prototype = {
	_init: function() {
		var tempFlashVars = { };
		var tempSwfParams = { menu : "false", scale : "noScale", allowFullscreen : "true", allowScriptAccess : "always", bgcolor : "#eeeeee", wmode : "direct"};
		var tempAppTitle = window.document.querySelector(".app-title");
		var tempSwfContainer = window.document.querySelector("#swfContainer");
		tempAppTitle.innerText += "\n [last compile date/time " + client_Main._COMPILE_DATE_TIME + "]";
		var tempSwfObject = swfobject.embedSWF("swf/main.swf", tempSwfContainer, "100%", 300, 10, null, tempFlashVars, tempSwfParams);
		window.console.log("this will only appear in the debug version of the js output");
		var tempValue = 1;
		tempValue++;
		var tempJsLog = window.document.querySelector("#jsLog");
		tempJsLog.innerText += "\n tempValue: " + tempValue;
	}
};
client_Main._COMPILE_TARGET = "unkown hinson";
client_Main._COMPILE_DATE_TIME = (function($this) {
	var $r;
	var _this = new Date(2016,2,13,23,54,36);
	$r = HxOverrides.dateStr(_this);
	return $r;
}(this));
client_Main._LAST_RUN_DATE_TIME = new Date();
client_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
