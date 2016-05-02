package js.client;

import haxe.macro.Context;
import haxe.macro.Expr;

class DomCompletion {
  public static function build(url:String) {
    #if js
    var h = haxe.Http.requestUrl(url);

    //trace(h);

    var r = ~/id=["']([A-Za-z0-9]+)["']/;
    var ids = [];
    while (r.match(h)) {
      var id = r.matched(1);
      ids.remove(id);
      ids.push(id);
      h = r.matchedRight();
    }

    //var fields = Context.getBuildFields();
    //var gtype = TAnonymous([for (id in ids) {
    //  name : id,
    //  pos : Context.currentPos(),
    //  kind : FVar(macro:String)
    //}]);
    //
    //var gids:Field = {
    //  name : "gids",
    //  pos : Context.currentPos(),
    //  kind : FVar(gtype),
    //  access : [AStatic]
    //};
    //fields.push(gids);
    //return fields;
    #end

    return null;
  }
}