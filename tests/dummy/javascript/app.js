var app = angular.module('myApp', ['JsonPrettyPrint']);

(function(){
    'use strict';

    var controllerId = 'JsonController';

    app.controller(controllerId, ['$scope', jsonController]);

    function jsonController($scope){
        $scope.jsonValue = '{"key3": "value3"}';
        $scope.refresh = function(event){
            var jsonText = document.getElementById('jsonText').value;
            $scope.jsonValue = jsonText;
        };
    }


})();