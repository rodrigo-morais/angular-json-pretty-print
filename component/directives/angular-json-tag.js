(function() {
    jsonPrettyPrint.directive('rmJsonTag',
    ['$sce', rmJsonTagDirective]);

    function rmJsonTagDirective($sce) {

        var _createIcon = function(element){
            var icon = '';

            icon = '<i class="fa fa-minus-square-o plus-icon ' + 
                element.class + 
                '" id="' + 
                element.id + 
                '"></i>';

            return icon;
        };

        var _createSpan = function(element){
            var span = '';

            span = '<span class="' +
                    element.class +
                    '" style="' +
                    element.style +
                    '">'+ element.element + '</span>';

            return span;
        };

        var html = 'component/templates/jsonTag.html';

        return {
            restrict: 'E',
            templateUrl: html,
            replace: true,
            scope: {
                'elements': '='
            },
            link: function (scope, element, attrs, controller) {
                scope.tags = '';
                scope.elements.forEach(function(element){
                    if(element.isPlusIcon){
                        scope.tags = scope.tags + _createIcon(element);
                    }
                    else{
                        scope.tags = scope.tags + _createSpan(element);
                    }
                });

                scope.deliberatelyTrustDangerousSnippet = function() {
                   return $sce.trustAsHtml(scope.tags);
                };
            }
        };

    }
})();