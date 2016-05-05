package js.client.externs;

import haxe.Constraints.Function;

@:keep
@:native("window.ObserverTransform")
extern class ObserverTransform
{
  function open(callback:Function, target:Dynamic):Void;
}