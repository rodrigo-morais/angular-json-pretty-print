var jsonPrettyPrint = angular.module('JsonPrettyPrint', []);

jsonPrettyPrint.directive('jsonPrettyPrint', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>{"key1":"value1"}</div>'
    };
});