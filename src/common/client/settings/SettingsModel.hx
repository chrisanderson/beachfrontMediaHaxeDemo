package common.client.settings;

import String;
import common.client.signal.SettingsSignal;
import common.client.signal.SettingsModelSignal;

@:keep
class SettingsModel
{
  @inject public var settingsService(default, null):SettingsService;
  @inject public var settingsSignal(default, null):SettingsSignal;
  @inject public var settingsModelSignal(default, null):SettingsModelSignal;

  public var settings(default, null):Settings;

  public function new()
  {
  }

  @post //this method is called automatically when injections are done because of @post metadata
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

  private function _onSettingsSignal(eventType:String, value:Settings):Void
  {
    if(eventType != SettingsSignal.LOAD_SUCCESS){return;}

    settings = value;

    //this will not compile because the Settings.version is typed as a String
    //means we can define restrictive types for any dynamic data to help reduce errors
    //settings.version = false;
    //same here settings.data.id is typed as a String
    //settings.data.id = false;

    trace({'_onSettingsReady settings':settings});
    trace({'_onSettingsReady settings.version':settings.version});
    trace({'_onSettingsReady settings.data.settings.width':settings.data.settings.width});
    trace({'_onSettingsReady settings.data.settings.height':settings.data.settings.height});

    settingsModelSignal.dispatch(SettingsModelSignal.MODEL_UPDATED, this);
  }
}