package common.client.signal;

import msignal.Signal.Signal2;

class HeartBeatSignal extends Signal2<String, Date>
{
  public static inline var CURRENT_DATE_TIME_UPDATED:String = "CURRENT_DATE_TIME_UPDATED";

  public function new()
  {
    super();
  }
}