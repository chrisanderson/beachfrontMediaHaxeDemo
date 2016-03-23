package common.client.settings;

import common.client.settings.Settings;
import common.client.util.LoaderService;
import haxe.Json;

class SettingsService
{
  @inject public var _loaderService:LoaderService;
  @inject public var _settingsVO:SettingsVO;

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
    _loaderService.loadFromUrl(url, _onSettingsLoadSuccess);
  }

  private function _onSettingsLoadSuccess(result:String):Void
  {
    trace('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    trace({'_onSettingsLoadSuccess() result':result});

    _settings = Json.parse(result);
    _settingsVO.settings = _settings;
    //_settingsVO = _settings;

    trace({'_onSettingsLoadSuccess() _settings':_settings});

    trace('_onSettingsLoadSuccess() _settingsVO.settings: ${_settingsVO.settings}');
    trace('_onSettingsLoadSuccess() _settingsVO.settings.version: ${_settingsVO.settings.version}');
    trace('_onSettingsLoadSuccess() _settingsVO.settings.data.settings.width: ${_settingsVO.settings.data.settings.width}');
    trace('_onSettingsLoadSuccess() _settingsVO.settings.data.settings.height: ${_settingsVO.settings.data.settings.height}');
  }
}