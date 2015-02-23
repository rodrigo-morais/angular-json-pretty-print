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
            var jsonObject = {};

            if(typeof value === 'string'){
                return _createString(value, styles);
            }
            else if(Array.isArray(value)){
                return _createArray(value, styles, blanks, plusId);
            }
            else if(typeof value === 'object'){
                return _createObject(value, styles, blanks, plusId);
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

        var _increasePlusId = function(value, plusId){
            if(value){
                plusId = plusId + 1;
                if(value.lines){
                    value.lines.forEach(function(line){        
                        plusId = _increasePlusId(line.elements, plusId);
                    });
                }
            }

            return plusId;
        };

        var _addArrayToTreeview = function(json, values, blanks, parentPlusId, plusId, internalLine){
            var hasBraceClass = false, hasBracketClass = false,
                counter, internalLines = [];

            if(values.length > 0){
                hasBraceClass = values[0].elements[values[0].elements.length - 1].class === 'json-brace';
                hasBracketClass = values[0].elements[values[0].elements.length - 1].class === 'json-bracket';
            }

            if(hasBraceClass || hasBracketClass){
                var icon = values[0].elements[0],
                    openBrace = values[0].elements[values[0].elements.length - 1],
                    internalBlanks = blanks + 1;

                internalLine
                    .elements
                    .push(icon);

                internalLine
                    .elements
                    .push(openBrace);

                internalLine.lines = internalLine
                                            .lines
                                            .concat(values[0].lines);

                internalLines.push(internalLine);

                internalLine = {
                    elements: [],
                    lines: [],
                    plusId: 'plus_' + parentPlusId
                };

                for(counter = 0; counter < blanks; counter = counter + 1){
                    internalLine.elements.push(_createBlank());
                }

                values[1].elements.forEach(function (element) {
                    internalLine
                        .elements
                        .push(element);
                });
            }
            else{
                internalLine
                    .elements
                    .push(values);
            }

            internalLines.push(internalLine);

            return internalLines;
        };

        var _createObject = function(json, styles, blanks, plusId){
            var jsonLines = [],
                jsonLine = {
                    elements: [],
                    lines: []
                },
                jsonObject = {},
                keysQtd = 0,
                internalPlusId = plusId;

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
                newValue, counter,
                hasBraceClass = false, hasBracketClass = false,
                lines;

                for(counter = 0; counter < blanks; counter = counter + 1){
                    internalLine.elements.push(_createBlank());
                }

                internalLine.elements.push(_createKey(key, styles));

                internalLine.elements.push(_createTwoPoints());

                if(typeof json[key] === 'object' || Array.isArray(json[key])){
                    internalPlusId = internalPlusId + 1;
                }
                newValue = _createValue(json[key], styles, blanks, internalPlusId);

                lines = _addArrayToTreeview(json, newValue, blanks, plusId, internalPlusId, internalLine);
                lines.forEach(function(line, lineIndex){
                    if(lineIndex === (lines.length - 1)){
                        internalLine = line;
                    }
                    else{
                        jsonLine.lines.push(line);
                    }
                });

                if(newValue.length > 0){
                    newValue.forEach(function(value){
                        if(value.lines && value.lines){
                            value.lines.forEach(function(lineValue){
                                internalPlusId = _increasePlusId(lineValue, internalPlusId);
                            });
                        }
                    });
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

        var _createArray = function(json, styles, blanks, plusId){
            var jsonLines = [],
                jsonLine = {
                    elements: [],
                    lines: []
                },
                jsonObject = {},
                valuesQtd = 0,
                internalJsonLine,
                internalPlusId = plusId;

                jsonObject.id = 'plus_' + plusId;
                jsonObject.isPlusIcon = true;
                jsonObject.element = '';
                jsonObject.style = '';
                jsonObject.class = 'plus-icon';
                jsonLine.elements.push(jsonObject);
                
                jsonObject = {};
                jsonObject.id = '';
                jsonObject.isPlusIcon = false;
                jsonObject.element = '[';
                jsonObject.style = 'color:' + styles.braceColor + '; background-color:' + styles.braceHighLightColor;
                jsonObject.class = 'json-bracket';
                jsonLine.elements.push(jsonObject);

                blanks = blanks + 1;
                valuesQtd = json.length - 1;
                json.forEach(function(item, index){
                    var newValue, lines;

                    internalJsonLine = {
                        elements: [],
                        lines: [],
                        plusId: 'plus_' + plusId

                    };
                    for(counter = 0; counter < blanks; counter = counter + 1){
                        internalJsonLine.elements.push(_createBlank());
                    }

                    if(typeof item === 'object' || Array.isArray(item)){
                        internalPlusId = internalPlusId + 1;
                    }

                    newValue = _createValue(item, styles, blanks, internalPlusId);

                    lines = _addArrayToTreeview(json, newValue, blanks, plusId, internalPlusId, internalJsonLine);
                    lines.forEach(function(line, lineIndex){
                        if(lineIndex === (lines.length - 1)){
                            internalJsonLine = line;
                        }
                        else{
                            jsonLine.lines.push(line);
                        }
                    });

                    if(newValue.length > 0){
                        newValue.forEach(function(value){
                            if(value.lines && value.lines){
                                value.lines.forEach(function(lineValue){
                                    internalPlusId = _increasePlusId(lineValue, internalPlusId);
                                });
                            }
                        });
                    }

                    if(index < valuesQtd){
                        internalJsonLine.elements.push(_createComma());
                    }

                    jsonLine.lines.push(internalJsonLine);
                });

                jsonLines.push(jsonLine);

                jsonLine = {
                    elements: [],
                    lines: [],
                    plusId: 'plus_' + plusId
                };
                jsonObject = {};
                jsonObject.id = '';
                jsonObject.isPlusIcon = false;
                jsonObject.isBlank = false;
                jsonObject.element = ']';
                jsonObject.style = 'color:' + styles.braceColor + '; background-color:' + styles.braceHighLightColor;
                jsonObject.class = 'json-bracket';
                jsonLine.elements.push(jsonObject);
                jsonLines.push(jsonLine);        

                return jsonLines;
        };

        var _prettifyJson = function(json, styles){
            var jsonObject = JSON.parse(json),
                jsonLines = [],
                blanks = 0,
                plusId = 0,
                _jsonLines = [];

            if(Array.isArray(jsonObject)){
                _jsonLines = _createArray(jsonObject, styles, blanks, plusId);
                jsonLines = jsonLines.concat(_jsonLines);
            }
            else{
                _jsonLines = _createObject(jsonObject, styles, blanks, plusId);
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