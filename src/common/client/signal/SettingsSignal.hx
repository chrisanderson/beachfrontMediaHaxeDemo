package common.client.signal;

import common.client.settings.Settings;
import msignal.Signal.Signal2;

class SettingsSignal extends Signal2<String, Settings>
{
  public static inline var LOAD_SUCCESS:String = "LOAD_SUCCESS";

  public function new()
  {
    super();
  }
}