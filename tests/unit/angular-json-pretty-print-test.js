describe('Unit test to print JSON object in pretty way', function() {
  var $compile,
      $rootScope;

  var _rgb2hex = function (rgb) {
    var isRGBA = false;

    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    isRGBA = rgb.indexOf('rgba') > -1;

    rgb = isRGBA ? rgb.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/)
                : rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2).toUpperCase();
    }

    if(isRGBA){
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]) + hex(rgb[4]);
    }
    else{
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
     }
  };

  beforeEach(module('JsonPrettyPrint'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Verify if brace to create JSON object is exhibited', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope),
        jsonReturn = '<span data-ng:repeat="object in line.elements" class="json-brace" data-ng:if="object.isPlusIcon == false" style="color:#000000; background-color:#FFFFFF">{</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(jsonReturn);
  });

  it('Verify if brace to close JSON object is exhibited', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope),
        jsonReturn = '<span data-ng:repeat="object in line.elements" class="json-brace" data-ng:if="object.isPlusIcon == false" style="color:#000000; background-color:#FFFFFF">}</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(jsonReturn);
  });

  it('Verify if there are two lines within CODE tag', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope);
    
    $rootScope.$digest();
    
    expect($(element).children().length).toBe(2);
  });

  it('Verify if there are two lines and each one with correct HTML class', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope);
    
    $rootScope.$digest();
    
    $(element).find('.json-treeview').each(function(index, line){
      expect($(line).hasClass('json-treeview')).toBe(true);
    });
  });

  it('Verify if there is a icon before open brace', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope);
    
    $rootScope.$digest();
    
    expect($(element).find('.json-treeview').first().children()[0].tagName).toBe('I');
  });

  it('Verify the class in icon before open brace', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope);
    
    $rootScope.$digest();
    
    expect($($(element).find('.json-treeview').first().children()[0]).hasClass('plus-icon')).toBe(true);
  });

  it('Verify if exist line to content', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope);
    
    $rootScope.$digest();
    
    expect($(element).find('.json-new-line').length).toBe(1);
  });

  it('Verify if exist key within first line', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-key').length).toBe(1);
  });
  
  it('Verify if key within first line has name "key1"', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-key').html()).toBe("key1");
  });

  it('Verify if there is blank space before key within first line', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine,
        key,
        blank;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    key = $(firstLine).find('.json-key')[0];
    blank = $(key).prev();
    
    expect($(blank).hasClass('json-blank')).toBe(true);
  });

  it('Verify if there is two points after key within first line', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-two-points').length).toBe(1);
  });

  it('Verify if content of the two points element within first line is ":"', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-two-points').html()).toBe(':');
  });

  it('Verify if each internal line has data-id', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).data('id')).toBe('plus_0');
  });

  it('Verify when value type is string if the class of tag is json-string', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-string').length).toBe(1);
  });

  it('Verify when value type is string if value within first line contains quotations', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-string').html()).toBe("\"value1\"");
  });

  it('Verify when value type is not string if value within first line not contains quotations', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": 1}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-value').html()).toBe('1');
  });

  it('Verify if there is comma in first line when has more than one line', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\", \"key2\": \"value2\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-comma').length).toBe(1);
  });

  it('Verify when there are two lines that last one does not have comma', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\", \"key2\": \"value2\"}'></rm-json-pretty-print>")($rootScope),
        lastLine;
    
    $rootScope.$digest();

    lastLine = $(element).find('.json-new-line')[$(element).find('.json-new-line').length - 1];
    
    expect($(lastLine).find('.json-comma').length).toBe(0);
  });

  it('Verify when there is only one line does not have comma', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line')[0];
    
    expect($(firstLine).find('.json-comma').length).toBe(0);
  });

  it('Verify if brace of JSON object has color default', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        brace;
    
    $rootScope.$digest();

    brace = $(element).find('.json-brace')[0];
    
    expect(_rgb2hex($(brace).css('color'))).toBe('#000000');
  });

  it('Verify if brace of JSON object has color equal the color informed in parameter', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}' styles='{\"braceColor\":\"#FF001b\"}'></rm-json-pretty-print>")($rootScope),
        brace;
    
    $rootScope.$digest();

    brace = $(element).find('.json-brace')[0];
    
    expect(_rgb2hex($(brace).css('color'))).toBe('#FF001B');
  });

  it('Verify if brace of JSON object has highlight color default', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}'></rm-json-pretty-print>")($rootScope),
        brace;
    
    $rootScope.$digest();

    brace = $(element).find('.json-brace')[0];
    
    expect(_rgb2hex($(brace).css('background-color'))).toBe('#FFFFFF');
  });

  it('Verify if brace of JSON object has color equal the highlight color informed in parameter', function() {
    var element = $compile("<rm-json-pretty-print json='{\"key1\": \"value1\"}' styles='{\"braceHighLightColor\":\"#FFD39B\"}'></rm-json-pretty-print>")($rootScope),
        brace;
    
    $rootScope.$digest();

    brace = $(element).find('.json-brace')[0];
    
    expect(_rgb2hex($(brace).css('background-color'))).toBe('#FFD39B');
  });
});