(function() {
    jsonPrettyPrint.directive('rmJsonPrettyPrint',
    ['$timeout', rmJsonPrettyPrintDirective]);

    function rmJsonPrettyPrintDirective($timeout) {

        var _createBlank = function(){
            var jsonObject = {};

            jsonObject.id = '';
            jsonObject.isPlusIcon = false;
            jsonObject.element = '  ';
            jsonObject.style = '';
            jsonObject.class = 'json-blank';
            
            return jsonObject;
        };

        var _createComma = function(){
            var jsonObject = {};

            jsonObject.id = '';
            jsonObject.isPlusIcon = false;
            jsonObject.element = ',';
            jsonObject.style = '';
            jsonObject.class = 'json-comma';
            
            return jsonObject;
        };

        var _createKey = function(key, styles){
            var jsonObject = {};

            jsonObject.id = '';
            jsonObject.isPlusIcon = false;
            jsonObject.element = key;
            jsonObject.style = 'color:' + styles.keyColor + '; background-color:' + styles.keyHighLightColor;
            jsonObject.class = 'json-key';
            
            return jsonObject;
        };

        var _createTwoPoints = function(){
            var jsonObject = {};

            jsonObject.id = '';
            jsonObject.isPlusIcon = false;
            jsonObject.element = ':';
            jsonObject.style = '';
            jsonObject.class = 'json-two-points';
            
            return jsonObject;
        };

        var _createValue = function(value, styles, blanks, plusId){
            var jsonObject = {},
                internalPlusId = plusId + 1;

            if(typeof value === 'string'){
                return _createString(value, styles);
            }
            else if(typeof value === 'object'){
                return _createObject(value, styles, blanks, internalPlusId);
            }
            else{
                jsonObject.id = '';
                jsonObject.isPlusIcon = false;
                jsonObject.element = value;
                jsonObject.style = 'color:' + styles.valueColor + '; background-color:' + styles.valueHighLightColor;
                jsonObject.class = 'json-value';
                
                return jsonObject;
            }
        };

        var _createString = function(value, styles){
            var jsonObject = {};

            jsonObject.id = '';
            jsonObject.isPlusIcon = false;
            jsonObject.element = '\"' + value + '\"';
            jsonObject.style = 'color:' + styles.stringColor + '; background-color:' + styles.stringHighLightColor;
            jsonObject.class = 'json-string';
            
            return jsonObject;
        };

        var _createObject = function(json, styles, blanks, plusId){
            var jsonLines = [],
                jsonLine = {
                    elements: [],
                    lines: []
                },
                jsonObject = {},
                keysQtd = 0;

            jsonObject.id = 'plus_' + plusId;
            jsonObject.isPlusIcon = true;
            jsonObject.element = '';
            jsonObject.style = '';
            jsonObject.class = 'plus-icon';
            jsonLine.elements.push(jsonObject);
            
            jsonObject = {};
            jsonObject.id = '';
            jsonObject.isPlusIcon = false;
            jsonObject.element = '{';
            jsonObject.style = 'color:' + styles.braceColor + '; background-color:' + styles.braceHighLightColor;
            jsonObject.class = 'json-brace';
            jsonLine.elements.push(jsonObject);

            blanks = blanks + 1;
            keysQtd = Object.keys(json).length - 1;
            Object.keys(json).forEach(function(key, index){
                var internalLine = {
                    elements: [],
                    lines: [],
                    plusId: 'plus_' + plusId
                },
                newValue, counter;

                for(counter = 0; counter < blanks; counter = counter + 1){
                    internalLine.elements.push(_createBlank());
                }

                internalLine.elements.push(_createKey(key, styles));

                internalLine.elements.push(_createTwoPoints());

                newValue = _createValue(json[key], styles, blanks, plusId);

                if(Array.isArray(newValue) && newValue[0].elements[newValue[0].elements.length - 1].class === 'json-brace'){
                    var icon = newValue[0].elements[0],
                        openBrace = newValue[0].elements[newValue[0].elements.length - 1],
                        closeBrace = newValue[1].elements[newValue[0].elements.length - 1],
                        internalBlanks = blanks + 1;

                    internalLine
                        .elements
                        .push(icon);

                    internalLine
                        .elements
                        .push(openBrace);

                    for(counter = 0; counter < internalBlanks; counter = counter + 1){
                        newValue[0].lines[0].elements.unshift(_createBlank());
                    }

                    internalLine.lines = internalLine
                                                .lines
                                                .concat(newValue[0].lines);

                    jsonLine.lines.push(internalLine);

                    internalLine = {
                        elements: [],
                        lines: []
                    };

                    for(counter = 0; counter < blanks; counter = counter + 1){
                        internalLine.elements.push(_createBlank());
                    }

                    newValue[1].elements.forEach(function (element) {
                        internalLine
                            .elements
                            .push(element);
                    });
                }
                else{
                    internalLine
                        .elements
                        .push(newValue);
                }

                if(index < keysQtd){
                    internalLine.elements.push(_createComma());
                }

                jsonLine.lines.push(internalLine);
            });

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
            jsonObject.style = 'color:' + styles.braceColor + '; background-color:' + styles.braceHighLightColor;
            jsonObject.class = 'json-brace';
            jsonLine.elements.push(jsonObject);
            jsonLines.push(jsonLine);        

            return jsonLines;
        };

        var _prettifyJson = function(json, styles){
            var jsonObject = JSON.parse(json),
                jsonLines = [],
                blanks = 0,
                plusId = 0;

            if(Array.isArray(jsonObject)){

            }
            else{
                var _jsonLines = _createObject(jsonObject, styles, blanks, plusId);
                jsonLines = jsonLines.concat(_jsonLines);
            }

            return jsonLines;
        };

        var html = 'component/templates/jsonPrettyPrint.html';

        return {
            restrict: 'E',
            templateUrl: html,
            replace: true,
            scope: {
                styles: '@'
            },
            link: function (scope, element, attrs, controller) {
                var timer;

                attrs.$observe("json", function (newValue) {
                    var defaultStyles = {
                        'braceColor': '#000000',
                        'braceHighLightColor': '#FFFFFF',
                        'keyColor': '#A52A2A',
                        'keyHighLightColor': '#FFFFFF',
                        'stringColor': '#C0FF3E',
                        'stringHighLightColor': '#FFFFFF',
                        'valueColor': '#000080',
                        'valueHighLightColor': '#FFFFFF'
                    },
                    styles;

                    if(scope.styles){
                        if(typeof scope.styles === 'string'){
                            scope.styles = JSON.parse(scope.styles);
                        }
                        styles = angular.extend({}, defaultStyles, scope.styles);
                    }
                    else{
                        styles = defaultStyles;
                    }
                  
                    scope.jsonPretty = _prettifyJson(newValue, styles);

                    scope.timer = $timeout(function(){
                        var i = element.find('i');

                        i.on('click', function(event){
                            var $ = angular.element,
                                id = angular.element(event.target).prop('id'),
                                line = $(element[0].querySelector('#' + id)),
                                treeview = $(element[0].querySelectorAll('.json-treeview'));

                            if($(event.target).hasClass('fa-plus-square-o')){
                                $(line).removeClass('fa-plus-square-o');
                                $(line).addClass('fa-minus-square-o');
                                $($(treeview)[0].querySelectorAll('[data-id="' + id + '"]'))
                                    .css('display', 'block');
                            }
                            else{
                                $(line).removeClass('fa-minus-square-o');
                                $(line).addClass('fa-plus-square-o');
                                $($(treeview)[0].querySelectorAll('[data-id="' + id + '"]'))
                                    .css('display', 'none');
                            }
                        });
                    });

                });
            }
        };

    }
})();