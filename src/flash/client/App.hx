package flash.client;

import common.client.BuildInfo;
import flash.display.Sprite;
import flash.text.TextField;
import flash.errors.Error;

@:keep
class App extends Sprite
{
  @inject
  public var buildInfo:BuildInfo;

  private var _timeTextField:TextField;

  public function new()
  {
    super();

    _init();
  }

  private function _init():Void
  {
    trace('App._init()');

    _initUI();

    trace({'BuildInfo':BuildInfo});
    trace({'buildInfo':buildInfo});

    if(buildInfo != null)
    {
      trace({'buildInfo.currentDateTime':buildInfo.currentDateTime});
    }
  }

  private function _initUI():Void
  {
    trace('_initUI()');

    //draw current time
    _timeTextField = new TextField();

    //_timeTextField.text = '[current date-time ${_currentDateTime.format("%m/%d/%Y %r")}]';

    //this.
  }
}