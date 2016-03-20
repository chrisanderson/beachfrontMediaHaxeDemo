package common.client;

@:keep //protect this class from being removed by dce == full
class BuildInfo
{
  public static var COMPILE_TARGET = 'unkown hinson';
  public static var BUILD_TARGET = 'unkown hinson';
  public static var COMPILE_DATE_TIME = CompileTime.buildDate();
  public static var COMPILE_DATE_TIME_STRING = CompileTime.buildDate().toString();
  public static var LAST_RUN_DATE_TIME_STRING = Date.now().toString();

  public var currentDateTime(default, null) = Date.now();

  public function new()
  {
    _init();
  }

  private function _init():Void
  {
    #if js
    COMPILE_TARGET = 'js';
    #elseif flash
    COMPILE_TARGET = 'flash';
    #end

    #if debug
    BUILD_TARGET = 'debug';
    #elseif !debug
    BUILD_TARGET = 'release';
    #end

    trace('COMPILE_TARGET: $COMPILE_TARGET');
    trace('BUILD_TARGET: $BUILD_TARGET');
    trace('COMPILE_DATE_TIME_STRING: $COMPILE_DATE_TIME_STRING');
    trace('LAST_RUN_DATE_TIME_STRING: $LAST_RUN_DATE_TIME_STRING');
  }
}