angular.module('JsonPrettyPrint').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/jsonPrettyPrint.html',
    "<code>\n" +
    "    <div data-ng:repeat=\"object in jsonPretty\">\n" +
    "        <span>{{object.element}}</span>\n" +
    "    </div>\n" +
    "</code>"
  );

}]);
