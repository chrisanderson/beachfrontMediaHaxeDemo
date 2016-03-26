package common.client.settings;

import common.client.signal.SettingsReadySignal;
import common.client.settings.Settings.SettingsVO;

@:keep
class SettingsModel
{
  @inject public var settingsService:SettingsService;
  @inject public var settingsReadySignal:SettingsReadySignal;

  public var settingsVO(default, null):SettingsVO;

  public function new()
  {
  }

  @post //this method is called automatically because of @post metadata
  public function injectionsReady():Void
  {
    settingsReadySignal.add(_onSettingsReady);

    settingsService.loadSettings('runtime/test.json');
    //settingsService.loadSettings('runtime/testBroken.json');
    //settingsService.loadSettings('nonExisting.json');
  }

  private function _onSettingsReady(value:SettingsVO):Void
  {
    settingsVO = value;

    trace({'_onSettingsReady settingsVO.settings':settingsVO.settings});
    trace({'_onSettingsReady settingsVO.settings.version':settingsVO.settings.version});
    trace({'_onSettingsReady settingsVO.settings.data.settings.width':settingsVO.settings.data.settings.width});
    trace({'_onSettingsReady settingsVO.settings.data.settings.height':settingsVO.settings.data.settings.height});
  }
}