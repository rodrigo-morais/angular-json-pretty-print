jsonPrettyPrint.directive('rmJsonPrettyPrint',
[rmJsonPrettyPrintDirective]);

function rmJsonPrettyPrintDirective() {

    var _createObject = function(){
        var jsonLines = [],
            jsonLine;

        jsonLine = {
            element: '{',
            lines: [],
            'class': 'json-brace'
        };
        jsonLines.push(jsonLine);

        jsonLine = {
            element: '}',
            lines: [],
            'class': 'json-brace'
        };
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