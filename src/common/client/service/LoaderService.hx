package common.client.service;

import haxe.Http;
import tink.core.Outcome;
import tink.core.Future;

@:keep
class LoaderService
{
  public function new()
  {
    //
  }

  //public function loadFromUrl(url:String):Future<Outcome<String, String>>
  //{
  //  return Future.async(function(handler:Outcome<String, String>->Void){
  //    var tempHandler:Http = new haxe.Http(url);
  //
  //    tempHandler.onData = function(data:String){
  //      handler(Success(data));
  //
  //      trace('file loaded data: $data');
  //    };
  //    //tempHandler.onError = function(error:String) handler(Error(error));
  //    tempHandler.request(false);
  //  });
  //}

  public function loadFromUrl(url:String, ?onDataCallback:Dynamic, ?onErrorCallback:Dynamic):Void
  {
    var tempHttp:Http = new haxe.Http(url);

    tempHttp.onData = (onDataCallback != null) ? onDataCallback : _onHttpData;
    tempHttp.onError = (onErrorCallback != null) ? onErrorCallback : _onHttpError;
    tempHttp.request(false);
  }

  private function _onHttpData(result:String):Void
  {
    trace('_onHttpData() result: $result');
  }

  private function _onHttpError(result:String):Void
  {
    trace('_onHttpError() result: $result');
  }
}