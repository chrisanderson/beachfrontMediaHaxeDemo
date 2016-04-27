package js.client;

import common.client.util.BuildInfo;
import common.client.ICommon;
import common.client.CommonModel;
import common.client.signal.HeartBeatSignal;
import jQuery.JQuery;

using DateTools;

class AppModel implements ICommon
{
  @inject public var commonModel:CommonModel;
  @inject public var heartBeatSignal(default, never):HeartBeatSignal;

  public var jsLogElement(null, set):JQuery;
  public var compileDateTimeElement(null, set):JQuery;
  public var currentDateTimeElement(null, set):JQuery;

  public function new()
  {
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    heartBeatSignal.add(_onHeartBeatSignal);
  }

  public function set_jsLogElement(value:JQuery):JQuery
  {
    jsLogElement = value;

    _logMessage('<br> BuildInfo.BUILD_TARGET: ${BuildInfo.BUILD_TARGET}');
    _logMessage('<br> BuildInfo.COMPILE_DATE_TIME_STRING: ${BuildInfo.COMPILE_DATE_TIME_STRING}');
    _logMessage('<br> BuildInfo.LAST_RUN_DATE_TIME_STRING: ${BuildInfo.LAST_RUN_DATE_TIME_STRING}');

    return jsLogElement;
  }

  public function set_compileDateTimeElement(value:JQuery):JQuery
  {
    compileDateTimeElement = value;

    //you can use methods etc using string interpolation using the ${} syntax
    //also notice .format() at the end of the string.
    //it's available as a method because of static extension and i have using DateTools; at the top of this file
    compileDateTimeElement.text('[last compile date-time ${BuildInfo.COMPILE_DATE_TIME.format("%m/%d/%Y %r")}]');

    return compileDateTimeElement;
  }

  public function set_currentDateTimeElement(value:JQuery):JQuery
  {
    currentDateTimeElement = value;

    _updateCurrentDateTimeElement(Date.now());

    return currentDateTimeElement;
  }

  private function _onHeartBeatSignal(eventType:String, value:Date):Void
  {
    if(eventType != HeartBeatSignal.CURRENT_DATE_TIME_UPDATED){return;}

    _updateCurrentDateTimeElement(value);
  }

  private function _updateCurrentDateTimeElement(currentDateTime:Date):Void
  {
    if(currentDateTimeElement == null){return;}

    currentDateTimeElement.text('[current date-time ${currentDateTime.format("%m/%d/%Y %r")}]');
  }

  private function _logMessage(message:String):Void
  {
    if(jsLogElement == null){return;}

    //because we increment tempValue only in a debug build
    //tempValue will be 3 for debug but 2 for release
    jsLogElement.append(message);
  }
}