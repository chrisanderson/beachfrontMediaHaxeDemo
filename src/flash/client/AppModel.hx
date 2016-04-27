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

  public var currentDateTimeTextField(default, set):TextField;

  public function new()
  {
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    heartBeatSignal.add(_onHeartBeatSignal);
  }

  public function set_currentDateTimeTextField(value:TextField):TextField
  {
    currentDateTimeTextField = value;

    _updateCurrentDateTimeTextField(Date.now());

    return currentDateTimeTextField;
  }

  private function _onHeartBeatSignal(eventType:String, value:Date):Void
  {
    if(eventType != HeartBeatSignal.CURRENT_DATE_TIME_UPDATED){return;}

    _updateCurrentDateTimeTextField(value);
  }

  private function _updateCurrentDateTimeTextField(currentDateTime:Date):Void
  {
    if(currentDateTimeTextField == null){return;}

    currentDateTimeTextField.text = '[current date-time ${currentDateTime.format("%m/%d/%Y %r")}]';
  }
}