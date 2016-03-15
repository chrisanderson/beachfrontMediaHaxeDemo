package client;

import haxe.Timer;

#if flash
import flash.errors.Error;
#end

#if js
import js.Error;
import js.Browser;
import jQuery.*;
#end

using DateTools;

@:expose
class Main
{
  private static var _COMPILE_TARGET = 'unkown hinson';
  private static var _BUILD_TARGET = 'unkown hinson';
  private static var _COMPILE_DATE_TIME = CompileTime.buildDate();
  private static var _COMPILE_DATE_TIME_STRING = CompileTime.buildDate().toString();
  private static var _LAST_RUN_DATE_TIME_STRING = Date.now().toString();

  private var _currentDateTime = Date.now();

  public static function main()
  {
    #if js
    _COMPILE_TARGET = 'js';
    #elseif flash
    _COMPILE_TARGET = 'flash';
    #end

    #if debug
    _BUILD_TARGET = 'debug';
    #elseif !debug
    _BUILD_TARGET = 'release';
    #end

    trace('_COMPILE_TARGET: $_COMPILE_TARGET');
    trace('_BUILD_TARGET: $_BUILD_TARGET');
    trace('_COMPILE_DATE_TIME_STRING: $_COMPILE_DATE_TIME_STRING');
    trace('_LAST_RUN_DATE_TIME_STRING: $_LAST_RUN_DATE_TIME_STRING');

    trace('main()');

    var mainInstance = new Main();
  }

  public function new()
  {
    trace('new()');

    _init();
  }

  private function _init():Void
  {
    trace('init()');

    var tempFlashVars = {};
    var tempSwfParams =
    {
      menu:"false"
      ,scale:"noScale"
      ,allowFullscreen:"true"
      ,allowScriptAccess:"always"
      ,bgcolor:"#eeeeee"
      ,wmode:"direct"
    };

    //these will trace to all targets (currently just flash and js)
    trace({'tempFlashVars':tempFlashVars});
    trace({'tempSwfParams':tempSwfParams});

    //this only occurs when the js target is being compiled because of the compiler instructions #if js
    //will blow up other targets like flash if the compiler instructions were not used
    #if js
    var tempAppTitle = new JQuery('.app-title');
    var tempCurrentDateTime = new JQuery('.current-date-time');
    var tempSwfContainer = Browser.document.querySelector('#swfContainer');

    trace({'tempAppTitle':tempAppTitle});
    trace({'tempCurrentDateTime':tempCurrentDateTime});
    trace({'tempSwfContainer':tempSwfContainer});

    //you can use methods etc using string interpolation using the ${} syntax
    //also notice .format() at the end of the string.
    //it's available as a method because of static extension and i have using DateTools; at the top of this file
    tempAppTitle.append('<br> [last compile date-time ${_COMPILE_DATE_TIME.format("%m/%d/%Y %r")}]');

    var timeTimer = new Timer(1000);
    timeTimer.run = function()
    {
      _currentDateTime = Date.now();

      tempCurrentDateTime.text('[current date-time ${_currentDateTime.format("%m/%d/%Y %r")}]');
    }

    //if you don't want to wrap a library in a haxe extern you can use haxe magic to directly write to a target
    //here i use __js__ to write raw js.  the untyped keyword tells haxe to not try to use any typing logic and to just accept the code as is
    var tempSwfObject = untyped __js__('swfobject.embedSWF("swf/main.swf", {0}, "100%", 300, 10, null, {1}, {2})', tempSwfContainer, tempFlashVars, tempSwfParams);

    //haxe's ability to remove traces won't remove direct calls to console Browser.console.log()
    //but i added a gulp task to strip debug calls for the release target
    Browser.console.log("this will only appear in the debug version of the js output");
    #end


    var tempValue = 1;

    trace("tempValue: " + tempValue);

    #if debug
    //this increment doesn't occur in a release build
    tempValue++;
    #end

    trace("tempValue: " + tempValue);

    tempValue++;

    trace("tempValue: " + tempValue);

    #if js
    var tempJsLog = new JQuery('#jsLog');

    trace({'tempJsLog':tempJsLog});

    tempJsLog.append('<br> _BUILD_TARGET: $_BUILD_TARGET');
    tempJsLog.append('<br> _COMPILE_DATE_TIME_STRING: $_COMPILE_DATE_TIME_STRING');
    tempJsLog.append('<br> _LAST_RUN_DATE_TIME_STRING: $_LAST_RUN_DATE_TIME_STRING');

    //because we increment tempValue only in a debug build
    //tempValue will be 3 for debug but 2 for release
    tempJsLog.append('<br> tempValue: $tempValue');
    #end

    var tempErrorMessage = 'error message thrown for trace';
    var tempError = null;

    #if flash
    tempError = new Error('$_COMPILE_TARGET: $tempErrorMessage');
    #elseif js
    tempError = new Error('$_COMPILE_TARGET: $tempErrorMessage');
    #end

    //does this still blow up flash?
    try
    {
      trace('$_COMPILE_TARGET: trace inside of a try catch statement might cause a meltdown in flash. without throw. in try block');
    }
    catch(error:Dynamic){}

    try
    {
      trace('$_COMPILE_TARGET: trace inside of a try catch statement might cause a meltdown in flash. with throw. in try block');

      throw tempError;
    }
    catch(error:Dynamic)
    {
      trace('$_COMPILE_TARGET: trace inside of a try catch statement might cause a meltdown in flash. with throw. in catch block');
    }
  }
}