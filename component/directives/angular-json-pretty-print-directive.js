jsonPrettyPrint.directive('rmJsonPrettyPrint',
[rmJsonPrettyPrintDirective]);

function rmJsonPrettyPrintDirective() {

    var html = 'component/templates/jsonPrettyPrint.html';

    return {
        restrict: 'E',
        templateUrl: html,
        replace: true,
        link: function (scope, element, attrs, controller) {
            
        }
    };

}