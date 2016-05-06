package js.client;

import haxe.Timer;
import js.html.DivElement;
import js.html.CanvasElement;
import js.html.VideoElement;
import js.Browser;
import js.client.DomCompletion;
import jQuery.JQuery;

#if macro @:build(js.client.DomCompletion.build("http://api.haxe.org/"))#end
@:keep
class App
{
  @inject public var model:AppModel;

  private var _appTitleElement = new JQuery('.app-title');
  private var _compileDateTimeElement = new JQuery('.compile-date-time');
  private var _currentDateTimeElement = new JQuery('.current-date-time');
  private var _swfContainerElement = new JQuery('#swfContainer');
  private var _jsLogElement = new JQuery('#jsLog');
  private var _canvasElement:CanvasElement = cast Browser.document.querySelector('#canvas');
  //private var _videoElement:VideoElement = cast Browser.document.querySelector('#video');
  private var _videoElement:VideoElement;
  private var _videoContainer:DivElement = cast Browser.document.querySelector('#videoContainer');

  public function new()
  {
    _init();

    //App.idList.
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    if(_appTitleElement == null)
    {
      _initUI();
    }

    model.jsLogElement = _jsLogElement;
    model.compileDateTimeElement = _compileDateTimeElement;
    model.currentDateTimeElement = _currentDateTimeElement;
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
    trace({'_jsLogElement':_jsLogElement});

    //haxe's ability to remove traces won't remove direct calls to console Browser.console.log()
    //but i added a gulp task to strip debug calls for the release target
    Browser.console.log("this will only appear in the debug version of the js output");

    //setup the video logic
    _videoElement = Browser.document.createVideoElement();
    _videoElement.id = 'videoDynamic';
    _videoElement.src = 'http://e736daa9861a3da5faf4-49d13c85de3b1b0658221edbffbf1629.r69.cf2.rackcdn.com/bigbuckbunny.mp4';
    _videoElement.autoplay = true;
    _videoElement.controls = true;
    _videoElement.loop = true;

    //_videoDynamicContainer = Browser.document.createDivElement();
    //_videoDynamicContainer.id = 'videoDynamicContainer';

    //Browser.document.body.appendChild(_videoDynamicContainer);
    _videoContainer.appendChild(_videoElement);

    _videoElement.addEventListener('progress', _onVideoProgress, false);
    _videoElement.addEventListener('canplaythrough', _onVideoLoaded, false);
  }

  private function _onVideoProgress(event):Void
  {
    //
  }

  private function _onVideoLoaded(event):Void
  {
    _videoElement.pause();

    _canvasApp();
  }

  private function _canvasApp():Void
  {
    var tempCanvasContext = _canvasElement.getContext2d();

    function drawScreen()
    {
      tempCanvasContext.fillStyle = '#555';
      tempCanvasContext.fillRect(0, 0, _canvasElement.width, _canvasElement.height);
      tempCanvasContext.strokeStyle = '#000000';
      tempCanvasContext.strokeRect(5, 5, _canvasElement.width - 10, _canvasElement.height - 10);

      tempCanvasContext.drawImage(_videoElement, 10, 10);
    }

    var timeTimer = new Timer(20);

    timeTimer.run = function()
    {
      drawScreen();
    };

    _videoElement.play();
  }
}