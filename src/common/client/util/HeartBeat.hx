package common.client.util;

import common.client.signal.HeartBeatSignal;
import haxe.Timer;

@:keep //protect this class from being removed by dce == full
@:expose
class HeartBeat
{
  @inject public var heartBeatSignal:HeartBeatSignal;

  //this is readonly because the second param null blocks write access
  public static var currentDateTime(default, null) = Date.now();
  //using (get, set) means you can override the default behavior if needed
  //@:isVar public var currentDateTime(get, set) = Date.now();//try this'n to see compiler complain about missing getter and setter

  public function new()
  {
    _init();
  }

  private function _init():Void
  {
    //
  }

  @post //this method is called automatically because of @post metadata
  public function injectionsReady():Void
  {
    #if (flash || js)
    var timeTimer = new Timer(1000);

    timeTimer.run = _onTimerTick;
    #end
  }

  private function _onTimerTick():Void
  {
    currentDateTime = Date.now();

    heartBeatSignal.dispatch(HeartBeatSignal.CURRENT_DATE_TIME_UPDATED, currentDateTime);
  }
}