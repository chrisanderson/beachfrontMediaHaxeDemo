package common.client;

import common.client.settings.SettingsModel;
import common.client.signal.SettingsModelSignal;
import common.client.util.BuildInfo;

#if flash
import flash.errors.Error;
#elseif js
import jQuery.*;
import js.Browser;
import js.Error;
#end

@:expose
class CommonModel
{
  @inject public var buildInfo:BuildInfo;
  @inject public var settingsModel(default, never):SettingsModel;

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

    //trace('buildInfo: $buildInfo');

    settingsModel.settingsModelSignal.add(_onSettingsModelSignal);

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

    tempJsLog.append('<br> BuildInfo.BUILD_TARGET: ${BuildInfo.BUILD_TARGET}');
    tempJsLog.append('<br> BuildInfo.COMPILE_DATE_TIME_STRING: ${BuildInfo.COMPILE_DATE_TIME_STRING}');
    tempJsLog.append('<br> BuildInfo.LAST_RUN_DATE_TIME_STRING: ${BuildInfo.LAST_RUN_DATE_TIME_STRING}');

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
    catch(error:Dynamic)
    {
      //this shouldn't be reachable but adding a trace to see if it can blow up flash anyway
      trace('${BuildInfo.COMPILE_TARGET}: trace inside of a try catch statement might cause a meltdown in flash. with throw. in catch block');
    }

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

  private function _onSettingsModelSignal(eventType:String, value:SettingsModel):Void
  {
    if(eventType != SettingsModelSignal.MODEL_UPDATED){return;}

    //settingsModel(default, never) means that
    //settingsModel is readable here but not writable
    //settingsModel = value;

    //settingsModel.settingsVO is setup for read access only
    //and won't compile we try to use write access
    //settingsModel.settingsVO = null;

    trace('settingsModel.settings.version: ${settingsModel.settings.version}');
  }
}