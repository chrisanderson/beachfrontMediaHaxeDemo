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

  public var compileDateTimeElement(default, set):JQuery;
  public var currentDateTimeElement(default, set):JQuery;

  public function new()
  {
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    heartBeatSignal.add(_onHeartBeatSignal);
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
}