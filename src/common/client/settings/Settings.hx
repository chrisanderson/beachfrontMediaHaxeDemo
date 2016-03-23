package common.client.settings;

@:keep
@:struct
typedef Settings =
{
  var version:String;
  var error:Int;
  var completed_in:String;
  var msg:String;

  var data:SettingsDataProp;
  //var data:Dynamic = {
  //  var id:String;
  //};
}

@:keep
typedef SettingsDataProp =
{
  var id:String;
  var title:String;
  var status:String;

  var settings:SettingsDataSettingsProp;
}

@:keep
typedef SettingsDataSettingsProp =
{
  var autoplay:Bool;
  var fixed_size:Bool;
  var maintain_16_x_9:Bool;
  var width:Int;
  var height:Int;
}

@:keep
class SettingsVO
{
  public var settings(default, set):Settings;

  private function set_settings(value:Settings):Settings
  {
    if(settings == null)
    {
      settings = value;
    }

    return settings;
  }
}