var app = angular.module('myApp', ['JsonPrettyPrint']);

(function(){
    'use strict';

    var controllerId = 'JsonController';

    app.controller(controllerId, ['$scope', jsonController]);

    function jsonController($scope){
        $scope.jsonValue = '{"key3": "value3", "key2": 2, "key1": {"sub":1}}';
        $scope.styles = '{"braceColor":"#FF001b", "braceHighLightColor":"#FFD39B", "keyColor":"#00FF7F","keyHighLightColor":"#FAFAD2","stringColor":"#551A8B","stringHighLightColor":"#FFD39B","valueColor":"#FF0000","valueHighLightColor":"#FFE4E1"}';

        $scope.refresh = function(event){
            var jsonText = document.getElementById('jsonText').value,
                styles = document.getElementById('styles').value;
            
            $scope.jsonValue = jsonText;
            $scope.styles = styles;
        };
    }


})();