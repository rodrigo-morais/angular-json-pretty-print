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
        jsonReturn = '<span class="ng-binding">{</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(jsonReturn);
  });

  it('Verify if brace to close JSON object is exhibited', function() {
    var element = $compile("<rm-json-pretty-print json='{}'></rm-json-pretty-print>")($rootScope),
        jsonReturn = '<span class="ng-binding">}</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(jsonReturn);
  });
});