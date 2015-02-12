describe('Unit test to print JSON object in pretty way', function() {
  var $compile,
      $rootScope;

  beforeEach(module('JsonPrettyPrint'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Verify if brace to create JSON object is exhibited', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope),
        jsonReturn = '<span data-ng:repeat="object in line.elements" class="json-brace" data-ng:if="object.isPlusIcon == false &amp;&amp; object.isBlank == false">{</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(jsonReturn);
  });

  it('Verify if brace to close JSON object is exhibited', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope),
        jsonReturn = '<span data-ng:repeat="object in line.elements" class="json-brace" data-ng:if="object.isPlusIcon == false &amp;&amp; object.isBlank == false">}</span>';
    
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
        firstLine;
    
    $rootScope.$digest();

    firstLine = $(element).find('.json-new-line');
    
    expect($(firstLine).find('.json-blank').length).toBe(1);
  });
});