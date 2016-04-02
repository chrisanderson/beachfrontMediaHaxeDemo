package common.client.settings;

import common.client.signal.SettingsSignal;
import common.client.settings.Settings;
import common.client.util.LoaderService;
import haxe.Json;

class SettingsService
{
  @inject public var loaderService:LoaderService;
  @inject public var settingsVO:SettingsVO;
  @inject public var settingsSignal:SettingsSignal;

  private var _settings:Settings;

  public function new()
  {
  }

  @post //this method is called automatically because of @post metadata
  public function injectionsReady():Void
  {
  }

  public function loadSettings(url:String):Void
  {
    loaderService.loadFromUrl(url, _onSettingsLoadSuccess);

    //return loaderService.loadFromUrl(url, function(result:String):Settings
    //{
    //  return _onSettingsLoadSuccess(result);
    //});
  }

  private function _onSettingsLoadSuccess(result:String):Void
  {
    //trace({'_onSettingsLoadSuccess() result':result});

    _settings = Json.parse(result);
    settingsVO.settings = _settings;

    //trace({'_onSettingsLoadSuccess() _settings':_settings});

    settingsSignal.dispatch(SettingsSignal.LOAD_SUCCESS, settingsVO);
  }
}