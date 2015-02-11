var jsonPrettyPrint = angular.module('JsonPrettyPrint', []);
angular.module('JsonPrettyPrint').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/jsonPrettyPrint.html',
    "<code>\n" +
    "    <div class=\"json-treeview\" data-ng:repeat=\"line in jsonPretty\">\n" +
    "        <i data-ng:repeat=\"object in line.elements\" class=\"fa fa-minus-square-o {{object.class}}\" id=\"{{object.id}}\" class=\"fa fa-minus-square-o plus-icon\" data-ng:if=\"object.isPlusIcon\"></i>\n" +
    "        <span data-ng:repeat=\"object in line.elements\" class=\"{{object.class}}\" data-ng:if=\"object.isPlusIcon == false\">{{object.element}}</span>\n" +
    "    </div>\n" +
    "</code>"
  );

}]);

jsonPrettyPrint.directive('rmJsonPrettyPrint',
[rmJsonPrettyPrintDirective]);

function rmJsonPrettyPrintDirective() {

    var _createObject = function(){
        var jsonLines = [],
            jsonLine = {
                elements: [],
                lines: []
            },
            jsonObject = {},
            plusId = 0;

        jsonObject.id = 'plus_' + plusId;
        jsonObject.isPlusIcon = true;
        jsonObject.isBlank = false;
        jsonObject.element = '';
        jsonObject.style = '';
        jsonObject.class = 'plus-icon';
        jsonLine.elements.push(jsonObject);
        
        jsonObject = {};
        jsonObject.id = '';
        jsonObject.isPlusIcon = false;
        jsonObject.isBlank = false;
        jsonObject.element = '{';
        jsonObject.style = '';
        jsonObject.class = 'json-brace';
        jsonLine.elements.push(jsonObject);
        jsonLines.push(jsonLine);

        jsonLine = {
            elements: [],
            lines: []
        };
        jsonObject = {};
        jsonObject.id = '';
        jsonObject.isPlusIcon = false;
        jsonObject.isBlank = false;
        jsonObject.element = '}';
        jsonObject.style = '';
        jsonObject.class = 'json-brace';
        jsonLine.elements.push(jsonObject);
        jsonLines.push(jsonLine);        

        return jsonLines;
    };

    var _prettifyJson = function(json){
        var jsonObject = JSON.parse(json),
            jsonLines = [];

        if(Array.isArray(jsonObject)){

        }
        else{
            var _jsonLines = _createObject(json);
            jsonLines = jsonLines.concat(_jsonLines);
        }

        return jsonLines;
    };

    var html = 'component/templates/jsonPrettyPrint.html';

    return {
        restrict: 'E',
        templateUrl: html,
        replace: true,
        link: function (scope, element, attrs, controller) {
            attrs.$observe("json", function (newValue) {
                scope.jsonPretty = _prettifyJson(newValue);
            });
        }
    };

}