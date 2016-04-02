package common.client.settings;

import String;
import common.client.signal.SettingsSignal;
import common.client.signal.SettingsModelSignal;
import common.client.settings.Settings.SettingsVO;

@:keep
class SettingsModel
{
  @inject public var settingsService(default, null):SettingsService;
  @inject public var settingsSignal(default, null):SettingsSignal;
  @inject public var settingsModelSignal(default, null):SettingsModelSignal;

  public var settingsVO(default, null):SettingsVO;

  public function new()
  {
  }

  @post //this method is called automatically because of @post metadata
  public function injectionsReady():Void
  {
    _init();
  }

  private function _init():Void
  {
    trace('_init()');

    settingsSignal.add(_onSettingsSignal);

    settingsService.loadSettings('runtime/test.json');
    //settingsService.loadSettings('runtime/testBroken.json');
    //settingsService.loadSettings('nonExisting.json');
  }

  private function _onSettingsSignal(eventType:String, value:SettingsVO):Void
  {
    if(eventType != SettingsSignal.LOAD_SUCCESS){return;}

    settingsVO = value;

    trace({'_onSettingsReady settingsVO.settings':settingsVO.settings});
    trace({'_onSettingsReady settingsVO.settings.version':settingsVO.settings.version});
    trace({'_onSettingsReady settingsVO.settings.data.settings.width':settingsVO.settings.data.settings.width});
    trace({'_onSettingsReady settingsVO.settings.data.settings.height':settingsVO.settings.data.settings.height});

    settingsModelSignal.dispatch(SettingsModelSignal.MODEL_UPDATED, this);
  }
}