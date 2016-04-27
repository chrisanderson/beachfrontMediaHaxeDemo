package common.client;

import minject.Injector;
import common.client.util.HeartBeat;
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
  @inject('main') public var mainInjector:Injector;//injecting the main injector instance
  @inject public var buildInfo:BuildInfo;
  @inject public var heartBeat:HeartBeat;
  @inject public var settingsModel(default, never):SettingsModel;

  public function new()
  {
    _init();
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    trace({'mainInjector':mainInjector});
    trace({'buildInfo':buildInfo});
    trace({'settingsModel':settingsModel});

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