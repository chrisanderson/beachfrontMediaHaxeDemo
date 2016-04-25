package common.client.settings;

//@:keep
//@:structInit
typedef Settings =
{
  var version:String;
  var error:Int;
  var completed_in:String;
  var msg:String;

  var data:SettingsDataProp;
}

//@:keep
typedef SettingsDataProp =
{
  var id:String;
  var title:String;
  var status:String;

  var settings:SettingsDataSettingsProp;
}

//@:keep
typedef SettingsDataSettingsProp =
{
  var autoplay:Bool;
  var fixed_size:Bool;
  var maintain_16_x_9:Bool;
  var width:Int;
  var height:Int;
}