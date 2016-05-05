package js.client;

import js.Browser;
import js.client.DomCompletion;
import jQuery.JQuery;
import js.client.externs.*;

using js.client.externs.ObserverTransform;

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

    var tempObject = {id:1, foo:'bar'};

    trace({'tempObject':tempObject});

    //var tempObserver = new ObjectObserver({id:1, foo:'bar'});

    //trace({'tempObserver':tempObserver});
    //
    //tempObserver.open()
    //{
    //
    //}

    var tempObserver = untyped new ObjectObserver(tempObject)
    .open(function(added, removed, changed, getOldValueFn)
    {
      Object.keys(added).forEach(function(property) {
        property; // a property which has been been added to obj
        added[property]; // its value
      });
      Object.keys(removed).forEach(function(property) {
        property; // a property which has been been removed from obj
        getOldValueFn(property); // its old value
      });
      Object.keys(changed).forEach(function(property) {
        property; // a property on obj which has changed value.
        changed[property]; // its value
        getOldValueFn(property); // its old value

        console.log('test33 property: ' + property + ' changed[property]: ' + changed[property]);
      });
    });

    tempObject.id++;

    //not real sure why this was required in chrome, thought it would use native Object.observe()
    untyped Platform.performMicrotaskCheckpoint();

    tempObject.id++;

    //not real sure why this was required in chrome, thought it would use native Object.observe()
    untyped Platform.performMicrotaskCheckpoint();

    tempObject.id = 33;

    //not real sure why this was required in chrome, thought it would use native Object.observe()
    untyped Platform.performMicrotaskCheckpoint();

    trace({'tempObject':tempObject});
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
  }
}