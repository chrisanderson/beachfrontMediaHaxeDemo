package common.client;

#if flash
import flash.errors.Error;
import common.client.BuildInfo;
#elseif js
import jQuery.*;
import js.Browser;
import js.Error;
#end

class Test
{
  @inject
  public var buildInfo:BuildInfo;

  public function new()
  {
    _init();
  }

  @post //this method is called automatically because of @post metadata
  public function injectionsReady():Void
  {
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

    #if flash
    tempError = new Error('${BuildInfo.COMPILE_TARGET}: $tempErrorMessage');
    #elseif js
    tempError = new Error('${BuildInfo.COMPILE_TARGET}: $tempErrorMessage');
    #end

    //does this still blow up flash?
    try
    {
      trace('${BuildInfo.COMPILE_TARGET}: trace inside of a try catch statement might cause a meltdown in flash. without throw. in try block');
    }
    catch(error:Dynamic){}

    try
    {
      trace('${BuildInfo.COMPILE_TARGET}: trace inside of a try catch statement might cause a meltdown in flash. with throw. in try block');

      throw tempError;
    }
    catch(error:Dynamic)
    {
      trace('${BuildInfo.COMPILE_TARGET}: trace inside of a try catch statement might cause a meltdown in flash. with throw. in catch block');
    }
  }

  private function _init():Void
  {
    trace('_init()');
  }
}