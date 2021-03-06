package flash.client;

import flash.events.Event;
import flash.client.AppModel;
import flash.Lib;
import flash.display.Sprite;
import flash.text.TextField;

@:keep
class App extends Sprite
{
  @inject public var model:AppModel;

  private var _timeTextField:TextField;
  private var _timeTextFieldXOffset:Float = 0;

  public function new()
  {
    super();

    _init();
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    //trace('model: ' + model);

    model.currentDateTimeTextField = _timeTextField;
  }

  private function _init():Void
  {
    trace('_init()');

    _initUI();
  }

  private function _initUI():Void
  {
    trace('stageWidth: ' + Lib.current.stage.stageWidth + ' stageHeight: ' + Lib.current.stage.stageHeight);

    Lib.current.stage.addEventListener(Event.RESIZE, _onResize, false, 0, true);

    //give this sprite display content so we can add real dimensions
    graphics.clear();
    graphics.beginFill(0x00cc00, 0);
    graphics.drawRect(0, 0, Lib.current.stage.stageWidth, Lib.current.stage.stageHeight);
    graphics.endFill();

    width = Lib.current.stage.stageWidth;
    height = Lib.current.stage.stageHeight;

    trace('_initUI() width: ' + width + ' height: ' + height);

    //draw current time
    _timeTextField = new TextField();
    _timeTextField.width = 224;
    _timeTextField.height = 20;
    _timeTextField.x = Lib.current.stage.stageWidth - _timeTextField.width - _timeTextFieldXOffset;
    _timeTextField.y = 10;
    _timeTextField.border = false;
    _timeTextField.wordWrap = true;

    addChild(_timeTextField);
  }

  private function _onResize(event = null):Void
  {
    //trace('_onResize() stageWidth: ' + Lib.current.stage.stageWidth + ' stageHeight: ' + Lib.current.stage.stageHeight);

    _timeTextField.x = Lib.current.stage.stageWidth - _timeTextField.width - _timeTextFieldXOffset;
  }
}