package client;

#if js
import js.Browser;
#end

@:expose
class Main
{
  public static var COMPILE_TARGET = 'unkown hinson';

  public static function main()
  {
    #if js
    COMPILE_TARGET = 'js';
    #elseif flash
    COMPILE_TARGET = 'flash';
    #end

    trace('main() COMPILE_TARGET: $COMPILE_TARGET');

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
    var tempSwfContainer = Browser.document.querySelector('#swfContainer');

    trace({'tempSwfContainer':tempSwfContainer});

    //if you don't want to wrap a library in a haxe extern you can use haxe magic to directly write to a target
    //here i use __js__ to write raw js.  the untyped keyword tells haxe to not try to use any typing logic and to just accept the code as is
    var tempSwfObject = untyped __js__('swfobject.embedSWF("swf/main.swf", {0}, 400, 300, 10, null, {1}, {2})', tempSwfContainer, tempFlashVars, tempSwfParams);

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
    var tempJsLog = Browser.document.querySelector('#jsLog');

    //because we increment tempValue only in a debug build
    //tempValue will be 3 for debug but 2 for release
    tempJsLog.innerText += 'tempValue: ' + tempValue;
    #end
  }
}