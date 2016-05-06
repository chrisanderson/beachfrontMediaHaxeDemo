package js.client;

import common.client.util.BuildInfo;
import common.client.ICommon;
import common.client.CommonModel;
import common.client.signal.HeartBeatSignal;
import jQuery.JQuery;
import js.client.externs.*;

using js.client.externs.ObserverTransform;
using DateTools;

class AppModel implements ICommon
{
  @inject public var commonModel:CommonModel;
  @inject public var heartBeatSignal(default, never):HeartBeatSignal;

  public var jsLogElement(null, set):JQuery;
  public var compileDateTimeElement(null, set):JQuery;
  public var currentDateTimeElement(null, set):JQuery;

  public function new()
  {
  }

  @post //this method is called automatically when injections are done because of @post metadata
  public function injectionsReady():Void
  {
    heartBeatSignal.add(_onHeartBeatSignal);

    _init();
  }

  public function set_jsLogElement(value:JQuery):JQuery
  {
    jsLogElement = value;

    _logMessage('<br> BuildInfo.BUILD_TARGET: ${BuildInfo.BUILD_TARGET}');
    _logMessage('<br> BuildInfo.COMPILE_DATE_TIME_STRING: ${BuildInfo.COMPILE_DATE_TIME_STRING}');
    _logMessage('<br> BuildInfo.LAST_RUN_DATE_TIME_STRING: ${BuildInfo.LAST_RUN_DATE_TIME_STRING}');

    return jsLogElement;
  }

  public function set_compileDateTimeElement(value:JQuery):JQuery
  {
    compileDateTimeElement = value;

    //you can use methods etc using string interpolation using the ${} syntax
    //also notice .format() at the end of the string.
    //it's available as a method because of static extension and i have using DateTools; at the top of this file
    compileDateTimeElement.text('[last compile date-time ${BuildInfo.COMPILE_DATE_TIME.format("%m/%d/%Y %r")}]');

    return compileDateTimeElement;
  }

  public function set_currentDateTimeElement(value:JQuery):JQuery
  {
    currentDateTimeElement = value;

    _updateCurrentDateTimeElement(Date.now());

    return currentDateTimeElement;
  }

  private function _init():Void
  {
    var tempObject = {id:1, foo:'bar'};

    trace({'tempObject':tempObject});

    //var tempObserver = new ObjectObserver({id:1, foo:'bar'});
    //
    //trace({'tempObserver':tempObserver});

    //tempObserver.open(function(added, removed, changed, getOldValueFn)
    //  {
    //    Object.keys(added).forEach(function(property) {
    //      property; // a property which has been been added to obj
    //      added[property]; // its value
    //    });
    //    Object.keys(removed).forEach(function(property) {
    //      property; // a property which has been been removed from obj
    //      getOldValueFn(property); // its old value
    //    });
    //    Object.keys(changed).forEach(function(property) {
    //      property; // a property on obj which has changed value.
    //      changed[property]; // its value
    //      getOldValueFn(property); // its old value
    //
    //      console.log('test33 property: ' + property + ' changed[property]: ' + changed[property]);
    //    });
    //  });

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

        console.log('tempObserver.changed() property: ' + property + ' changed[property]: ' + changed[property]);
      });
    });

    tempObject.id = -1;

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

  private function _onHeartBeatSignal(eventType:String, value:Date):Void
  {
    if(eventType != HeartBeatSignal.CURRENT_DATE_TIME_UPDATED){return;}

    _updateCurrentDateTimeElement(value);
  }

  private function _updateCurrentDateTimeElement(currentDateTime:Date):Void
  {
    if(currentDateTimeElement == null){return;}

    currentDateTimeElement.text('[current date-time ${currentDateTime.format("%m/%d/%Y %r")}]');

    var tempObserver = untyped new ObjectObserver(currentDateTimeElement)
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

              console.log('tempObserver.changed() property: ' + property + ' changed[property]: ' + changed[property]);
            });
          });
  }

  private function _logMessage(message:String):Void
  {
    if(jsLogElement == null){return;}

    //because we increment tempValue only in a debug build
    //tempValue will be 3 for debug but 2 for release
    jsLogElement.append(message);
  }
}