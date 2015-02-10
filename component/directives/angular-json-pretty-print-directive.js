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