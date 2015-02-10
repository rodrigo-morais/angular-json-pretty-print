angular.module('JsonPrettyPrint').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/jsonPrettyPrint.html',
    "<code>\n" +
    "    <div class=\"json-treeview\" data-ng:repeat=\"object in jsonPretty\">\n" +
    "        <span class=\"{{object.class}}\">{{object.element}}</span>\n" +
    "    </div>\n" +
    "</code>"
  );

}]);
