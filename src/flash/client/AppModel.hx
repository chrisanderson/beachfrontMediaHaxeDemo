package flash.client;

import flash.text.TextField;
import common.client.ICommon;
import common.client.CommonModel;
import common.client.signal.HeartBeatSignal;

using DateTools;

class AppModel implements ICommon
{
  @inject public var commonModel:CommonModel;
  @inject public var heartBeatSignal(default, never):HeartBeatSignal;

  public var currentDateTimeTextField(default, default):TextField;

  public function new()
  {
    _updateCurrentDateTimeTextField(Date.now());
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    heartBeatSignal.add(_onHeartBeatSignal);
  }

  private function _onHeartBeatSignal(eventType:String, value:Date):Void
  {
    if(eventType != HeartBeatSignal.CURRENT_DATE_TIME_UPDATED){return;}

    _updateCurrentDateTimeTextField(value);
  }

  private function _updateCurrentDateTimeTextField(currentDateTime:Date):Void
  {
    currentDateTimeTextField.text = '[current date-time ${currentDateTime.format("%m/%d/%Y %r")}]';
  }
}