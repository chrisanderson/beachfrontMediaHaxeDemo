package common.client.signal;

import common.client.settings.Settings.SettingsVO;
import msignal.Signal.Signal1;

class SettingsReadySignal extends Signal1<SettingsVO>
{
  public function new()
  {
    super();
  }
}