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
        jsonReturn = '<span data-ng:repeat="object in line.elements" class="json-brace">{</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(jsonReturn);
  });

  it('Verify if brace to close JSON object is exhibited', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope),
        jsonReturn = '<span data-ng:repeat="object in line.elements" class="json-brace">}</span>';
    
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
  
});