var jsonPrettyPrint = angular.module('JsonPrettyPrint', []);
angular.module('JsonPrettyPrint').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/jsonPrettyPrint.html',
    "<div>{{jsonPretty}}</div>"
  );

}]);

jsonPrettyPrint.directive('rmJsonPrettyPrint',
[rmJsonPrettyPrintDirective]);

function rmJsonPrettyPrintDirective() {

    var html = 'component/templates/jsonPrettyPrint.html';

    return {
        restrict: 'EA',
        templateUrl: html,
        replace: true,
        link: function (scope, element, attrs, controller) {
            scope.jsonPretty = scope.value;
            attrs.$observe("json", function (newValue) {
                scope.jsonPretty = newValue;
            });
        }
    };

}