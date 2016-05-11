(function (console, $hx_exports, $global) { "use strict";
$hx_exports.common = $hx_exports.common || {};
$hx_exports.common.client = $hx_exports.common.client || {};
$hx_exports.common.client.util = $hx_exports.common.client.util || {};
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "C":
		return StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "e":
		return Std.string(d.getDate());
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) return "PM"; else return "AM";
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "s":
		return Std.string(Std["int"](d.getTime() / 1000));
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "t":
		return "\t";
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "u":
		var t = d.getDay();
		if(t == 0) return "7"; else if(t == null) return "null"; else return "" + t;
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	case "Y":
		return Std.string(d.getFullYear());
	default:
		throw new js__$Boot_HaxeError("Date.format %" + e + "- not implemented yet.");
	}
};
DateTools.__format = function(d,f) {
	var r = new StringBuf();
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) break;
		r.addSub(f,p,np - p);
		r.add(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	r.addSub(f,p,f.length - p);
	return r.b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var common_client_CommonModel = $hx_exports.common.client.CommonModel = function() { };
$hxClasses["common.client.CommonModel"] = common_client_CommonModel;
common_client_CommonModel.__name__ = ["common","client","CommonModel"];
common_client_CommonModel.prototype = {
	injectionsReady: function() {
		console.log({ 'mainInjector' : this.mainInjector});
		console.log({ 'buildInfo' : this.buildInfo});
		console.log({ 'settingsModel' : this.settingsModel});
		this.settingsModel.settingsModelSignal.add($bind(this,this._onSettingsModelSignal));
		var tempValue = 1;
		console.log("tempValue: " + tempValue);
		tempValue++;
		console.log("tempValue: " + tempValue);
		tempValue++;
		console.log("tempValue: " + tempValue);
		var tempErrorMessage = "error message thrown for trace";
		var tempError = null;
		tempError = new Error("" + common_client_util_BuildInfo.COMPILE_TARGET + ": " + tempErrorMessage);
		try {
			console.log("" + common_client_util_BuildInfo.COMPILE_TARGET + ": trace inside of a try catch statement might cause a meltdown in flash. without throw. in try block");
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			console.log("" + common_client_util_BuildInfo.COMPILE_TARGET + ": trace inside of a try catch statement might cause a meltdown in flash. with throw. in catch block");
		}
		try {
			console.log("" + common_client_util_BuildInfo.COMPILE_TARGET + ": trace inside of a try catch statement might cause a meltdown in flash. with throw. in try block");
			throw tempError;
		} catch( error1 ) {
			if (error1 instanceof js__$Boot_HaxeError) error1 = error1.val;
			console.log("" + common_client_util_BuildInfo.COMPILE_TARGET + ": trace inside of a try catch statement might cause a meltdown in flash. with throw. in catch block");
		}
	}
	,_onSettingsModelSignal: function(eventType,value) {
		if(eventType != "MODEL_UPDATED") return;
		console.log("settingsModel.settings.version: " + this.settingsModel.settings.version);
	}
	,__class__: common_client_CommonModel
};
var common_client_ICommon = function() { };
$hxClasses["common.client.ICommon"] = common_client_ICommon;
common_client_ICommon.__name__ = ["common","client","ICommon"];
var common_client_Main = $hx_exports.common.client.Main = function() {
	this._mainInjector = new minject_Injector();
	console.log("new()");
	this._init();
	this._initInjector();
};
$hxClasses["common.client.Main"] = common_client_Main;
common_client_Main.__name__ = ["common","client","Main"];
common_client_Main.main = function() {
	console.log("main()");
	var mainInstance = new common_client_Main();
};
common_client_Main.prototype = {
	_init: function() {
		console.log("_init()");
		var tempFlashVars = { };
		var tempSwfParams = { menu : "false", scale : "noScale", allowFullscreen : "true", allowScriptAccess : "always", bgcolor : "#eeeeee", wmode : "direct"};
		console.log({ 'tempFlashVars' : tempFlashVars});
		console.log({ 'tempSwfParams' : tempSwfParams});
		var tempSwfContainer = window.document.querySelector("#swfContainer");
		console.log({ 'tempSwfContainer' : tempSwfContainer});
		var tempSwfObject = swfobject.embedSWF("swf/main.swf", tempSwfContainer, "50%", "100%", 10, null, tempFlashVars, tempSwfParams);
	}
	,_initInjector: function() {
		console.log("_initInjector()");
		this._mainInjector.mapSingleton(minject_Injector,"main");
		this._mainInjector.mapSingleton(common_client_util_BuildInfo);
		this._mainInjector.mapSingleton(common_client_CommonModel);
		this._mainInjector.mapSingleton(common_client_settings_SettingsModel);
		this._mainInjector.mapSingleton(common_client_settings_SettingsService);
		this._mainInjector.mapSingleton(common_client_util_HeartBeat);
		this._mainInjector.mapSingleton(common_client_signal_SettingsSignal);
		this._mainInjector.mapSingleton(common_client_signal_SettingsModelSignal);
		this._mainInjector.mapSingleton(common_client_signal_HeartBeatSignal);
		this._mainInjector.mapClass(common_client_service_LoaderService,common_client_service_LoaderService);
		this._mainInjector.mapSingleton(js_client_AppModel);
		this._app = this._mainInjector.instantiate(js_client_App);
		this._initUI();
	}
	,_initUI: function() {
		console.log("_initUI()");
	}
	,__class__: common_client_Main
};
var common_client_service_LoaderService = function() {
};
$hxClasses["common.client.service.LoaderService"] = common_client_service_LoaderService;
common_client_service_LoaderService.__name__ = ["common","client","service","LoaderService"];
common_client_service_LoaderService.prototype = {
	loadFromUrl: function(url,onDataCallback,onErrorCallback) {
		var tempHttp = new haxe_Http(url);
		if(onDataCallback != null) tempHttp.onData = onDataCallback; else tempHttp.onData = $bind(this,this._onHttpData);
		if(onErrorCallback != null) tempHttp.onError = onErrorCallback; else tempHttp.onError = $bind(this,this._onHttpError);
		tempHttp.request(false);
	}
	,_onHttpData: function(result) {
		console.log("_onHttpData() result: " + result);
	}
	,_onHttpError: function(result) {
		console.log("_onHttpError() result: " + result);
	}
	,__class__: common_client_service_LoaderService
};
var common_client_settings_SettingsModel = function() {
};
$hxClasses["common.client.settings.SettingsModel"] = common_client_settings_SettingsModel;
common_client_settings_SettingsModel.__name__ = ["common","client","settings","SettingsModel"];
common_client_settings_SettingsModel.prototype = {
	injectionsReady: function() {
		this._init();
	}
	,_init: function() {
		console.log("_init()");
		this.settingsSignal.add($bind(this,this._onSettingsSignal));
		this.settingsService.loadSettings("runtime/test.json");
	}
	,_onSettingsSignal: function(eventType,value) {
		if(eventType != "LOAD_SUCCESS") return;
		this.settings = value;
		console.log({ '_onSettingsReady settings' : this.settings});
		console.log({ '_onSettingsReady settings.version' : this.settings.version});
		console.log({ '_onSettingsReady settings.data.settings.width' : this.settings.data.settings.width});
		console.log({ '_onSettingsReady settings.data.settings.height' : this.settings.data.settings.height});
		this.settingsModelSignal.dispatch("MODEL_UPDATED",this);
	}
	,__class__: common_client_settings_SettingsModel
};
var common_client_settings_SettingsService = function() { };
$hxClasses["common.client.settings.SettingsService"] = common_client_settings_SettingsService;
common_client_settings_SettingsService.__name__ = ["common","client","settings","SettingsService"];
common_client_settings_SettingsService.prototype = {
	injectionsReady: function() {
	}
	,loadSettings: function(url) {
		this.loaderService.loadFromUrl(url,$bind(this,this._onSettingsLoadSuccess));
	}
	,_onSettingsLoadSuccess: function(result) {
		this._settings = JSON.parse(result);
		console.log({ '_onSettingsLoadSuccess() _settings' : this._settings});
		this.settingsSignal.dispatch("LOAD_SUCCESS",this._settings);
	}
	,__class__: common_client_settings_SettingsService
};
var msignal_Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal_SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal_Signal;
msignal_Signal.__name__ = ["msignal","Signal"];
msignal_Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal_SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw new js__$Boot_HaxeError("You cannot addOnce() then add() the same listener without removing the relationship first.");
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal_Signal
	,__properties__: {get_numListeners:"get_numListeners"}
};
var msignal_Signal2 = function(type1,type2) {
	msignal_Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal_Signal2;
msignal_Signal2.__name__ = ["msignal","Signal2"];
msignal_Signal2.__super__ = msignal_Signal;
msignal_Signal2.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot2(this,listener,once,priority);
	}
	,__class__: msignal_Signal2
});
var common_client_signal_HeartBeatSignal = function() {
	msignal_Signal2.call(this);
};
$hxClasses["common.client.signal.HeartBeatSignal"] = common_client_signal_HeartBeatSignal;
common_client_signal_HeartBeatSignal.__name__ = ["common","client","signal","HeartBeatSignal"];
common_client_signal_HeartBeatSignal.__super__ = msignal_Signal2;
common_client_signal_HeartBeatSignal.prototype = $extend(msignal_Signal2.prototype,{
	__class__: common_client_signal_HeartBeatSignal
});
var common_client_signal_SettingsModelSignal = function() {
	msignal_Signal2.call(this);
};
$hxClasses["common.client.signal.SettingsModelSignal"] = common_client_signal_SettingsModelSignal;
common_client_signal_SettingsModelSignal.__name__ = ["common","client","signal","SettingsModelSignal"];
common_client_signal_SettingsModelSignal.__super__ = msignal_Signal2;
common_client_signal_SettingsModelSignal.prototype = $extend(msignal_Signal2.prototype,{
	__class__: common_client_signal_SettingsModelSignal
});
var common_client_signal_SettingsSignal = function() {
	msignal_Signal2.call(this);
};
$hxClasses["common.client.signal.SettingsSignal"] = common_client_signal_SettingsSignal;
common_client_signal_SettingsSignal.__name__ = ["common","client","signal","SettingsSignal"];
common_client_signal_SettingsSignal.__super__ = msignal_Signal2;
common_client_signal_SettingsSignal.prototype = $extend(msignal_Signal2.prototype,{
	__class__: common_client_signal_SettingsSignal
});
var common_client_util_BuildInfo = $hx_exports.common.client.util.BuildInfo = function() {
	this._init();
};
$hxClasses["common.client.util.BuildInfo"] = common_client_util_BuildInfo;
common_client_util_BuildInfo.__name__ = ["common","client","util","BuildInfo"];
common_client_util_BuildInfo.prototype = {
	_init: function() {
		common_client_util_BuildInfo.COMPILE_TARGET = "js";
		common_client_util_BuildInfo.BUILD_TARGET = "debug";
		console.log("COMPILE_TARGET: " + common_client_util_BuildInfo.COMPILE_TARGET);
		console.log("BUILD_TARGET: " + common_client_util_BuildInfo.BUILD_TARGET);
		console.log("COMPILE_DATE_TIME_STRING: " + common_client_util_BuildInfo.COMPILE_DATE_TIME_STRING);
		console.log("LAST_RUN_DATE_TIME_STRING: " + common_client_util_BuildInfo.LAST_RUN_DATE_TIME_STRING);
	}
	,__class__: common_client_util_BuildInfo
};
var common_client_util_HeartBeat = $hx_exports.common.client.util.HeartBeat = function() {
	this._init();
};
$hxClasses["common.client.util.HeartBeat"] = common_client_util_HeartBeat;
common_client_util_HeartBeat.__name__ = ["common","client","util","HeartBeat"];
common_client_util_HeartBeat.prototype = {
	injectionsReady: function() {
		var timeTimer = new haxe_Timer(1000);
		timeTimer.run = $bind(this,this._onTimerTick);
	}
	,_init: function() {
	}
	,_onTimerTick: function() {
		common_client_util_HeartBeat.currentDateTime = new Date();
		this.heartBeatSignal.dispatch("CURRENT_DATE_TIME_UPDATED",common_client_util_HeartBeat.currentDateTime);
	}
	,__class__: common_client_util_HeartBeat
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.prototype = {
	run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var js_client_App = function() {
	this._videoContainer = window.document.querySelector("#videoContainer");
	this._canvasElement = window.document.querySelector("#canvas");
	this._jsLogElement = $("#jsLog");
	this._swfContainerElement = $("#swfContainer");
	this._currentDateTimeElement = $(".current-date-time");
	this._compileDateTimeElement = $(".compile-date-time");
	this._appTitleElement = $(".app-title");
	this._init();
};
$hxClasses["js.client.App"] = js_client_App;
js_client_App.__name__ = ["js","client","App"];
js_client_App.prototype = {
	injectionsReady: function() {
		if(this._appTitleElement == null) this._initUI();
		this.model.set_jsLogElement(this._jsLogElement);
		this.model.set_compileDateTimeElement(this._compileDateTimeElement);
		this.model.set_currentDateTimeElement(this._currentDateTimeElement);
	}
	,_init: function() {
		console.log("_init()");
		this._initUI();
	}
	,_initUI: function() {
		console.log({ '_appTitleElement' : this._appTitleElement});
		console.log({ '_compileDateTimeElement' : this._compileDateTimeElement});
		console.log({ '_currentDateTimeElement' : this._currentDateTimeElement});
		console.log({ '_swfContainerElement' : this._swfContainerElement});
		console.log({ '_jsLogElement' : this._jsLogElement});
		window.console.log("this will only appear in the debug version of the js output");
		var _this = window.document;
		this._videoElement = _this.createElement("video");
		this._videoElement.id = "videoDynamic";
		this._videoElement.src = "http://e736daa9861a3da5faf4-49d13c85de3b1b0658221edbffbf1629.r69.cf2.rackcdn.com/bigbuckbunny.mp4";
		this._videoElement.autoplay = true;
		this._videoElement.controls = true;
		this._videoElement.loop = true;
		this._videoContainer.appendChild(this._videoElement);
		makeVideoPlayableInline(this._videoElement,false);
		this._videoElement.play();
	}
	,_onVideoProgress: function(event) {
	}
	,_onVideoLoaded: function(event) {
		this._videoElement.pause();
		this._canvasApp();
	}
	,_canvasApp: function() {
		var _g = this;
		var tempCanvasContext = this._canvasElement.getContext("2d",null);
		tempCanvasContext.fillStyle = "#555";
		tempCanvasContext.fillRect(0,0,this._canvasElement.width,this._canvasElement.height);
		var drawScreen = function() {
			tempCanvasContext.fillStyle = "#fff";
			tempCanvasContext.fillText("Video should render here in this'n canvas tag",20,20);
			tempCanvasContext.drawImage(_g._videoElement,10,10);
		};
		var timeTimer = new haxe_Timer(20);
		timeTimer.run = function() {
			drawScreen();
		};
	}
	,__class__: js_client_App
};
var js_client_AppModel = function() { };
$hxClasses["js.client.AppModel"] = js_client_AppModel;
js_client_AppModel.__name__ = ["js","client","AppModel"];
js_client_AppModel.__interfaces__ = [common_client_ICommon];
js_client_AppModel.prototype = {
	injectionsReady: function() {
		this.heartBeatSignal.add($bind(this,this._onHeartBeatSignal));
		this._init();
	}
	,set_jsLogElement: function(value) {
		this.jsLogElement = value;
		this._logMessage("<br> BuildInfo.BUILD_TARGET: " + common_client_util_BuildInfo.BUILD_TARGET);
		this._logMessage("<br> BuildInfo.COMPILE_DATE_TIME_STRING: " + common_client_util_BuildInfo.COMPILE_DATE_TIME_STRING);
		this._logMessage("<br> BuildInfo.LAST_RUN_DATE_TIME_STRING: " + common_client_util_BuildInfo.LAST_RUN_DATE_TIME_STRING);
		return this.jsLogElement;
	}
	,set_compileDateTimeElement: function(value) {
		this.compileDateTimeElement = value;
		this.compileDateTimeElement.text("[last compile date-time " + DateTools.format(common_client_util_BuildInfo.COMPILE_DATE_TIME,"%m/%d/%Y %r") + "]");
		return this.compileDateTimeElement;
	}
	,set_currentDateTimeElement: function(value) {
		this.currentDateTimeElement = value;
		this._updateCurrentDateTimeElement(new Date());
		return this.currentDateTimeElement;
	}
	,_init: function() {
		var tempObject = { id : 1, foo : "bar"};
		console.log({ 'tempObject' : tempObject});
		var tempObserver = new window.ObjectObserver(tempObject).open(function(added,removed,changed,getOldValueFn) {
			Object.keys(added).forEach(function(property) {
				property;
				added[property];
			});
			Object.keys(removed).forEach(function(property1) {
				property1;
				getOldValueFn(property1);
			});
			Object.keys(changed).forEach(function(property2) {
				property2;
				changed[property2];
				getOldValueFn(property2);
				console.log("tempObserver.changed() property: " + property2 + " changed[property]: " + changed[property2]);
			});
		});
		tempObject.id = -1;
		Platform.performMicrotaskCheckpoint();
		tempObject.id++;
		Platform.performMicrotaskCheckpoint();
		tempObject.id = 33;
		Platform.performMicrotaskCheckpoint();
		console.log({ 'tempObject' : tempObject});
	}
	,_onHeartBeatSignal: function(eventType,value) {
		if(eventType != "CURRENT_DATE_TIME_UPDATED") return;
		this._updateCurrentDateTimeElement(value);
	}
	,_updateCurrentDateTimeElement: function(currentDateTime) {
		if(this.currentDateTimeElement == null) return;
		this.currentDateTimeElement.text("[current date-time " + DateTools.format(currentDateTime,"%m/%d/%Y %r") + "]");
		var tempObserver = new window.ObjectObserver(this.currentDateTimeElement).open(function(added,removed,changed,getOldValueFn) {
			Object.keys(added).forEach(function(property) {
				property;
				added[property];
			});
			Object.keys(removed).forEach(function(property1) {
				property1;
				getOldValueFn(property1);
			});
			Object.keys(changed).forEach(function(property2) {
				property2;
				changed[property2];
				getOldValueFn(property2);
				console.log("tempObserver.changed() property: " + property2 + " changed[property]: " + changed[property2]);
			});
		});
	}
	,_logMessage: function(message) {
		if(this.jsLogElement == null) return;
		this.jsLogElement.append(message);
	}
	,__class__: js_client_AppModel
	,__properties__: {set_currentDateTimeElement:"set_currentDateTimeElement",set_compileDateTimeElement:"set_compileDateTimeElement",set_jsLogElement:"set_jsLogElement"}
};
var minject_ClassMap = function() {
	this.map = new haxe_ds_StringMap();
};
$hxClasses["minject.ClassMap"] = minject_ClassMap;
minject_ClassMap.__name__ = ["minject","ClassMap"];
minject_ClassMap.__interfaces__ = [haxe_IMap];
minject_ClassMap.prototype = {
	get: function(k) {
		var key = Type.getClassName(k);
		return this.map.get(key);
	}
	,set: function(k,v) {
		var key = Type.getClassName(k);
		this.map.set(key,v);
	}
	,exists: function(k) {
		var key = Type.getClassName(k);
		return this.map.exists(key);
	}
	,__class__: minject_ClassMap
};
var minject_InjectionConfig = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
$hxClasses["minject.InjectionConfig"] = minject_InjectionConfig;
minject_InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject_InjectionConfig.prototype = {
	getResponse: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.result != null) return this.result.getResponse(injector);
		var parentConfig = injector.getAncestorMapping(this.request,this.injectionName);
		if(parentConfig != null) return parentConfig.getResponse(injector);
		return null;
	}
	,hasResponse: function(injector) {
		return this.result != null;
	}
	,hasOwnResponse: function() {
		return this.result != null;
	}
	,setResult: function(result) {
		if(this.result != null && result != null) console.log("Warning: Injector contains " + this.toString() + ".\nAttempting to overwrite this " + ("with mapping for [" + result.toString() + "].\nIf you have overwritten this mapping ") + "intentionally you can use `injector.unmap()` prior to your replacement mapping " + "in order to avoid seeing this message.");
		this.result = result;
	}
	,toString: function() {
		var named;
		if(this.injectionName != null && this.injectionName != "") named = " named \"" + this.injectionName + "\" and"; else named = "";
		return "rule: [" + Type.getClassName(this.request) + ("]" + named + " mapped to [" + Std.string(this.result) + "]");
	}
	,__class__: minject_InjectionConfig
};
var minject_Injector = function() {
	this.injectionConfigs = new haxe_ds_StringMap();
	this.injecteeDescriptions = new minject_ClassMap();
	this.attendedToInjectees = new minject_InjecteeSet();
};
$hxClasses["minject.Injector"] = minject_Injector;
minject_Injector.__name__ = ["minject","Injector"];
minject_Injector.prototype = {
	mapClass: function(whenAskedFor,instantiateClass,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectClassResult(instantiateClass));
		return config;
	}
	,mapSingleton: function(whenAskedFor,named) {
		if(named == null) named = "";
		return this.mapSingletonOf(whenAskedFor,whenAskedFor,named);
	}
	,mapSingletonOf: function(whenAskedFor,useSingletonOf,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectSingletonResult(useSingletonOf));
		return config;
	}
	,getMapping: function(forClass,named) {
		if(named == null) named = "";
		var requestName = this.getClassName(forClass) + "#" + named;
		if(this.injectionConfigs.exists(requestName)) return this.injectionConfigs.get(requestName);
		var config = new minject_InjectionConfig(forClass,named);
		this.injectionConfigs.set(requestName,config);
		return config;
	}
	,injectInto: function(target) {
		if(this.attendedToInjectees.contains(target)) return;
		this.attendedToInjectees.add(target);
		var targetClass = Type.getClass(target);
		var injecteeDescription = null;
		if(this.injecteeDescriptions.exists(targetClass)) injecteeDescription = this.injecteeDescriptions.get(targetClass); else injecteeDescription = this.getInjectionPoints(targetClass);
		if(injecteeDescription == null) return;
		var injectionPoints = injecteeDescription.injectionPoints;
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var injectionPoint = injectionPoints[i];
			injectionPoint.applyInjection(target,this);
		}
	}
	,construct: function(theClass) {
		var injecteeDescription;
		if(this.injecteeDescriptions.exists(theClass)) injecteeDescription = this.injecteeDescriptions.get(theClass); else injecteeDescription = this.getInjectionPoints(theClass);
		var injectionPoint = injecteeDescription.ctor;
		return injectionPoint.applyInjection(theClass,this);
	}
	,instantiate: function(theClass) {
		var instance = this.construct(theClass);
		this.injectInto(instance);
		return instance;
	}
	,hasMapping: function(forClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(forClass,named);
		if(mapping == null) return false;
		return mapping.hasResponse(this);
	}
	,getAncestorMapping: function(forClass,named) {
		var parent = this.parentInjector;
		while(parent != null) {
			var parentConfig = parent.getConfigurationForRequest(forClass,named,false);
			if(parentConfig != null && parentConfig.hasOwnResponse()) return parentConfig;
			parent = parent.parentInjector;
		}
		return null;
	}
	,getInjectionPoints: function(forClass) {
		var typeMeta = haxe_rtti_Meta.getType(forClass);
		if(typeMeta != null && Object.prototype.hasOwnProperty.call(typeMeta,"interface")) throw new js__$Boot_HaxeError("Interfaces can't be used as instantiatable classes.");
		var fieldsMeta = this.getFields(forClass);
		var ctorInjectionPoint = null;
		var injectionPoints = [];
		var postConstructMethodPoints = [];
		var _g = 0;
		var _g1 = Reflect.fields(fieldsMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var fieldMeta = Reflect.field(fieldsMeta,field);
			var inject = Object.prototype.hasOwnProperty.call(fieldMeta,"inject");
			var post = Object.prototype.hasOwnProperty.call(fieldMeta,"post");
			var type = Reflect.field(fieldMeta,"type");
			var args = Reflect.field(fieldMeta,"args");
			if(field == "_") {
				if(args.length > 0) ctorInjectionPoint = new minject_point_ConstructorInjectionPoint(fieldMeta.args);
			} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
				if(inject) {
					var point = new minject_point_MethodInjectionPoint(field,fieldMeta.args);
					injectionPoints.push(point);
				} else if(post) {
					var order;
					if(fieldMeta.post == null) order = 0; else order = fieldMeta.post[0];
					var point1 = new minject_point_PostConstructInjectionPoint(field,order);
					postConstructMethodPoints.push(point1);
				}
			} else if(type != null) {
				var name;
				if(fieldMeta.inject == null) name = null; else name = fieldMeta.inject[0];
				var point2 = new minject_point_PropertyInjectionPoint(field,fieldMeta.type[0],name);
				injectionPoints.push(point2);
			}
		}
		if(postConstructMethodPoints.length > 0) {
			postConstructMethodPoints.sort(function(a,b) {
				return a.order - b.order;
			});
			var _g2 = 0;
			while(_g2 < postConstructMethodPoints.length) {
				var point3 = postConstructMethodPoints[_g2];
				++_g2;
				injectionPoints.push(point3);
			}
		}
		if(ctorInjectionPoint == null) ctorInjectionPoint = new minject_point_NoParamsConstructorInjectionPoint();
		var injecteeDescription = new minject_InjecteeDescription(ctorInjectionPoint,injectionPoints);
		this.injecteeDescriptions.set(forClass,injecteeDescription);
		return injecteeDescription;
	}
	,getConfigurationForRequest: function(forClass,named,traverseAncestors) {
		if(traverseAncestors == null) traverseAncestors = true;
		var requestName = this.getClassName(forClass) + "#" + named;
		if(!this.injectionConfigs.exists(requestName)) {
			if(traverseAncestors && this.parentInjector != null && this.parentInjector.hasMapping(forClass,named)) return this.getAncestorMapping(forClass,named);
			return null;
		}
		return this.injectionConfigs.get(requestName);
	}
	,getClassName: function(forClass) {
		if(forClass == null) return "Dynamic"; else return Type.getClassName(forClass);
	}
	,getFields: function(type) {
		var meta = { };
		while(type != null) {
			var typeMeta = haxe_rtti_Meta.getFields(type);
			var _g = 0;
			var _g1 = Reflect.fields(typeMeta);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				Reflect.setField(meta,field,Reflect.field(typeMeta,field));
			}
			type = Type.getSuperClass(type);
		}
		return meta;
	}
	,__class__: minject_Injector
};
var minject_InjecteeSet = function() {
};
$hxClasses["minject.InjecteeSet"] = minject_InjecteeSet;
minject_InjecteeSet.__name__ = ["minject","InjecteeSet"];
minject_InjecteeSet.prototype = {
	add: function(value) {
		value.__injected__ = true;
	}
	,contains: function(value) {
		return value.__injected__ == true;
	}
	,__class__: minject_InjecteeSet
};
var minject_InjecteeDescription = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
$hxClasses["minject.InjecteeDescription"] = minject_InjecteeDescription;
minject_InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject_InjecteeDescription.prototype = {
	__class__: minject_InjecteeDescription
};
var minject_point_InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject_point_InjectionPoint;
minject_point_InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject_point_InjectionPoint.prototype = {
	__class__: minject_point_InjectionPoint
};
var minject_point_MethodInjectionPoint = function(name,args) {
	this.name = name;
	this.args = args;
	var _g = 0;
	while(_g < args.length) {
		var arg = args[_g];
		++_g;
		if(arg.type == "Dynamic") throw new js__$Boot_HaxeError("Error in method definition of injectee. Required parameters can't have non class type.");
	}
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject_point_MethodInjectionPoint;
minject_point_MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject_point_MethodInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_MethodInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),this.gatherArgs(target,injector));
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var _g = 0;
		var _g1 = this.args;
		while(_g < _g1.length) {
			var arg = _g1[_g];
			++_g;
			var name;
			if(arg.name == null) name = ""; else name = arg.name;
			var config = injector.getMapping(Type.resolveClass(arg.type),arg.name);
			var injection = config.getResponse(injector);
			if(injection == null && !arg.opt) {
				var targetName = Type.getClassName(Type.getClass(target));
				var requestName = Type.getClassName(config.request);
				throw new js__$Boot_HaxeError("Injector is missing a rule to handle injection into target " + targetName + ". " + ("Target dependency: " + requestName + ", method: " + name + ", named: ") + arg.name);
			}
			values.push(injection);
		}
		return values;
	}
	,__class__: minject_point_MethodInjectionPoint
};
var minject_point_ConstructorInjectionPoint = function(args) {
	minject_point_MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject_point_ConstructorInjectionPoint;
minject_point_ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject_point_ConstructorInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_ConstructorInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		return Type.createInstance(target,this.gatherArgs(target,injector));
	}
	,__class__: minject_point_ConstructorInjectionPoint
});
var minject_point_NoParamsConstructorInjectionPoint = function() {
};
$hxClasses["minject.point.NoParamsConstructorInjectionPoint"] = minject_point_NoParamsConstructorInjectionPoint;
minject_point_NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject_point_NoParamsConstructorInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_NoParamsConstructorInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		return Type.createInstance(target,[]);
	}
	,__class__: minject_point_NoParamsConstructorInjectionPoint
};
var minject_point_PostConstructInjectionPoint = function(name,order) {
	if(order == null) order = 0;
	this.name = name;
	this.order = order;
};
$hxClasses["minject.point.PostConstructInjectionPoint"] = minject_point_PostConstructInjectionPoint;
minject_point_PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject_point_PostConstructInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PostConstructInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),[]);
		return target;
	}
	,__class__: minject_point_PostConstructInjectionPoint
};
var minject_point_PropertyInjectionPoint = function(name,type,injectionName) {
	this.name = name;
	this.type = type;
	this.injectionName = injectionName;
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject_point_PropertyInjectionPoint;
minject_point_PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject_point_PropertyInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PropertyInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var injectionConfig = injector.getMapping(Type.resolveClass(this.type),this.injectionName);
		var injection = injectionConfig.getResponse(injector);
		if(injection == null) throw new js__$Boot_HaxeError("Injector is missing a rule to handle injection into property \"" + this.name + "\" " + ("of object \"" + Std.string(target) + "\". Target dependency: \"" + this.type + "\", named \"" + this.injectionName + "\""));
		Reflect.setProperty(target,this.name,injection);
		return target;
	}
	,__class__: minject_point_PropertyInjectionPoint
};
var minject_result_InjectionResult = function() {
};
$hxClasses["minject.result.InjectionResult"] = minject_result_InjectionResult;
minject_result_InjectionResult.__name__ = ["minject","result","InjectionResult"];
minject_result_InjectionResult.prototype = {
	getResponse: function(injector) {
		return null;
	}
	,toString: function() {
		return "";
	}
	,__class__: minject_result_InjectionResult
};
var minject_result_InjectClassResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectClassResult"] = minject_result_InjectClassResult;
minject_result_InjectClassResult.__name__ = ["minject","result","InjectClassResult"];
minject_result_InjectClassResult.__super__ = minject_result_InjectionResult;
minject_result_InjectClassResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return injector.instantiate(this.responseType);
	}
	,toString: function() {
		return "class " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectClassResult
});
var minject_result_InjectSingletonResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectSingletonResult"] = minject_result_InjectSingletonResult;
minject_result_InjectSingletonResult.__name__ = ["minject","result","InjectSingletonResult"];
minject_result_InjectSingletonResult.__super__ = minject_result_InjectionResult;
minject_result_InjectSingletonResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		if(this.response == null) {
			this.response = this.createResponse(injector);
			injector.injectInto(this.response);
		}
		return this.response;
	}
	,createResponse: function(injector) {
		return injector.construct(this.responseType);
	}
	,toString: function() {
		return "singleton " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectSingletonResult
});
var msignal_Signal0 = function() {
	msignal_Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal_Signal0;
msignal_Signal0.__name__ = ["msignal","Signal0"];
msignal_Signal0.__super__ = msignal_Signal;
msignal_Signal0.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot0(this,listener,once,priority);
	}
	,__class__: msignal_Signal0
});
var msignal_Signal1 = function(type) {
	msignal_Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal_Signal1;
msignal_Signal1.__name__ = ["msignal","Signal1"];
msignal_Signal1.__super__ = msignal_Signal;
msignal_Signal1.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot1(this,listener,once,priority);
	}
	,__class__: msignal_Signal1
});
var msignal_Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal_Slot;
msignal_Slot.__name__ = ["msignal","Slot"];
msignal_Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw new js__$Boot_HaxeError("listener cannot be null");
		return this.listener = value;
	}
	,__class__: msignal_Slot
	,__properties__: {set_listener:"set_listener"}
};
var msignal_Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal_Slot0;
msignal_Slot0.__name__ = ["msignal","Slot0"];
msignal_Slot0.__super__ = msignal_Slot;
msignal_Slot0.prototype = $extend(msignal_Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal_Slot0
});
var msignal_Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal_Slot1;
msignal_Slot1.__name__ = ["msignal","Slot1"];
msignal_Slot1.__super__ = msignal_Slot;
msignal_Slot1.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal_Slot1
});
var msignal_Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal_Slot2;
msignal_Slot2.__name__ = ["msignal","Slot2"];
msignal_Slot2.__super__ = msignal_Slot;
msignal_Slot2.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal_Slot2
});
var msignal_SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal_SlotList.NIL != null) throw new js__$Boot_HaxeError("Parameters head and tail are null. Use the NIL element instead.");
		this.nonEmpty = false;
	} else if(head == null) throw new js__$Boot_HaxeError("Parameter head cannot be null."); else {
		this.head = head;
		if(tail == null) this.tail = msignal_SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal_SlotList;
msignal_SlotList.__name__ = ["msignal","SlotList"];
msignal_SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal_SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal_SlotList(slot,this);
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal_SlotList
	,__properties__: {get_length:"get_length"}
};
var tink_core_TypedError = function() { };
$hxClasses["tink.core.TypedError"] = tink_core_TypedError;
tink_core_TypedError.__name__ = ["tink","core","TypedError"];
tink_core_TypedError.prototype = {
	printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,toString: function() {
		var ret = "Error#" + this.code + ": " + this.message;
		if(this.pos != null) ret += " " + this.printPos();
		return ret;
	}
	,throwSelf: function() {
		throw new js__$Boot_HaxeError(this);
		return this;
	}
	,__class__: tink_core_TypedError
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var __map_reserved = {}
msignal_SlotList.NIL = new msignal_SlotList(null,null);
common_client_CommonModel.__meta__ = { fields : { mainInjector : { type : ["minject.Injector"], inject : ["main"]}, buildInfo : { type : ["common.client.util.BuildInfo"], inject : null}, heartBeat : { type : ["common.client.util.HeartBeat"], inject : null}, settingsModel : { type : ["common.client.settings.SettingsModel"], inject : null}, injectionsReady : { args : null, post : null}}};
common_client_ICommon.__meta__ = { obj : { 'interface' : null}};
common_client_settings_SettingsModel.__meta__ = { fields : { settingsService : { type : ["common.client.settings.SettingsService"], inject : null}, settingsSignal : { type : ["common.client.signal.SettingsSignal"], inject : null}, settingsModelSignal : { type : ["common.client.signal.SettingsModelSignal"], inject : null}, injectionsReady : { args : null, post : null}}};
common_client_settings_SettingsService.__meta__ = { fields : { loaderService : { type : ["common.client.service.LoaderService"], inject : null}, settingsSignal : { type : ["common.client.signal.SettingsSignal"], inject : null}, injectionsReady : { args : null, post : null}}};
common_client_signal_HeartBeatSignal.CURRENT_DATE_TIME_UPDATED = "CURRENT_DATE_TIME_UPDATED";
common_client_signal_SettingsModelSignal.MODEL_UPDATED = "MODEL_UPDATED";
common_client_signal_SettingsSignal.LOAD_SUCCESS = "LOAD_SUCCESS";
common_client_util_BuildInfo.COMPILE_TARGET = "unkown hinson";
common_client_util_BuildInfo.BUILD_TARGET = "unkown hinson";
common_client_util_BuildInfo.COMPILE_DATE_TIME = new Date(2016,4,11,16,14,24);
common_client_util_BuildInfo.COMPILE_DATE_TIME_STRING = (function($this) {
	var $r;
	var _this = new Date(2016,4,11,16,14,24);
	$r = HxOverrides.dateStr(_this);
	return $r;
}(this));
common_client_util_BuildInfo.LAST_RUN_DATE_TIME_STRING = (function($this) {
	var $r;
	var _this = new Date();
	$r = HxOverrides.dateStr(_this);
	return $r;
}(this));
common_client_util_HeartBeat.__meta__ = { fields : { heartBeatSignal : { type : ["common.client.signal.HeartBeatSignal"], inject : null}, injectionsReady : { args : null, post : null}}};
common_client_util_HeartBeat.currentDateTime = new Date();
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
js_Boot.__toStr = {}.toString;
js_client_App.__meta__ = { fields : { model : { type : ["js.client.AppModel"], inject : null}, injectionsReady : { args : null, post : null}}};
js_client_AppModel.__meta__ = { fields : { commonModel : { type : ["common.client.CommonModel"], inject : null}, heartBeatSignal : { type : ["common.client.signal.HeartBeatSignal"], inject : null}, injectionsReady : { args : null, post : null}}};
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
common_client_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map