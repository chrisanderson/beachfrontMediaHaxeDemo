package common.client.settings;

@:keep
class SettingsModel
{
  @inject public var settingsService:SettingsService;

  public function new()
  {
  }

  @post //this method is called automatically because of @post metadata
  public function injectionsReady():Void
  {
    settingsService.loadSettings('runtime/test.json');
    //settingsService.loadSettings('runtime/testBroken.json');
    //settingsService.loadSettings('nonExisting.json');
  }
}