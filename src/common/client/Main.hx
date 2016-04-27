package common.client;

import common.client.util.HeartBeat;
import common.client.signal.HeartBeatSignal;
import common.client.signal.SettingsModelSignal;
import common.client.signal.SettingsSignal;
import common.client.util.BuildInfo;
import common.client.service.LoaderService;
import common.client.settings.*;
import minject.Injector;

#if flash
import flash.Lib;
import flash.client.App;
import flash.client.AppModel;
import flash.display.Sprite;
import flash.events.Event;
#elseif js
import js.client.App;
import js.client.AppModel;
import js.Browser;
#end

#if js
@:expose
#end
@:keep
class Main #if flash extends Sprite #end
{
  private var _mainInjector = new Injector();

  #if flash
  private var _app:App;
  #elseif js
  private var _app:App;
  #end

  public static function main()
  {
    trace('main()');

    var mainInstance = new Main();
  }

  public function new()
  {
    #if flash
    super();
    #end

    trace('new()');

    _init();
    _initInjector();
  }

  private function _init():Void
  {
    trace('_init()');

    //setup flash embed as early as possible
    var tempFlashVars = {};
    var tempSwfParams =
    {
      menu:"false"
      ,scale:"noScale"
      ,allowFullscreen:"true"
      ,allowScriptAccess:"always"
      ,bgcolor:"#eeeeee"
      ,wmode:"direct"
      //,width:"300"
      //,height:"300"
    };

    //these will trace to all targets (currently just flash and js)
    trace({'tempFlashVars':tempFlashVars});
    trace({'tempSwfParams':tempSwfParams});

    //this only occurs when the js target is being compiled because of the compiler instructions #if js
    //will blow up other targets like flash if the compiler instructions were not used
    #if js
    var tempSwfContainer = Browser.document.querySelector('#swfContainer');

    trace({'tempSwfContainer':tempSwfContainer});

    //if you don't want to wrap a library in a haxe extern you can use haxe magic to directly write to a target
    //here i use __js__ to write raw js.  the untyped keyword tells the haxe compiler
    //to not try to use any typing logic and to just accept the code as is
    var tempSwfObject = untyped __js__('swfobject.embedSWF("swf/main.swf", {0}, "50%", "100%", 10, null, {1}, {2})', tempSwfContainer, tempFlashVars, tempSwfParams);
    #elseif flash
    trace('stageWidth: ' + Lib.current.stage.stageWidth + ' stageHeight: ' + Lib.current.stage.stageHeight);

    //give this sprite display content so we can add real dimensions
    graphics.clear();
    graphics.beginFill(0xff0000, 0);
    graphics.drawRect(0, 0, Lib.current.stage.stageWidth, Lib.current.stage.stageHeight);
    graphics.endFill();

    width = Lib.current.stage.stageWidth;
    height = Lib.current.stage.stageHeight;

    trace('width: ' + width + ' height: ' + height);

    Lib.current.stage.addChild(this);
    Lib.current.stage.addEventListener(Event.ADDED_TO_STAGE, _onAddedToStage, false, 0, true);
    #end
  }

  private function _initInjector():Void
  {
    trace('_initInjector()');

    _mainInjector.mapSingleton(Injector, 'main');//thought about passing an instance of the _mainInjector around via CommonModel
    _mainInjector.mapSingleton(BuildInfo);
    _mainInjector.mapSingleton(CommonModel);
    _mainInjector.mapSingleton(SettingsModel);
    _mainInjector.mapSingleton(SettingsService);
    _mainInjector.mapSingleton(HeartBeat);
    _mainInjector.mapSingleton(SettingsSignal);
    _mainInjector.mapSingleton(SettingsModelSignal);
    _mainInjector.mapSingleton(HeartBeatSignal);

    _mainInjector.mapClass(LoaderService, LoaderService);

    #if flash
    _mainInjector.mapSingleton(AppModel);

    //_app = new App();
    //_mainInjector.injectInto(_app);

    _app = _mainInjector.instantiate(App);

    _initUI();//fix here this should be called in _onAddedToStage
    #elseif js
    _mainInjector.mapSingleton(AppModel);

    //_app = new App();
    //_mainInjector.injectInto(_app);

    _app = _mainInjector.instantiate(App);

    _initUI();
    #end

    //this these classes are intended to be used by both flash and js at the same time
    //and can be instantiated outside the conditional compiler logic that's client side specific
    //_mainInjector.instantiate(CommonModel);//commented out now that inject it into other models
  }

  private function _initUI():Void
  {
    trace('_initUI()');

    #if flash
    addChild(_app);
    #end
  }

  #if flash
  private function _onAddedToStage(event:Event):Void
  {
    trace('_onAddedToStage()');

    Lib.current.stage.removeEventListener(Event.ADDED_TO_STAGE, _onAddedToStage);

    _initUI();
  }
  #end
}