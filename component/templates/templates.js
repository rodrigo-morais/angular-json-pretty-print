angular.module('JsonPrettyPrint').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/jsonPrettyPrint.html',
    "<code>\n" +
    "    <div class=\"json-treeview\" data-ng:repeat=\"line in jsonPretty\">\n" +
    "        <span data-ng:repeat=\"object in line.elements\" class=\"{{object.class}}\">{{object.element}}</span>\n" +
    "    </div>\n" +
    "</code>"
  );

}]);
