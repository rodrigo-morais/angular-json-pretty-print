angular.module('JsonPrettyPrint').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/jsonPrettyPrint.html',
    "<code>\n" +
    "    <div class=\"json-treeview\" data-ng:repeat=\"line in jsonPretty\" data-ng:include=\"'component/templates/line.html'\">\n" +
    "    </div>\n" +
    "</code>"
  );


  $templateCache.put('component/templates/jsonTag.html',
    "<div class=\"json-elements\" ng-bind-html=\"deliberatelyTrustDangerousSnippet()\"></div>"
  );


  $templateCache.put('component/templates/line.html',
    "<rm-json-tag elements=\"line.elements\"></rm-json-tag>\n" +
    "<div class=\"json-new-line\" data-ng:repeat=\"line in line.lines\" data-ng:include=\"'component/templates/line.html'\" data-id=\"{{line.plusId}}\">\n" +
    "</div>"
  );

}]);
