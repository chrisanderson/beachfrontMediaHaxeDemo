package common.client;

#if flash
import flash.client.App;
import flash.display.Sprite;
#elseif js
import js.client.App;
import jQuery.*;
import js.Browser;
#end

import minject.Injector;
import haxe.Timer;

using DateTools;

@:expose
class Main #if flash extends Sprite #end
{
  private var _mainInjector = new Injector();

  #if flash
  private var _app:App;
  #elseif js
  private var _app:App;
  #end

  public static function main()
  {
    trace('main()');

    var mainInstance = new Main();
  }

  public function new()
  {
    #if flash
    super();
    #end

    trace('new()');

    _init();
    _initInjector();
    _initUI();
  }

  private function _init():Void
  {
    trace('init()');

    //setup flash embed as early as possible
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
    //tempAppTitle.append('<br> [last compile date-time ${_COMPILE_DATE_TIME.format("%m/%d/%Y %r")}]');

    //if you don't want to wrap a library in a haxe extern you can use haxe magic to directly write to a target
    //here i use __js__ to write raw js.  the untyped keyword tells haxe to not try to use any typing logic and to just accept the code as is
    var tempSwfObject = untyped __js__('swfobject.embedSWF("swf/main.swf", {0}, "100%", 300, 10, null, {1}, {2})', tempSwfContainer, tempFlashVars, tempSwfParams);

    //haxe's ability to remove traces won't remove direct calls to console Browser.console.log()
    //but i added a gulp task to strip debug calls for the release target
    Browser.console.log("this will only appear in the debug version of the js output");
    #end

    //#if (flash || js)
    //var timeTimer = new Timer(1000);
    //timeTimer.run = function()
    //{
    //  _currentDateTime = Date.now();
    //
    //  #if js
    //  tempCurrentDateTime.text('[current date-time ${_currentDateTime.format("%m/%d/%Y %r")}]');
    //  #end
    //}
    //#end

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

    //tempJsLog.append('<br> _BUILD_TARGET: $_BUILD_TARGET');
    //tempJsLog.append('<br> _COMPILE_DATE_TIME_STRING: $_COMPILE_DATE_TIME_STRING');
    //tempJsLog.append('<br> _LAST_RUN_DATE_TIME_STRING: $_LAST_RUN_DATE_TIME_STRING');

    //because we increment tempValue only in a debug build
    //tempValue will be 3 for debug but 2 for release
    tempJsLog.append('<br> tempValue: $tempValue');
    #end

    var tempErrorMessage = 'error message thrown for trace';
    var tempError = null;

    //#if flash
    //tempError = new Error('$_COMPILE_TARGET: $tempErrorMessage');
    //#elseif js
    //tempError = new Error('$_COMPILE_TARGET: $tempErrorMessage');
    //#end
    //
    ////does this still blow up flash?
    //try
    //{
    //  trace('$_COMPILE_TARGET: trace inside of a try catch statement might cause a meltdown in flash. without throw. in try block');
    //}
    //catch(error:Dynamic){}
    //
    //try
    //{
    //  trace('$_COMPILE_TARGET: trace inside of a try catch statement might cause a meltdown in flash. with throw. in try block');
    //
    //  throw tempError;
    //}
    //catch(error:Dynamic)
    //{
    //  trace('$_COMPILE_TARGET: trace inside of a try catch statement might cause a meltdown in flash. with throw. in catch block');
    //}
  }

  private function _initInjector():Void
  {
    trace('_initInjector()');

    _mainInjector.mapSingleton(BuildInfo);

    #if flash
    _app = _mainInjector.instantiate(App);
    #elseif js
    _app = _mainInjector.instantiate(App);
    #end
  }

  private function _initUI():Void
  {
    trace('_initUI()');

    #if flash
    addChild(_app);
    #end
  }
}