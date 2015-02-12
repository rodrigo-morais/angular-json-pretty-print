angular.module('JsonPrettyPrint').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/jsonPrettyPrint.html',
    "<code>\n" +
    "    <div class=\"json-treeview\" data-ng:repeat=\"line in jsonPretty\" data-ng:include=\"'component/templates/line.html'\">\n" +
    "    </div>\n" +
    "</code>"
  );


  $templateCache.put('component/templates/line.html',
    "<i data-ng:repeat=\"object in line.elements\" class=\"fa fa-minus-square-o {{object.class}}\" id=\"{{object.id}}\" class=\"fa fa-minus-square-o plus-icon\" data-ng:if=\"object.isPlusIcon\"></i>\n" +
    "<span data-ng:repeat=\"object in line.elements\" class=\"{{object.class}}\" data-ng:if=\"object.isPlusIcon == false\">{{object.element}}</span>"
  );

}]);
