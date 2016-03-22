package js.client;

import common.client.BuildInfo;
import jQuery.JQuery;
import js.Browser;

using DateTools;

@:keep
class App
{
  @inject public var buildInfo:BuildInfo;

  private var _appTitleElement = new JQuery('.app-title');
  private var _compileDateTimeElement = new JQuery('.compile-date-time');
  private var _currentDateTimeElement = new JQuery('.current-date-time');
  private var _swfContainerElement = new JQuery('#swfContainer');
  private var _jsLogElement = new JQuery('#jsLog');

  public function new()
  {
    _init();
  }

  @post //this method is called automatically because of @post metadata
  public function injectionsReady():Void
  {
    if(_appTitleElement == null)
    {
      _initUI();
    }
  }

  private function _init():Void
  {
    trace('_init()');

    _initUI();
  }

  private function _initUI():Void
  {
    trace({'_appTitleElement':_appTitleElement});
    trace({'_compileDateTimeElement':_compileDateTimeElement});
    trace({'_currentDateTimeElement':_currentDateTimeElement});
    trace({'_swfContainerElement':_swfContainerElement});

    //you can use methods etc using string interpolation using the ${} syntax
    //also notice .format() at the end of the string.
    //it's available as a method because of static extension and i have using DateTools; at the top of this file
    _compileDateTimeElement.text('[last compile date-time ${BuildInfo.COMPILE_DATE_TIME.format("%m/%d/%Y %r")}]');

    //haxe's ability to remove traces won't remove direct calls to console Browser.console.log()
    //but i added a gulp task to strip debug calls for the release target
    Browser.console.log("this will only appear in the debug version of the js output");
  }
}