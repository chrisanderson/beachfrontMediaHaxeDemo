package flash.client;

import common.client.ICommon;
import common.client.CommonModel;
import common.client.signal.HeartBeatSignal;

class AppModel implements ICommon
{
  @inject public var commonModel:CommonModel;
  @inject public var heartBeatSignal(default, never):HeartBeatSignal;

  public function new()
  {
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    heartBeatSignal.add(_onHeartBeatSignal);
  }

  private function _onHeartBeatSignal(eventType:String, value:Date):Void
  {
    if(eventType != HeartBeatSignal.CURRENT_DATE_TIME_UPDATED){return;}
  }
}