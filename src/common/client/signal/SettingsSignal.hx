package common.client.signal;

import common.client.settings.Settings.SettingsVO;
import msignal.Signal.Signal2;

class SettingsSignal extends Signal2<String, SettingsVO>
{
  public static inline var LOAD_SUCCESS:String = "LOAD_SUCCESS";

  public function new()
  {
    super();
  }
}