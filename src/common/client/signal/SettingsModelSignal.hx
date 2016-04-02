package common.client.signal;

import common.client.settings.SettingsModel;
import msignal.Signal.Signal2;

class SettingsModelSignal extends Signal2<String, SettingsModel>
{
  public static inline var MODEL_UPDATED:String = "MODEL_UPDATED";

  public function new()
  {
    super();
  }
}